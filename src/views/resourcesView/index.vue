<template>
  <div class="qiuyuan-resources">
    <!-- 轮播背景（保留） -->
    <div class="carousel carousel1" aria-hidden="true">
      <img
        v-for="(src, idx) in randomFive"
        :key="idx"
        :src="src"
        class="carousel-image"
        :class="{ active: idx === currentIndex }"
      />
      <!-- 青墨遮罩与竹影纹理 -->
      <div class="carousel-overlay"></div>
    </div>
    <div class="carousel carousel2" aria-hidden="true">
      <img
        v-for="(src, idx) in randomFive2"
        :key="idx"
        :src="src"
        class="carousel-image"
        :class="{ active: idx === currentIndex }"
      />
      <div class="carousel-overlay"></div>
    </div>

    <!-- 页眉 -->
    <header class="hero">
      <div class="hero-inner">
        <h1>铸剑工坊</h1>
        <p class="subtitle">百兵之胆，匠心独运 · 分享仇远相关资源</p>
      </div>
      <div class="hero-decor left"></div>
      <div class="hero-decor right"></div>
    </header>

    <main class="container">
      <!-- 上传区 -->
      <section class="uploader" :class="{ collapsed: uploaderCollapsed }">
        <div class="uploader-head">
          <button
            class="toggle"
            @click="toggleUploader"
            :aria-expanded="!uploaderCollapsed"
          >
            <span v-if="uploaderCollapsed">展开锻炉</span>
            <span v-else>收起锻炉</span>
          </button>
        </div>

        <form
          @submit.prevent="addResource"
          class="upload-form"
          :aria-hidden="uploaderCollapsed"
        >
          <div class="row">
            <input
              v-model="form.title"
              type="text"
              placeholder="剑铭（必填，可注明解压码等）"
              aria-label="标题"
            />
            <input
              v-model="form.type"
              type="text"
              placeholder="剑式（网页/视频/网盘等）"
              aria-label="类型"
            />
          </div>

          <div class="row">
            <input
              v-model="form.uploader"
              type="text"
              placeholder="铸剑师（可选）"
              aria-label="上传人"
            />
            <input
              v-model="form.link"
              type="url"
              placeholder="剑匣链接（须以http开头）"
              aria-label="链接"
            />
          </div>

          <div class="actions">
            <button type="submit" class="btn primary">青锋入匣</button>
          </div>
        </form>
      </section>

      <!-- 资源列表 -->
      <section class="list">
        <div class="list-header">
          <h2>剑藏（{{ resources.length }}）</h2>
          <div class="sort">
            <label>
              排序：
              <select v-model="sortBy">
                <option value="time">时间</option>
                <option value="likes">点赞</option>
              </select>
            </label>
          </div>
        </div>

        <ul class="items">
          <li v-for="item in sortedResources" :key="item.id" class="item">
            <a
              :href="item.link"
              target="_blank"
              rel="noopener noreferrer"
              class="title"
              >{{ item.title }}</a
            >

            <div class="meta">
              <div class="left">
                <span class="uploader">{{ item.uploader || "无名" }}</span>
                <span class="dot">•</span>
                <time :datetime="item.time">{{ formatTime(item.time) }}</time>
              </div>

              <div class="right">
                <button
                  @click.prevent="handleLike(item)"
                  :aria-pressed="likedIds.has(String(item.id))"
                  class="like-btn"
                  :class="{ active: likedIds.has(String(item.id)) }"
                >
                  <img
                    :src="
                      likedIds.has(String(item.id))
                        ? '/icons/heart-red-filled.svg'
                        : '/icons/heart-red-outline.svg'
                    "
                    class="heart-icon"
                    alt="heart"
                  />
                  <span class="count">{{ item.likes }}</span>
                </button>

                <span class="badge">{{ item.type }}</span>
              </div>
            </div>
          </li>
        </ul>

        <p v-if="resources.length === 0" class="empty">
          剑匣尚空，请铸剑师留下第一柄青锋
        </p>
      </section>
    </main>

    <footer class="foot">点击剑铭即可出鞘</footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import {
  getResourceList,
  createResource,
  likeResource,
} from "@/api/modules/resource";
import { ElMessage } from "element-plus";

interface Resource {
  id: number | string;
  title: string;
  uploader?: string;
  time: string;
  likes: number;
  link: string;
  type: string;
  role_key?: string;
}

const STORAGE_KEY = "qiuyuan_resources_liked";
const DEFAULT_ROLE = "qiuyuan";

const form = ref({
  title: "",
  uploader: "",
  link: "",
  type: "",
});

const resources = ref<Resource[]>([]);
const likedIds = ref(new Set<string>());
const sortBy = ref<"time" | "likes">("time");
const uploaderCollapsed = ref(false);

function mapServerToLocal(row: any): Resource {
  return {
    id: row.id,
    title: row.title,
    uploader: row.uploader || "无名",
    time: row.created_at || row.time || new Date().toISOString(),
    likes: row.likes ?? 0,
    link: row.link,
    type: row.storage_type || row.type || "other",
    role_key: row.role_key,
  };
}

async function loadResources() {
  try {
    const res: any = await getResourceList({
      role_key: DEFAULT_ROLE,
      page: 1,
      pageSize: 100,
    });
    if (res && res.success && Array.isArray(res.data)) {
      resources.value = res.data.map(mapServerToLocal);
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed.liked && Array.isArray(parsed.liked)) {
            parsed.liked.forEach((id: string) => likedIds.value.add(id));
          }
        } catch (e) {
          /* ignore */
        }
      }
      return;
    }
  } catch (err) {
    console.warn("拉取资源失败", err);
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.liked && Array.isArray(parsed.liked)) {
        parsed.liked.forEach((id: string) => likedIds.value.add(id));
      }
    }
  } catch (e) {
    /* ignore */
  }
}

function saveLocalCache() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ liked: Array.from(likedIds.value) })
    );
  } catch (e) {
    /* ignore */
  }
}

// ========== 背景图片轮播 ==========
const modules = import.meta.glob("@/assets/images1/*.{jpg,png,jpeg,webp}", {
  eager: true,
});
const allSrcs: string[] = Object.values(modules).map((mod: any) => mod.default);
const modules2 = import.meta.glob("@/assets/images2/*.{jpg,png,jpeg,webp}", {
  eager: true,
});
const allSrcs2: string[] = Object.values(modules2).map(
  (mod: any) => mod.default
);

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const randomFive = ref<string[]>(shuffle(allSrcs).slice(0, 5));
const randomFive2 = ref<string[]>(shuffle(allSrcs2).slice(0, 5));
const currentIndex = ref(0);
let Imgtimer: number | undefined;

onMounted(() => {
  loadResources();
  Imgtimer = window.setInterval(() => {
    currentIndex.value =
      (currentIndex.value + 1) % Math.max(1, randomFive.value.length);
  }, 5200);
  uploaderCollapsed.value = window.innerWidth <= 640;
});

function toggleUploader() {
  uploaderCollapsed.value = !uploaderCollapsed.value;
}

onBeforeUnmount(() => {
  if (Imgtimer) clearInterval(Imgtimer);
});

async function addResource() {
  const t = form.value.title.trim();
  const l = form.value.link.trim();
  if (!t || !l) {
    return ElMessage.warning("剑铭与剑匣链接不可为空");
  }
  if (!/^https?:\/\//i.test(l)) {
    return ElMessage.error("链接需以http://或https://开头");
  }
  try {
    const payload = {
      title: t,
      uploader: form.value.uploader.trim() || "无名",
      link: l,
      storage_type: form.value.type,
      role_key: DEFAULT_ROLE,
    };
    const res: any = await createResource(payload);
    if (res && res.success && res.data) {
      const added = mapServerToLocal(res.data);
      resources.value.unshift(added);
      saveLocalCache();
      resetForm();
      ElMessage.success("剑已入匣");
      return;
    }
    ElMessage.error("入匣失败");
  } catch (err) {
    console.warn("创建资源失败", err);
  }
}

function resetForm() {
  form.value.title = "";
  form.value.uploader = "";
  form.value.link = "";
  form.value.type = "";
}

async function handleLike(item: Resource) {
  const id = String(item.id);
  const wasLiked = likedIds.value.has(id);
  if (wasLiked) {
    likedIds.value.delete(id);
    item.likes = Math.max(0, item.likes - 1);
  } else {
    likedIds.value.add(id);
    item.likes++;
  }
  saveLocalCache();

  try {
    const action = wasLiked ? "unlike" : "like";
    const res: any = await likeResource(item.id, action);
    if (
      res &&
      res.success &&
      res.data &&
      typeof res.data.likes !== "undefined"
    ) {
      item.likes = res.data.likes;
    }
  } catch (err) {
    console.warn("点赞接口调用失败，回滚本地状态", err);
    if (wasLiked) {
      likedIds.value.add(id);
      item.likes++;
    } else {
      likedIds.value.delete(id);
      item.likes = Math.max(0, item.likes - 1);
    }
    saveLocalCache();
  }
}

const sortedResources = computed(() => {
  const arr = [...resources.value];
  if (sortBy.value === "time") {
    arr.sort((a, b) => +new Date(b.time) - +new Date(a.time));
  } else {
    arr.sort((a, b) => b.likes - a.likes);
  }
  return arr;
});

function formatTime(iso: string) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch (e) {
    return iso;
  }
}
</script>

<style scoped lang="scss">
/* ========== 仇远色彩变量 ========== */
.qiuyuan-resources {
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

/* ========== 轮播背景 ========== */
.carousel {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  .carousel-image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.7) saturate(0.8);
    opacity: 0;
    transition: opacity 1.2s ease;
    &.active {
      opacity: 1;
    }
  }

  // 青墨遮罩与竹影纹理
  .carousel-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(
        circle at 30% 40%,
        rgba(6, 16, 18, 0.3),
        rgba(5, 10, 12, 0.8)
      ),
      repeating-linear-gradient(
        90deg,
        transparent 0px,
        rgba(46, 143, 116, 0.02) 2px,
        transparent 4px
      ),
      repeating-linear-gradient(
        0deg,
        transparent 0px,
        rgba(46, 143, 116, 0.02) 2px,
        transparent 4px
      );
    backdrop-filter: blur(1px);
    z-index: 1;
  }
}

.carousel2 {
  display: none; // 移动端显示
}

/* ========== 页眉 ========== */
.hero {
  position: relative;
  z-index: 2;
  padding: 24px 20px;
  background: rgba(5, 10, 12, 0.5);
  backdrop-filter: blur(2px);
  border-bottom: 1px solid var(--card-border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  .hero-inner {
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
    h1 {
      font-family: "ZCOOL KuaiLe", "STKaiti", serif;
      font-size: 2.6rem;
      letter-spacing: 8px;
      background: linear-gradient(
        135deg,
        #fff,
        var(--blade-silver),
        var(--bamboo-green)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 0 12px;
      text-shadow: 0 0 30px rgba(46, 143, 116, 0.5);
    }
    .subtitle {
      color: var(--moon-light);
      font-size: 1rem;
      letter-spacing: 3px;
      font-style: italic;
      opacity: 0.9;
    }
  }

  // 两侧竹叶装饰
  .hero-decor {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 100px;
    background: radial-gradient(
      ellipse at 50% 20%,
      rgba(46, 143, 116, 0.15),
      transparent 70%
    );
    filter: blur(10px);
    opacity: 0.6;
    pointer-events: none;
    &.left {
      left: 20px;
    }
    &.right {
      right: 20px;
    }
  }
}

/* ========== 容器 ========== */
.container {
  position: relative;
  z-index: 2;
  max-width: 1000px;
  margin: 24px auto;
  padding: 0 16px;
}

/* ========== 上传区 ========== */
.uploader {
  background: var(--card-bg);
  backdrop-filter: blur(2px);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  box-shadow: var(--shadow), inset 0 1px 0 rgba(46, 143, 116, 0.1);
  margin-bottom: 28px;
  overflow: hidden;
  transition: all 0.3s;

  .uploader-head {
    display: flex;
    justify-content: flex-end;
    padding: 14px 18px;
    .toggle {
      background: rgba(46, 143, 116, 0.1);
      border: 1px solid var(--card-border);
      color: var(--blade-silver);
      padding: 8px 22px;
      border-radius: 24px;
      font-family: inherit;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background: rgba(46, 143, 116, 0.25);
        border-color: var(--bamboo-green);
        box-shadow: 0 0 12px rgba(46, 143, 116, 0.3);
      }
    }
  }

  .upload-form {
    padding: 0 18px 18px;
    max-height: 600px;
    overflow: hidden;
    transition: max-height 0.4s ease, padding 0.4s ease;
    .row {
      display: flex;
      gap: 12px;
      margin-bottom: 12px;
      input {
        flex: 1;
        padding: 12px 16px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid var(--card-border);
        border-radius: 12px;
        color: var(--text-primary);
        font-family: inherit;
        font-size: 0.95rem;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        &::placeholder {
          color: var(--text-secondary);
          opacity: 0.5;
        }
        &:focus {
          border-color: var(--bamboo-green);
          box-shadow: 0 0 12px rgba(46, 143, 116, 0.3);
          background: rgba(0, 0, 0, 0.5);
        }
      }
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      .btn.primary {
        background: linear-gradient(
          135deg,
          var(--bamboo-green),
          var(--deep-ink)
        );
        border: 1px solid var(--blade-silver);
        padding: 12px 32px;
        border-radius: 30px;
        color: #fff;
        font-family: "ZCOOL KuaiLe", "STKaiti", serif;
        font-weight: 700;
        letter-spacing: 3px;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4),
          0 0 15px rgba(46, 143, 116, 0.4);
        transition: all 0.3s;
        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(46, 143, 116, 0.6);
        }
        &:active {
          transform: translateY(0);
        }
      }
    }
  }

  &.collapsed .upload-form {
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
}

/* ========== 资源列表 ========== */
.list {
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h2 {
      font-family: "ZCOOL KuaiLe", serif;
      font-size: 1.5rem;
      color: var(--blade-silver);
      letter-spacing: 3px;
      margin: 0;
      text-shadow: 0 0 10px rgba(46, 143, 116, 0.4);
    }
    .sort select {
      background: rgba(5, 10, 12, 0.6);
      border: 1px solid var(--card-border);
      color: var(--text-primary);
      padding: 8px 14px;
      border-radius: 10px;
      font-family: inherit;
      font-size: 0.9rem;
      cursor: pointer;
      outline: none;
      backdrop-filter: blur(6px);
      transition: border-color 0.2s;
      &:focus {
        border-color: var(--bamboo-green);
      }
    }
  }

  .items {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 65vh;
    overflow-y: auto;

    .item {
      background: rgba(6, 16, 18, 0.45);
      backdrop-filter: blur(1px);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 16px 20px;
      margin-bottom: 14px;
      transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);

      &:hover {
        border-color: var(--bamboo-green);
        transform: translateY(-4px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.7),
          0 0 20px rgba(46, 143, 116, 0.2);
      }

      .title {
        display: block;
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--text-primary);
        text-decoration: none;
        margin-bottom: 12px;
        letter-spacing: 1px;
        word-break: break-word;
        transition: color 0.2s, text-shadow 0.2s;
        &:hover {
          color: var(--blade-silver);
          text-shadow: 0 0 12px rgba(46, 143, 116, 0.6);
        }
      }

      .meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.85rem;

        .left {
          display: flex;
          align-items: center;
          gap: 8px;
          .uploader {
            color: var(--blade-silver);
            font-weight: 600;
            margin: auto 0;
            padding: 6px;
          }
          .dot {
            color: var(--text-secondary);
          }
          time {
            color: var(--text-secondary);
          }
        }

        .right {
          display: flex;
          align-items: center;
          gap: 12px;
          .like-btn {
            background: none;
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: var(--text-secondary);
            padding: 6px 10px;
            border-radius: 20px;
            transition: all 0.2s;
            &:hover {
              background: rgba(46, 143, 116, 0.15);
            }
            .heart-icon {
              width: 20px;
              height: 20px;
              filter: drop-shadow(0 0 4px var(--bamboo-green));
            }
            &.active .heart-icon {
              filter: drop-shadow(0 0 8px var(--bamboo-green)) saturate(1.5);
            }
            .count {
              font-weight: 600;
              color: var(--text-primary);
            }
          }
          .badge {
            background: rgba(46, 143, 116, 0.2);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            color: var(--blade-silver);
            border: 1px solid var(--card-border);
            text-transform: uppercase;
            letter-spacing: 1px;
          }
        }
      }
    }
  }

  .empty {
    text-align: center;
    color: var(--text-secondary);
    padding: 60px 0;
    font-style: italic;
    letter-spacing: 3px;
    font-size: 1.1rem;
  }
}

/* ========== 页脚 ========== */
.foot {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin: 20px 0 40px;
  letter-spacing: 2px;
  opacity: 0.6;
}

/* ========== 响应式 ========== */
@media (max-width: 980px) {
  .carousel1 {
    display: none;
  }
  .carousel2 {
    display: block;
  }
}

@media (max-width: 640px) {
  .qiuyuan-resources {
    padding-top: 80px;
  }

  .hero {
    padding: 16px 14px;
    .hero-inner {
      h1 {
        font-size: 1.8rem;
        letter-spacing: 4px;
      }
      .subtitle {
        font-size: 0.85rem;
        letter-spacing: 1px;
      }
    }
  }

  .container {
    padding: 0 12px;
  }

  .upload-form .row {
    flex-direction: column;
  }

  .items .item .meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
