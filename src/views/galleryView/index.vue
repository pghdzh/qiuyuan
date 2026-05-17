<template>
  <div class="qiuyuan-gallery">
    <!-- ========== 仇远动态氛围背景 ========== -->
    <div class="bg-atmosphere">
      <div class="moon-main"></div>
      <div class="moon-sub"></div>
      <div class="firefly firefly-1"></div>
      <div class="firefly firefly-2"></div>
      <div class="firefly firefly-3"></div>
      <div class="firefly firefly-4"></div>
      <div class="firefly firefly-5"></div>
      <div class="firefly firefly-6"></div>
      <div class="sword-light sword-light-1"></div>
      <div class="sword-light sword-light-2"></div>
      <div class="sword-light sword-light-3"></div>
      <div class="rain"></div>
      <div class="mist"></div>
      <div class="hat-silhouette"></div>
      <div class="ink-drop ink-drop-1"></div>
      <div class="ink-drop ink-drop-2"></div>
    </div>

    <!-- 上传按钮 -->
    <button class="upload-btn" @click="openUploadModal">
      <span class="btn-text">青冥印记</span>
    </button>

    <!-- 图片网格区 -->
    <section class="gallery section">
      <div class="sort-controls">
        <button @click="toggleSort" class="sort-btn">
          {{ sortBy === "like_count" ? "剑鸣榜" : "新竹序" }}
        </button>
      </div>
      <div class="gallery-grid">
        <div
          v-for="(img, index) in images"
          :key="img.id"
          class="card"
          @click="openLightbox(index)"
          ref="cards"
        >
          <div class="card-inner">
            <img
              :src="img.src"
              :alt="img.alt"
              loading="lazy"
              @load="onImageLoad($event)"
            />
            <div class="overlay">
              <span>青锋照影</span>
            </div>
            <button class="like-btn" @click.stop="handleLike(img)">
              <i class="heart" :class="{ liked: img.liked }"></i>
              <span class="like-count">{{ img.likeCount }}</span>
            </button>
          </div>
        </div>
      </div>
      <div ref="sentinel" class="sentinel"></div>
      <div class="loading" v-if="loading">竹风徐来...</div>
      <div class="finished" v-if="finished">—— 青冥已尽 · 藏锋于此 ——</div>
    </section>

    <!-- 排行榜面板 -->
    <aside class="ranking-panel">
      <div class="panel-header" @click="expanded = !expanded">
        <h3 class="ranking-title">剑芒榜</h3>
        <span>共{{ imgTotal }}张</span>
        <span class="toggle-icon">{{ expanded ? "▾" : "▸" }}</span>
      </div>
      <transition name="fade">
        <ul v-if="expanded" class="ranking-list">
          <li
            v-for="(item, idx) in rankingList"
            :key="idx"
            class="ranking-item"
            :class="`rank-${idx + 1}`"
          >
            <span class="rank">{{ idx + 1 }}</span>
            <span class="name">{{ item.nickname }}</span>
            <span class="count">{{ item.count }} 张</span>
          </li>
        </ul>
      </transition>
    </aside>

    <!-- Lightbox -->
    <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox">
      <span class="close" @click="closeLightbox">✕</span>
      <span class="prev" @click.stop="prevImage">‹</span>
      <img :src="images[currentIndex].src" :alt="images[currentIndex].alt" />
      <span class="next" @click.stop="nextImage">›</span>
    </div>

    <!-- 上传弹窗 -->
    <div
      v-if="uploadModalOpen"
      class="upload-modal-overlay"
      @click.self="closeUploadModal"
    >
      <div class="upload-modal">
        <h3>藏锋入匣</h3>
        <div class="tip-container">
          <ul class="tips-list">
            <li>审核规则：1. 勿涉色情；2. 须为仇远相关。</li>
            <li>上传后若无显示即已进入审核队列，请耐心等待。</li>
            <li>大量图片可B站私信提供网盘链接，感谢理解。</li>
            <li>审核周期最长一周，见谅。</li>
          </ul>
        </div>
        <p class="stats">
          今日已传：<strong>{{ uploadedToday }}</strong> 张，尚可：<strong>{{
            remaining
          }}</strong>
          张
        </p>
        <label>
          名号：
          <input v-model="nickname" type="text" placeholder="江湖名号" />
        </label>
        <label>
          择竹入匣（最多 {{ remaining }} 张）：
          <input
            ref="fileInput"
            type="file"
            multiple
            accept="image/*"
            @change="handleFileSelect"
          />
        </label>
        <p class="tip" v-if="selectedFiles.length">
          已选 {{ selectedFiles.length }} 张
        </p>
        <div class="modal-actions">
          <button :disabled="!canSubmit || isUploading" @click="submitUpload">
            {{ isUploading ? "入匣中..." : "青锋入匣" }}
          </button>
          <button class="cancel" @click="closeUploadModal">回鞘</button>
        </div>
      </div>
    </div>

    <!-- 浮动小人（保留） -->
    <div class="floating-chibis">
      <img
        v-for="(pet, i) in chibiList"
        :key="i"
        :src="pet.src"
        :style="{ top: pet.top + 'px', left: pet.left + 'px' }"
        class="chibi-img"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick, onBeforeUnmount } from "vue";
import { uploadImages } from "@/api/modules/images";
import { getRankingList } from "@/api/modules/ranking";
import { gsap } from "gsap";
import { getImagesLikesList, likeImage } from "@/api/modules/imagesLikes";
import { debounce } from "lodash";

// 排序与数据
const sortBy = ref<"uploaded_at" | "like_count">("like_count");
const order = ref<"asc" | "desc">("desc");
const images = ref<any[]>([]);
const pageImage = ref(1);
const limit = ref(10);
const loading = ref(false);
const finished = ref(false);
const imgTotal = ref(0);
const sentinel = ref<HTMLElement | null>(null);
const cards = ref<HTMLElement[]>([]);

function toggleSort() {
  if (sortBy.value === "uploaded_at") {
    sortBy.value = "like_count";
    order.value = "desc";
  } else {
    sortBy.value = "uploaded_at";
    order.value = "desc";
  }
  pageImage.value = 1;
  images.value = [];
  finished.value = false;
  window.scrollTo(0, 0);
  loadNextPage();
}

// 点赞
function getLikedIds(): number[] {
  const data = localStorage.getItem("likedImageIds");
  return data ? JSON.parse(data) : [];
}
function setLikedIds(ids: number[]) {
  localStorage.setItem("likedImageIds", JSON.stringify(ids));
}
async function handleLike(img: any) {
  if (img.liked) return;
  try {
    await likeImage(img.id);
    img.likeCount += 1;
    img.liked = true;
    const likedIds = getLikedIds();
    likedIds.push(img.id);
    setLikedIds(likedIds);
  } catch (error) {
    console.error("点赞失败", error);
    alert("点赞失败，请稍后重试");
  }
}

// 数据加载
const fixImageUrl = (url: string): string => {
  if (url.includes("127.0.0.1")) {
    return url.replace("http://127.0.0.1", window.location.origin);
  }
  return url;
};
async function loadNextPage() {
  if (loading.value || finished.value) return;
  loading.value = true;
  try {
    const res = await getImagesLikesList({
      page: pageImage.value,
      limit: limit.value,
      sortBy: sortBy.value,
      character_key: "qiuyuan",
      order: order.value,
    });
    imgTotal.value = res.total;
    const likedIds = getLikedIds();
    const list = res.images.map((item: any) => ({
      src: fixImageUrl(item.url),
      alt: "",
      likeCount: item.like_count,
      id: item.id,
      liked: likedIds.includes(item.id),
    }));
    if (list.length === 0) {
      finished.value = true;
      return;
    }
    const existingIds = new Set(images.value.map((i) => i.id));
    const filtered = list.filter((item: any) => !existingIds.has(item.id));
    images.value.push(...filtered);
    pageImage.value++;
    await nextTick();
    observeNewCards();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}
const debouncedLoad = debounce(loadNextPage, 200, {
  leading: true,
  trailing: false,
});

// 卡片渐显观察
const observerCard = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observerCard.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
function observeNewCards() {
  const cards = document.querySelectorAll<HTMLElement>(".card");
  cards.forEach((card) => observerCard.observe(card));
}
function onImageLoad(e: Event) {
  const img = e.target as HTMLImageElement;
  const card = img.closest(".card");
  card?.classList.add("loaded");
}

// Lightbox
const lightboxOpen = ref(false);
const currentIndex = ref(0);
function openLightbox(index: number) {
  currentIndex.value = index;
  lightboxOpen.value = true;
}
function closeLightbox() {
  lightboxOpen.value = false;
}
function prevImage() {
  currentIndex.value =
    (currentIndex.value + images.value.length - 1) % images.value.length;
}
function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
}

// 排行榜
const rankingList = ref<any[]>([]);
const expanded = ref(true);
async function fetchRanking() {
  const res = await getRankingList({
    page: 1,
    pageSize: 99,
    character_key: "qiuyuan",
  });
  if (res.success) {
    rankingList.value = res.data;
  }
}

// 上传
const uploadModalOpen = ref(false);
const nickname = ref("");
const fileInput = ref<HTMLInputElement>();
const selectedFiles = ref<File[]>([]);
const uploadedToday = ref(
  Number(
    localStorage.getItem(`uploaded_${new Date().toISOString().slice(0, 10)}`) ||
      0
  )
);
const remaining = computed(() => Math.max(27 - uploadedToday.value, 0));
const canSubmit = computed(
  () =>
    nickname.value.trim().length > 0 &&
    selectedFiles.value.length > 0 &&
    selectedFiles.value.length <= remaining.value
);
const isUploading = ref(false);

function clearOldUploadRecords() {
  const today = new Date();
  for (const key of Object.keys(localStorage)) {
    if (!key.startsWith("uploaded_")) continue;
    const dateStr = key.slice("uploaded_".length);
    const recordDate = new Date(dateStr);
    if (isNaN(recordDate.getTime())) continue;
    if ((today.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24) > 2) {
      localStorage.removeItem(key);
    }
  }
}
function openUploadModal() {
  clearOldUploadRecords();
  nickname.value = "";
  selectedFiles.value = [];
  if (fileInput.value) fileInput.value.value = "";
  uploadedToday.value = Number(
    localStorage.getItem(`uploaded_${new Date().toISOString().slice(0, 10)}`) ||
      0
  );
  uploadModalOpen.value = true;
}
function closeUploadModal() {
  uploadModalOpen.value = false;
}
function handleFileSelect(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files || []);
  const validFiles = files.filter((f) => f.size <= 20 * 1024 * 1024);
  if (validFiles.length === 0) return;
  if (validFiles.length > remaining.value) {
    alert(
      `今日最多还能上传 ${remaining.value} 张，已截取前 ${remaining.value} 张`
    );
    selectedFiles.value = validFiles.slice(0, remaining.value);
  } else {
    selectedFiles.value = validFiles;
  }
}
async function submitUpload() {
  if (!canSubmit.value) return;
  isUploading.value = true;
  try {
    const res = await uploadImages(
      selectedFiles.value,
      nickname.value.trim(),
      "qiuyuan"
    );
    uploadedToday.value += res.data.length;
    localStorage.setItem(
      `uploaded_${new Date().toISOString().slice(0, 10)}`,
      String(uploadedToday.value)
    );
    alert(`成功上传 ${res.data.length} 张图片`);
    closeUploadModal();
  } catch (err: any) {
    console.error(err);
    alert(err.message || "上传失败");
  } finally {
    isUploading.value = false;
  }
}

// 浮动小人
const chibiList = ref<any[]>([]);
let sentinelObserver: IntersectionObserver;
onMounted(async () => {
  await fetchRanking();
  await loadNextPage();
  sentinelObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) debouncedLoad();
    },
    { threshold: 0.1 }
  );
  if (sentinel.value) sentinelObserver.observe(sentinel.value);

  // 小人
  const total = 6;
  const pickCount = window.innerWidth <= 768 ? 1 : 3;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const nums = shuffle(Array.from({ length: total }, (_, k) => k + 1));
  const picks = nums.slice(0, pickCount);
  chibiList.value = picks.map((i) => ({
    src: `/QImages/1 (${i}).png`,
    left: Math.random() * (vw - 100),
    top: Math.random() * (vh - 100),
  }));
  await nextTick();
  const imgs = document.querySelectorAll<HTMLImageElement>(".chibi-img");
  imgs.forEach((img, index) => {
    const padding = 200;
    gsap.fromTo(
      img,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(2)",
        delay: 0.2 * index,
      }
    );
    const animateChibi = (el: HTMLImageElement) => {
      const rect = el.getBoundingClientRect();
      let deltaX = (Math.random() - 0.5) * 200;
      let deltaY = (Math.random() - 0.5) * 200;
      if (rect.x + deltaX < padding) deltaX = padding - rect.x;
      if (rect.x + deltaX + el.width > window.innerWidth - padding)
        deltaX = window.innerWidth - padding - (rect.x + el.width);
      if (rect.y + deltaY < padding) deltaY = padding - rect.y;
      if (rect.y + deltaY + el.height > window.innerHeight - padding)
        deltaY = window.innerHeight - padding - (rect.y + el.height);
      gsap.to(el, {
        x: `+=${deltaX.toFixed(0)}`,
        y: `+=${deltaY.toFixed(0)}`,
        rotation: `+=${((Math.random() - 0.5) * 60).toFixed(0)}`,
        duration: 2 + Math.random() * 2,
        ease: "power1.inOut",
        onComplete: () => animateChibi(el),
      });
    };
    img.addEventListener("mouseenter", () => {
      gsap.killTweensOf(img);
      gsap.to(img, {
        x: `+=${((Math.random() - 0.5) * 400).toFixed(0)}`,
        y: `+=${((Math.random() - 0.5) * 400).toFixed(0)}`,
        duration: 1.2,
        ease: "back.out(2)",
        onComplete: () => animateChibi(img),
      });
    });
    animateChibi(img);
  });
});
onBeforeUnmount(() => {
  observerCard.disconnect();
  if (sentinelObserver) sentinelObserver.disconnect();
});
function shuffle(arr: number[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
</script>

<style scoped lang="scss">
/* ========== 仇远色彩变量 ========== */
.qiuyuan-gallery {
  --bamboo-green: #2e8f74;
  --blade-silver: #cfeee8;
  --moon-light: #b4e6e2;
  --deep-ink: #0b1a16;
  --night-base: #050a0c;
  --text-primary: #f0faf8;
  --text-secondary: rgba(207, 238, 232, 0.7);
  --card-bg: rgba(5, 10, 12, 0.55);
  --card-border: rgba(46, 143, 116, 0.2);
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  position: relative;
  min-height: 100vh;
  background: var(--night-base);
  color: var(--text-primary);
  font-family: "Noto Serif SC", "STKaiti", "KaiTi", serif;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ========== 动态氛围背景 ========== */
.bg-atmosphere {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  .moon-main {
    position: absolute;
    top: 5%;
    right: 10%;
    width: 450px;
    height: 450px;
    background: radial-gradient(
      circle at 45% 40%,
      rgba(180, 230, 226, 0.18) 0%,
      transparent 70%
    );
    filter: blur(65px);
    animation: moonBreathe 8s ease-in-out infinite alternate;
  }
  .moon-sub {
    position: absolute;
    bottom: 12%;
    left: 8%;
    width: 350px;
    height: 350px;
    background: radial-gradient(
      circle at 60% 60%,
      rgba(46, 143, 116, 0.12) 0%,
      transparent 70%
    );
    filter: blur(55px);
    animation: moonBreathe 10s ease-in-out infinite alternate-reverse;
  }
  @keyframes moonBreathe {
    from {
      opacity: 0.35;
      transform: scale(1);
    }
    to {
      opacity: 0.8;
      transform: scale(1.15);
    }
  }

  .firefly {
    position: absolute;
    width: 5px;
    height: 5px;
    background: radial-gradient(circle, #f0faf8 0%, transparent 85%);
    border-radius: 50%;
    box-shadow: 0 0 18px #cfeee8, 0 0 40px rgba(180, 230, 226, 0.55),
      0 0 60px rgba(46, 143, 116, 0.25);
    animation: fireflyFloat ease-in-out infinite;
    &::after {
      content: "";
      position: absolute;
      top: -3px;
      left: -3px;
      width: 10px;
      height: 10px;
      background: radial-gradient(
        circle,
        rgba(207, 238, 232, 0.5) 0%,
        transparent 70%
      );
      border-radius: 50%;
      filter: blur(2px);
    }
  }
  .firefly-1 {
    top: 18%;
    left: 8%;
    animation-duration: 9s;
  }
  .firefly-2 {
    top: 38%;
    left: 28%;
    animation-duration: 13s;
    animation-delay: 2s;
  }
  .firefly-3 {
    top: 58%;
    left: 68%;
    animation-duration: 10s;
    animation-delay: 4s;
  }
  .firefly-4 {
    top: 28%;
    left: 78%;
    animation-duration: 12s;
    animation-delay: 6s;
  }
  .firefly-5 {
    top: 72%;
    left: 18%;
    animation-duration: 11s;
    animation-delay: 1s;
  }
  .firefly-6 {
    top: 85%;
    left: 55%;
    animation-duration: 14s;
    animation-delay: 7s;
  }
  @keyframes fireflyFloat {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.25;
    }
    25% {
      transform: translate(35px, -70px) scale(1.6);
      opacity: 0.85;
    }
    50% {
      transform: translate(-25px, -120px) scale(1.2);
      opacity: 0.3;
    }
    75% {
      transform: translate(15px, -160px) scale(1);
      opacity: 0.7;
    }
  }

  .sword-light {
    position: absolute;
    left: -15%;
    width: 320%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(46, 143, 116, 0.25) 20%,
      rgba(207, 238, 232, 0.7) 45%,
      rgba(180, 230, 226, 0.9) 50%,
      rgba(207, 238, 232, 0.7) 55%,
      rgba(46, 143, 116, 0.25) 80%,
      transparent
    );
    filter: blur(1px) drop-shadow(0 0 6px rgba(46, 143, 116, 0.5));
    animation: swordSweep linear infinite;
    mix-blend-mode: screen;
  }
  .sword-light-1 {
    bottom: 22%;
    animation-duration: 9s;
    transform: rotate(-12deg);
  }
  .sword-light-2 {
    bottom: 38%;
    animation-duration: 13s;
    animation-delay: -4s;
    transform: rotate(15deg) scaleX(1.1);
  }
  .sword-light-3 {
    bottom: 55%;
    animation-duration: 7s;
    animation-delay: -2s;
    transform: rotate(-25deg) scaleY(0.7);
    height: 0.8px;
    opacity: 0.6;
  }
  @keyframes swordSweep {
    0% {
      transform: translateX(-25%) rotate(-12deg);
      opacity: 0;
    }
    35% {
      opacity: 0.9;
    }
    65% {
      opacity: 0.7;
    }
    100% {
      transform: translateX(45%) rotate(-12deg);
      opacity: 0;
    }
  }

  .rain {
    position: absolute;
    top: -10%;
    left: 0;
    width: 100%;
    height: 120%;
    background: repeating-linear-gradient(
      transparent 0px,
      transparent 3px,
      rgba(180, 230, 226, 0.04) 3px,
      rgba(180, 230, 226, 0.04) 4px
    );
    mask-image: linear-gradient(
      to bottom,
      transparent 10%,
      black 40%,
      black 60%,
      transparent 90%
    );
    animation: rainFall 0.6s linear infinite;
  }
  @keyframes rainFall {
    0% {
      transform: translateY(-2%);
    }
    100% {
      transform: translateY(2%);
    }
  }

  .mist {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35%;
    background: linear-gradient(
      to top,
      rgba(38, 120, 90, 0.1) 0%,
      transparent 80%
    );
    filter: blur(30px);
    animation: mistRise 14s ease-in-out infinite;
  }
  @keyframes mistRise {
    0%,
    100% {
      opacity: 0.35;
      transform: translateY(0) scale(1);
    }
    50% {
      opacity: 0.6;
      transform: translateY(-8px) scale(1.02);
    }
  }

  .hat-silhouette {
    position: absolute;
    top: 15%;
    right: 8%;
    width: 100px;
    height: 100px;
    background: radial-gradient(
      ellipse at 50% 45%,
      transparent 35%,
      rgba(207, 238, 232, 0.05) 36%,
      rgba(207, 238, 232, 0.12) 70%,
      transparent 71%
    );
    border-radius: 50%;
    filter: blur(7px);
    animation: hatFloat 10s ease-in-out infinite;
  }
  @keyframes hatFloat {
    0%,
    100% {
      transform: translateY(0) rotate(2deg);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-12px) rotate(-2deg);
      opacity: 0.55;
    }
  }

  .ink-drop {
    position: absolute;
    width: 2px;
    height: 2px;
    background: rgba(46, 143, 116, 0.85);
    border-radius: 50%;
    box-shadow: 0 0 12px #2e8f74;
    animation: inkDrop 8s linear infinite;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 40px;
      height: 40px;
      margin: -20px;
      border: 1px solid rgba(46, 143, 116, 0.25);
      border-radius: 50%;
      animation: ripple 2.5s ease-out infinite;
    }
  }
  .ink-drop-1 {
    top: 25%;
    left: 15%;
  }
  .ink-drop-2 {
    top: 45%;
    left: 75%;
    animation-delay: 4s;
  }
  @keyframes inkDrop {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    20% {
      opacity: 0.8;
    }
    80% {
      opacity: 0.4;
    }
    100% {
      transform: translateY(80vh);
      opacity: 0;
    }
  }
  @keyframes ripple {
    0% {
      transform: scale(0.5);
      opacity: 0.8;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }
}

/* 内容层 */
.section {
  position: relative;
  z-index: 2;
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 排序按钮 */
.sort-controls {
  margin-bottom: 20px;
  .sort-btn {
    background: rgba(5, 10, 12, 0.6);
    backdrop-filter: blur(8px);
    border: 1px solid var(--card-border);
    color: var(--blade-silver);
    padding: 10px 28px;
    border-radius: 30px;
    font-size: 1rem;
    letter-spacing: 2px;
    font-family: "ZCOOL KuaiLe", "STKaiti", serif;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    &:hover {
      border-color: var(--bamboo-green);
      box-shadow: 0 12px 30px rgba(46, 143, 116, 0.3);
      color: #fff;
      transform: translateY(-2px);
    }
  }
}

/* 图片网格 */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;

  .card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .card-inner {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      background: var(--card-bg);
      backdrop-filter: blur(6px);
      border: 1px solid var(--card-border);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
      cursor: pointer;
      &:hover {
        transform: translateY(-6px);
        border-color: var(--bamboo-green);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7),
          0 0 20px rgba(46, 143, 116, 0.2);
      }
      img {
        width: 100%;
        display: block;
        filter: brightness(0.9) saturate(0.8);
        transition: filter 0.5s;
      }
      &.loaded img {
        filter: brightness(1) saturate(1);
      }
      .overlay {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 14px;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s;
        span {
          color: var(--blade-silver);
          font-size: 1rem;
          letter-spacing: 2px;
        }
      }
      &:hover .overlay {
        opacity: 1;
      }
      .like-btn {
        position: absolute;
        bottom: 12px;
        right: 12px;
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--blade-silver);
        font-size: 1rem;
        text-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
        .heart {
          width: 24px;
          height: 24px;
          background: url("/icons/heart-red-outline.svg") no-repeat center /
            contain;
          filter: drop-shadow(0 0 4px var(--bamboo-green));
          &.liked {
            background-image: url("/icons/heart-red-filled.svg");
            filter: drop-shadow(0 0 6px var(--bamboo-green));
          }
        }
      }
    }
  }
}

.sentinel {
  height: 20px;
}
.loading,
.finished {
  text-align: center;
  padding: 20px;
  color: var(--text-secondary);
  font-style: italic;
  letter-spacing: 2px;
}

/* 上传按钮 */
.upload-btn {
  position: fixed;
  bottom: 32px;
  left: 32px;
  z-index: 50;
  background: linear-gradient(135deg, var(--bamboo-green), var(--deep-ink));
  border: 1px solid var(--blade-silver);
  color: #fff;
  padding: 12px 24px;
  border-radius: 40px;
  font-size: 1rem;
  font-family: "ZCOOL KuaiLe", "STKaiti", serif;
  letter-spacing: 3px;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 10px rgba(46, 143, 116, 0.4);
  transition: all 0.3s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(46, 143, 116, 0.7);
  }
}

/* 排行榜面板 */
.ranking-panel {
  position: fixed;
  top: 80px;
  right: 16px;
  width: 220px;
  z-index: 30;
  background: rgba(5, 10, 12, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid var(--card-border);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  color: var(--text-primary);
  padding: 16px;
  font-size: 0.9rem;

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .ranking-title {
      font-family: "ZCOOL KuaiLe", serif;
      color: var(--blade-silver);
      margin: 0;
      letter-spacing: 2px;
    }
    .toggle-icon {
      color: var(--bamboo-green);
    }
  }
  .ranking-list {
    list-style: none;
    padding: 0;
    margin: 12px 0 0;
    max-height: 55vh;
    overflow-y: auto;
    .ranking-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 8px;
      border-radius: 10px;
      margin-bottom: 8px;
      background: rgba(0, 0, 0, 0.2);
      transition: transform 0.2s, background 0.2s;
      &:hover {
        transform: translateX(-4px);
        background: rgba(46, 143, 116, 0.1);
      }
      .rank {
        font-weight: 700;
        color: var(--bamboo-green);
        width: 24px;
      }
      .name {
        flex: 1;
        padding: 0 8px;
        font-weight: 500;
      }
      .count {
        color: var(--blade-silver);
      }
      &.rank-1 {
        background: linear-gradient(
          135deg,
          rgba(46, 143, 116, 0.3),
          transparent
        );
        .rank {
          color: var(--blade-silver);
        }
      }
      &.rank-2 {
        background: rgba(46, 143, 116, 0.1);
      }
      &.rank-3 {
        background: rgba(46, 143, 116, 0.05);
      }
    }
  }
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(5, 10, 12, 0.96);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  img {
    max-width: 90%;
    max-height: 85%;
    border-radius: 12px;
    box-shadow: 0 0 40px rgba(46, 143, 116, 0.3);
    border: 1px solid var(--card-border);
  }
  .close,
  .prev,
  .next {
    position: absolute;
    color: var(--blade-silver);
    font-size: 2.5rem;
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
      color: var(--bamboo-green);
    }
  }
  .close {
    top: 20px;
    right: 20px;
  }
  .prev {
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
  .next {
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
}

/* 上传弹窗 */
.upload-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 10, 12, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.upload-modal {
  background: rgba(6, 16, 18, 0.9);
  backdrop-filter: blur(12px);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
  color: var(--text-primary);
  h3 {
    font-family: "ZCOOL KuaiLe", serif;
    color: var(--blade-silver);
    letter-spacing: 3px;
    margin-bottom: 20px;
  }
  .stats strong {
    color: var(--bamboo-green);
  }
  label {
    display: block;
    margin-bottom: 16px;
    color: var(--text-secondary);
    input {
      width: 100%;
      margin-top: 8px;
      padding: 10px;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      color: var(--text-primary);
      &:focus {
        border-color: var(--bamboo-green);
        outline: none;
      }
    }
  }
  .modal-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 20px;
    button {
      padding: 10px 24px;
      border-radius: 30px;
      border: none;
      cursor: pointer;
      font-family: inherit;
      font-weight: 600;
      letter-spacing: 1px;
      transition: all 0.3s;
      &:first-child {
        background: linear-gradient(
          135deg,
          var(--bamboo-green),
          var(--deep-ink)
        );
        color: #fff;
        &:hover:not(:disabled) {
          box-shadow: 0 8px 20px rgba(46, 143, 116, 0.4);
          transform: translateY(-2px);
        }
        &:disabled {
          opacity: 0.5;
          animation: cursorAnimation_disabled 1s infinite step-start;
        }
      }
      &.cancel {
        background: transparent;
        border: 1px solid var(--card-border);
        color: var(--text-secondary);
        &:hover {
          border-color: var(--blade-silver);
          color: #fff;
        }
      }
    }
  }
}

/* 浮动小人 */
.floating-chibis {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  .chibi-img {
    position: absolute;
    width: 80px;
    pointer-events: auto;
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .section {
    padding: 40px 14px;
  }
  .upload-btn {
    bottom: 20px;
    left: 20px;
    padding: 8px 16px;
    font-size: 0.9rem;
  }
  .ranking-panel {
    top: 10px;
    right: 8px;
    width: 180px;
    padding: 10px;
    font-size: 0.8rem;
  }
}
</style>
