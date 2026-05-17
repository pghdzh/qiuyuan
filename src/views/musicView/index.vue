<template>
  <section
    class="qiuyuan-player"
    @keydown.space.prevent="onSpace"
    tabindex="0"
    ref="rootEl"
    aria-label="弹铗而歌 · 仇远音乐馆"
  >
    <div class="stage">
      <!-- 左侧：封面与控制 -->
      <div class="left" role="region" aria-label="播放器控制区">
        <div class="cover" :style="coverStyle">
          <!-- 视频背景 -->
          <video
            v-if="videoSrc"
            class="video-background"
            :src="videoSrc"
            autoplay
            muted
            loop
            playsinline
            aria-hidden="true"
            tabindex="-1"
            :class="videoClass"
          ></video>
          <!-- 青墨遮罩 -->
          <div class="video-overlay"></div>

          <!-- 加载遮罩 -->
          <div v-if="loadingAudio" class="loading-overlay" aria-hidden="true">
            <div class="spinner" />
            <div class="loading-text">剑意凝神中…</div>
          </div>
        </div>

        <div class="controls">
          <div class="title" :title="current?.title || '未选曲目'">
            {{ current?.title || "未选曲目" }}
          </div>

          <div class="meta">
            <span class="time">{{ formatTime(currentTime) }}</span>
            <span class="divider">/</span>
            <span class="time">{{ formatTime(duration) }}</span>
          </div>

          <!-- 进度条 -->
          <div
            class="progress-wrap"
            ref="progressWrap"
            @click="seekByClick"
            @pointerdown.prevent="onPointerDownProgress"
            role="slider"
            :aria-valuemin="0"
            :aria-valuemax="duration"
            :aria-valuenow="currentTime"
            aria-label="进度条"
          >
            <div class="progress-bar">
              <div
                class="progress"
                :style="{ width: progressPercent + '%' }"
              ></div>
            </div>
            <div
              class="progress-handle"
              :style="{ left: progressPercent + '%' }"
              aria-hidden="true"
            ></div>
          </div>

          <!-- 控件行 -->
          <div class="btns">
            <button class="icon" @click="prev" aria-label="上一首">⟵</button>

            <button
              class="play"
              @click="togglePlay"
              :aria-pressed="playing"
              :aria-label="playing ? '暂停' : '播放'"
            >
              <span v-if="!playing">▶</span>
              <span v-else>▌▌</span>
            </button>

            <button class="icon" @click="next" aria-label="下一首">⟶</button>

            <div class="modes" role="group" aria-label="播放模式">
              <button
                :class="{ active: shuffle }"
                @click="toggleShuffle"
                title="随机播放"
              >
                🔀
              </button>
              <button
                :class="{ active: repeatMode !== 'off' }"
                @click="toggleRepeat"
                title="循环模式"
              >
                🔁
              </button>
            </div>

            <div class="volume" aria-label="音量控制">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                v-model.number="volume"
                aria-label="音量"
              />
            </div>
          </div>

          <div v-if="errorMessage" class="error-msg" role="status">
            {{ errorMessage }}
          </div>
        </div>
      </div>

      <!-- 右侧：播放列表 -->
      <div
        class="right"
        :class="{ collapsed: !playlistOpen && isMobile }"
        role="region"
        aria-label="播放列表"
      >
        <div class="playlist-header">
          <div class="left-head">
            <h3>剑曲藏匣</h3>
            <button
              class="toggle-list-text"
              @click="togglePlaylist"
              :title="playlistOpen ? '收起列表' : '展开列表'"
            >
              {{ playlistOpen ? "收起" : "展开" }}
            </button>
            <div class="api-hint">
              {{ loading ? "加载中…" : list.length ? "" : "剑匣尚空" }}
            </div>
          </div>

          <div class="search-wrap">
            <input
              v-model="searchTerm"
              @input="onSearchInput"
              placeholder="搜索剑曲…"
              aria-label="搜索曲目"
            />
            <button
              v-if="searchTerm"
              class="clear"
              @click="clearSearch"
              aria-label="清除搜索"
            >
              ✕
            </button>
          </div>
        </div>

        <div class="list-area">
          <div v-if="loading" class="list-loading">
            <div class="small-spinner" />
            加载曲目...
          </div>

          <ul class="playlist" role="list">
            <li
              v-for="(item, idx) in filteredList"
              :key="item.name || idx"
              :class="{ active: current && item.name === current.name }"
              @click="selectTrack(idx)"
              tabindex="0"
              @keyup.enter="selectTrack(idx)"
              role="listitem"
              :aria-current="idx === index ? 'true' : 'false'"
            >
              <div class="left-col">
                <div class="dot" aria-hidden="true"></div>
                <div class="title" :title="item.title">{{ item.title }}</div>
              </div>
              <div class="right-col">
                <div class="len">
                  {{ item.duration ? formatTime(item.duration) : "--:--" }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- audio 元素 -->
    <audio
      ref="audioRef"
      @timeupdate="onTimeUpdate"
      @ended="onEnded"
      @loadedmetadata="onLoadedMetadata"
      @error="onAudioError"
      preload="metadata"
    ></audio>

    <!-- 浮动小人 -->
    <div class="floating-chibis">
      <img
        v-for="(pet, i) in chibiList"
        :key="i"
        :src="pet.src"
        :style="{ top: pet.top + 'px', left: pet.left + 'px' }"
        class="chibi-img"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from "vue";
import { getMusicList, getMusicUrl } from "@/api/modules/music";
import gsap from "gsap";

type MusicItem = {
  name: string;
  title: string;
  url?: string;
  duration?: number | null;
};

const list = ref<MusicItem[]>([]);
const loading = ref(false);
const index = ref<number>(-1);
const playing = ref(false);
const audioRef = ref<HTMLAudioElement | null>(null);
const currentTime = ref<number>(0);
const duration = ref<number>(0);
const volume = ref<number>(
  Number(localStorage.getItem("qiuyuan_volume") ?? 0.8)
);
const shuffle = ref<boolean>(false);
const repeatMode = ref<"off" | "one" | "all">("off");

const rootEl = ref<HTMLElement | null>(null);
const progressWrap = ref<HTMLElement | null>(null);
const dragging = ref(false);
const playlistOpen = ref(true);
const errorMessage = ref<string | null>(null);
const loadingAudio = ref(false);

const isMobile = ref<boolean>(window.innerWidth <= 920);
window.addEventListener("resize", () => {
  isMobile.value = window.innerWidth <= 920;
});

const videoSrc = ref("");
const videoClass = ref("");

const searchTerm = ref("");
let searchTimer: any = null;
const searchDebounceMs = 240;

const current = computed(() =>
  index.value >= 0 && list.value[index.value] ? list.value[index.value] : null
);
const progressPercent = computed(() =>
  duration.value
    ? Math.min(100, Math.max(0, (currentTime.value / duration.value) * 100))
    : 0
);

// 封面渐变（仇远风格）
const coverStyle = computed(() => {
  const t = current.value?.title || "qiuyuan";
  let hash = 0;
  for (let i = 0; i < t.length; i++)
    hash = (hash << 5) - hash + t.charCodeAt(i);
  const r1 = (Math.abs(hash) % 80) + 30; // 暗青
  const r2 = (Math.abs(hash * 3) % 100) + 20;
  return {
    background: `radial-gradient(circle at 28% 28%, rgba(180,230,226,0.08), transparent 12%), linear-gradient(135deg, rgba(${r1},${r2},${
      (Math.abs(hash) % 40) + 80
    },0.12), rgba(${r2},${r1 + 20},${(Math.abs(hash) % 60) + 60},0.1))`,
  };
});

const filteredList = computed(() => {
  const term = (searchTerm.value || "").trim().toLowerCase();
  if (!term) return list.value;
  return list.value.filter((i) => (i.title || "").toLowerCase().includes(term));
});

async function fetchList() {
  loading.value = true;
  try {
    const res = await getMusicList();
    const items =
      res?.ok && Array.isArray(res.list)
        ? res.list
        : Array.isArray(res)
        ? res
        : res?.list ?? [];
    list.value = items.map((it: any) => ({
      name: it.name,
      title: it.title ?? (it.name ? it.name.replace(/\.mp3$/i, "") : "未知"),
      url: getMusicUrl(it.name),
      duration: null,
    }));
  } catch (e) {
    console.error("获取音乐列表失败", e);
    list.value = [];
    errorMessage.value = "加载目录失败";
  } finally {
    loading.value = false;
  }
}

async function safeSetSrc(url: string) {
  const a = audioRef.value!;
  errorMessage.value = null;
  loadingAudio.value = true;
  try {
    try {
      const head = await fetch(url, { method: "HEAD" });
      if (!head.ok) throw new Error(`资源响应 ${head.status}`);
    } catch (e) {
      /* ignore */
    }
    a.src = url;
    a.load();
  } catch (err) {
    console.error("设置音源失败", err);
    errorMessage.value = "无法加载音频资源";
    throw err;
  } finally {
    // loadingAudio 在 loadedmetadata 或 error 中关闭
  }
}

async function loadCurrent(doPlay = false) {
  const a = audioRef.value;
  const curr = current.value;
  if (!a || !curr) return;
  a.pause();
  duration.value = 0;
  currentTime.value = 0;
  try {
    await safeSetSrc(curr.url || getMusicUrl(curr.name));
    if (doPlay) await play();
  } catch {
    playing.value = false;
    loadingAudio.value = false;
  }
}

async function play() {
  const a = audioRef.value;
  if (!a) return;
  try {
    await a.play();
    playing.value = true;
    errorMessage.value = null;
  } catch (e: any) {
    console.warn("播放失败", e);
    playing.value = false;
    errorMessage.value = "播放被浏览器阻止或资源不可用";
  }
}

function pause() {
  audioRef.value?.pause();
  playing.value = false;
}

function togglePlay() {
  if (!audioRef.value) return;
  if (playing.value) pause();
  else play();
}

function selectTrack(idxInFiltered: number) {
  const item = filteredList.value[idxInFiltered];
  if (!item) return;
  const originalIndex = list.value.findIndex((it) => it.name === item.name);
  if (originalIndex === -1) return;
  index.value = originalIndex;
  loadCurrent(true);
}

// 音频事件
function onTimeUpdate(e: Event) {
  const t = e.target as HTMLAudioElement;
  currentTime.value = t.currentTime || 0;
}

function onLoadedMetadata(e: Event) {
  const t = e.target as HTMLAudioElement;
  duration.value = isFinite(t.duration) ? t.duration : 0;
  if (current.value && !current.value.duration)
    current.value.duration = duration.value;
  loadingAudio.value = false;
}

function onEnded() {
  loadingAudio.value = false;
  if (repeatMode.value === "one") {
    if (audioRef.value) {
      audioRef.value.currentTime = 0;
      play();
    }
    return;
  }
  if (shuffle.value) {
    playRandom();
    return;
  }
  if (index.value < list.value.length - 1) selectTrack(index.value + 1);
  else {
    if (repeatMode.value === "all") selectTrack(0);
    else playing.value = false;
  }
}

function onAudioError(e: Event) {
  console.error("audio error");
  errorMessage.value = "音频播放出错";
  playing.value = false;
  loadingAudio.value = false;
}

function next() {
  if (!list.value.length) return;
  if (shuffle.value) {
    playRandom();
    return;
  }
  if (index.value < list.value.length - 1) selectTrack(index.value + 1);
  else if (repeatMode.value === "all") selectTrack(0);
}

function prev() {
  if (!audioRef.value) return;
  if (audioRef.value.currentTime > 4) {
    audioRef.value.currentTime = 0;
    return;
  }
  if (index.value > 0) selectTrack(index.value - 1);
  else if (repeatMode.value === "all") selectTrack(list.value.length - 1);
}

function playRandom() {
  if (!list.value.length) return;
  if (list.value.length === 1) {
    selectTrack(0);
    return;
  }
  let i = index.value;
  while (i === index.value) i = Math.floor(Math.random() * list.value.length);
  selectTrack(i);
}

function seekByClick(e: MouseEvent | TouchEvent) {
  if (!progressWrap.value || !duration.value || !audioRef.value) return;
  const rect = progressWrap.value.getBoundingClientRect();
  const clientX =
    (e as MouseEvent).clientX ?? (e as TouchEvent).touches?.[0]?.clientX;
  if (clientX == null) return;
  const x = Math.min(Math.max(0, clientX - rect.left), rect.width);
  const ratio = x / rect.width;
  audioRef.value.currentTime = ratio * duration.value;
  currentTime.value = audioRef.value.currentTime;
}

function onPointerDownProgress(e: PointerEvent) {
  if (!progressWrap.value || !audioRef.value || !duration.value) return;
  dragging.value = true;
  (e.target as Element).setPointerCapture?.(e.pointerId);
  window.addEventListener("pointermove", onPointerMoveProgress);
  window.addEventListener("pointerup", onPointerUpProgress);
  handlePointer(e);
}

function onPointerMoveProgress(e: PointerEvent) {
  handlePointer(e);
}

function onPointerUpProgress() {
  dragging.value = false;
  window.removeEventListener("pointermove", onPointerMoveProgress);
  window.removeEventListener("pointerup", onPointerUpProgress);
}

function handlePointer(e: PointerEvent) {
  if (!progressWrap.value || !audioRef.value || !duration.value) return;
  const rect = progressWrap.value.getBoundingClientRect();
  const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
  const ratio = x / rect.width;
  audioRef.value.currentTime = ratio * duration.value;
  currentTime.value = audioRef.value.currentTime;
}

watch(volume, (v) => {
  if (audioRef.value) audioRef.value.volume = v;
  localStorage.setItem("qiuyuan_volume", String(v));
});

function toggleShuffle() {
  shuffle.value = !shuffle.value;
}

function toggleRepeat() {
  if (repeatMode.value === "off") repeatMode.value = "all";
  else if (repeatMode.value === "all") repeatMode.value = "one";
  else repeatMode.value = "off";
}

function onSpace() {
  if (
    document.activeElement &&
    ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
  )
    return;
  togglePlay();
}

function togglePlaylist() {
  playlistOpen.value = !playlistOpen.value;
  if (playlistOpen.value)
    nextTick(() => {
      const el = document.querySelector(".playlist li.active");
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
}

function onSearchInput() {
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    searchTimer = null;
  }, searchDebounceMs);
}

function clearSearch() {
  searchTerm.value = "";
}

function formatTime(sec?: number) {
  if (!sec || !isFinite(sec)) return "--:--";
  const s = Math.floor(sec % 60);
  const m = Math.floor(sec / 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

interface Chibi {
  src: string;
  top: number;
  left: number;
}
const chibiList = ref<Chibi[]>([]);

onMounted(async () => {
  if (audioRef.value) audioRef.value.volume = volume.value;

  const isM = isMobile.value;
  const folder = isM ? "/mp1" : "/mp2";
  const idx = Math.floor(Math.random() * 3) + 1;
  videoSrc.value = `${folder}/1 (${idx}).mp4`;
  videoClass.value = isM ? "landscape" : "portrait";

  await fetchList();

  window.addEventListener("keydown", globalKeydown);

  // 浮动小人
  const total = 8;
  let pickCount = isMobile.value ? 1 : 3;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const imgWidth = 100,
    imgHeight = 100;

  function shuffle<T>(arr: T[]) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const nums = shuffle(Array.from({ length: total }, (_, k) => k + 1));
  const picks = nums.slice(0, pickCount);
  chibiList.value = picks.map((i) => ({
    src: `/QImages/1 (${i}).png`,
    left: Math.random() * (vw - imgWidth),
    top: Math.random() * (vh - imgHeight),
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
    img.addEventListener("mouseenter", () => {
      gsap.killTweensOf(img);
      gsap.to(img, {
        x: `+=${((Math.random() - 0.5) * 400).toFixed(0)}`,
        y: `+=${((Math.random() - 0.5) * 400).toFixed(0)}`,
        duration: 1.2,
        ease: "back.out(2)",
        onComplete: () => animate(img),
      });
    });
    const animate = (el: HTMLImageElement) => {
      const rect = el.getBoundingClientRect();
      let dx = (Math.random() - 0.5) * 200,
        dy = (Math.random() - 0.5) * 200;
      if (rect.x + dx < padding) dx = padding - rect.x;
      if (rect.x + dx + el.width > window.innerWidth - padding)
        dx = window.innerWidth - padding - (rect.x + el.width);
      if (rect.y + dy < padding) dy = padding - rect.y;
      if (rect.y + dy + el.height > window.innerHeight - padding)
        dy = window.innerHeight - padding - (rect.y + el.height);
      gsap.to(el, {
        x: `+=${dx.toFixed(0)}`,
        y: `+=${dy.toFixed(0)}`,
        rotation: `+=${((Math.random() - 0.5) * 60).toFixed(0)}`,
        duration: 2 + Math.random() * 2,
        ease: "power1.inOut",
        onComplete: () => animate(el),
      });
    };
    animate(img);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", globalKeydown);
});

function globalKeydown(e: KeyboardEvent) {
  if (e.code === "Space") {
    if (
      document.activeElement &&
      ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
    )
      return;
    e.preventDefault();
    togglePlay();
  } else if (e.code === "Escape") {
    pause();
  }
}
</script>

<style scoped lang="scss">
/* ========== 仇远色彩变量 ========== */
.qiuyuan-player {
  --bamboo-green: #2e8f74;
  --blade-silver: #cfeee8;
  --moon-light: #b4e6e2;
  --deep-ink: #0b1a16;
  --night-base: #050a0c;
  --text-primary: #f0faf8;
  --text-secondary: rgba(207, 238, 232, 0.7);
  --card-bg: rgba(5, 10, 12, 0.6);
  --card-border: rgba(46, 143, 116, 0.25);
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.6);

  position: relative;
  padding: 20px;
  min-height: 100vh;
  background: var(--night-base);
  color: var(--text-primary);
  padding-top: 90px;
  font-family: "Noto Serif SC", "STKaiti", "KaiTi", serif;
  outline: none;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;

  // 竹林网格背景
  &::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background: repeating-linear-gradient(
        0deg,
        transparent 0 38px,
        rgba(46, 143, 116, 0.03) 38px 40px
      ),
      repeating-linear-gradient(
        90deg,
        transparent 0 2px,
        rgba(46, 143, 116, 0.025) 2px 4px
      ),
      radial-gradient(
        ellipse at 50% 30%,
        transparent 40%,
        rgba(5, 10, 12, 0.7) 100%
      );
  }

  // 顶部竹青装饰线
  &::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--bamboo-green),
      var(--blade-silver),
      transparent
    );
    z-index: 10;
    opacity: 0.5;
    box-shadow: 0 0 10px rgba(46, 143, 116, 0.5);
  }
}

.stage {
  position: relative;
  z-index: 5;
  display: flex;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: flex-start;
}

/* ========== 左侧播放器 ========== */
.left {
  width: 440px;
  background: var(--card-bg);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 18px;
  border: 1px solid var(--card-border);
  box-shadow: var(--shadow), inset 0 1px 0 rgba(46, 143, 116, 0.1);
  position: relative;
  min-height: 400px;
}

/* 封面区 */
.cover {
  width: 100%;
  height: 640px;
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 -6px 20px rgba(0, 0, 0, 0.5),
    0 8px 20px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(46, 143, 116, 0.2);
}

.video-background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.75;
  filter: saturate(0.6) contrast(1.1) brightness(0.8);
  transition: opacity 0.3s;
}

.video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(5, 10, 12, 0.4),
    rgba(46, 143, 116, 0.1)
  );
  mix-blend-mode: multiply;
  pointer-events: none;
}

.video-background.landscape {
  aspect-ratio: 16 / 9;
}

.video-background.portrait {
  aspect-ratio: 9 / 16;
  width: auto;
  height: 110%;
}

/* 加载遮罩 */
.loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(5, 10, 12, 0.7);
  backdrop-filter: blur(4px);
  z-index: 8;
}

.spinner,
.small-spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid rgba(46, 143, 116, 0.2);
  border-top-color: var(--blade-silver);
  animation: spin 1s linear infinite;
}

.small-spinner {
  width: 20px;
  height: 20px;
  border-width: 2px;
  border-top-color: var(--bamboo-green);
  margin-right: 10px;
}

.loading-text {
  margin-top: 12px;
  color: var(--blade-silver);
  font-weight: 600;
  letter-spacing: 1px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 控件区域 */
.controls {
  margin-top: 18px;
  padding: 0 4px;
}

.title {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--blade-silver);
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
}

.meta {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 12px;
  .divider {
    color: var(--bamboo-green);
    opacity: 0.5;
  }
}

/* 进度条 */
.progress-wrap {
  margin: 16px 0;
  animation: cursorAnimation_link 1s infinite step-start;
  touch-action: none;
  position: relative;
}

.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.progress {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--bamboo-green), var(--blade-silver));
  box-shadow: 0 0 10px var(--bamboo-green);
  transition: width 80ms linear;
}

.progress-handle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--blade-silver);
  border: 2px solid var(--bamboo-green);
  transform: translateX(-50%);
  position: relative;
  top: -5px;
  box-shadow: 0 2px 10px rgba(46, 143, 116, 0.5);
  cursor: grab;
  &:hover {
    transform: translateX(-50%) scale(1.2);
  }
  &:active {
    cursor: grabbing;
  }
}

/* 按钮行 */
.btns {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.icon,
.play {
  background: transparent;
  border: 1px solid var(--card-border);
  color: var(--blade-silver);
  font-size: 18px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 10px;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:hover {
    border-color: var(--bamboo-green);
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
}

.play {
  background: linear-gradient(135deg, var(--bamboo-green), var(--deep-ink));
  padding: 8px 18px;
  font-size: 20px;
  border-color: var(--bamboo-green);
  color: #fff;
  &:hover {
    background: linear-gradient(135deg, var(--bamboo-green), #041414);
    border-color: var(--blade-silver);
    box-shadow: 0 0 20px rgba(46, 143, 116, 0.4);
  }
}

.modes {
  display: flex;
  gap: 6px;
  margin-left: 4px;
  button {
    background: transparent;
    border: 1px solid var(--card-border);
    padding: 6px 10px;
    border-radius: 8px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      color: var(--blade-silver);
      border-color: var(--bamboo-green);
    }
    &.active {
      background: rgba(46, 143, 116, 0.2);
      border-color: var(--bamboo-green);
      color: var(--blade-silver);
    }
  }
}

.volume {
  margin-left: auto;
  input[type="range"] {
    width: 100px;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    animation: cursorAnimation_link 1s infinite step-start;
    -webkit-appearance: none;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--bamboo-green);
      border: 2px solid var(--blade-silver);
      animation: cursorAnimation_link 1s infinite step-start;
      box-shadow: 0 0 8px var(--bamboo-green);
    }
  }
}

.toggle-list-text {
  padding: 6px 12px;
  border-radius: 20px;
  background: transparent;
  border: 1px solid var(--card-border);
  color: var(--blade-silver);
  font-weight: 600;
  cursor: pointer;
  display: none;
  &:hover {
    background: rgba(46, 143, 116, 0.15);
  }
}

.error-msg {
  margin-top: 12px;
  padding: 8px 12px;
  background: rgba(201, 74, 58, 0.15);
  border-left: 4px solid #c94a3a;
  border-radius: 6px;
  color: #ffb36b;
  font-weight: 600;
  font-size: 0.9rem;
}

/* ========== 右侧播放列表 ========== */
.right {
  flex: 1;
  max-height: 65vh;
  overflow: hidden;
  border-radius: 20px;
  background: var(--card-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--card-border);
  padding: 18px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  transition: max-height 0.3s ease;
  &.collapsed {
    max-height: 70px;
  }
}

.playlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--card-border);
}

.left-head {
  display: flex;
  gap: 12px;
  align-items: center;
  h3 {
    margin: 0;
    font-family: "ZCOOL KuaiLe", serif;
    color: var(--blade-silver);
    font-weight: 700;
    letter-spacing: 3px;
  }
}

.api-hint {
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-style: italic;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  input {
    padding: 10px 14px;
    border-radius: 12px;
    border: 1px solid var(--card-border);
    background: rgba(0, 0, 0, 0.4);
    color: var(--text-primary);
    width: 220px;
    font-size: 0.9rem;
    outline: none;
    &::placeholder {
      color: var(--text-secondary);
      opacity: 0.6;
    }
    &:focus {
      border-color: var(--bamboo-green);
      box-shadow: 0 0 8px rgba(46, 143, 116, 0.3);
    }
  }
  .clear {
    background: transparent;
    border: 1px solid var(--card-border);
    color: var(--text-secondary);
    width: 30px;
    height: 30px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      border-color: var(--bamboo-green);
      color: var(--blade-silver);
    }
  }
}

.list-area {
  position: relative;
  flex: 1;
  overflow: hidden;
}

.list-loading {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--blade-silver);
  padding: 20px 0;
}

.playlist {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  max-height: calc(65vh - 100px);
  display: flex;
  flex-direction: column;
  gap: 6px;

  li {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;
    align-items: center;
    padding: 12px 14px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;
    background: rgba(6, 16, 18, 0.4);
    &:hover {
      transform: translateX(-6px);
      background: rgba(46, 143, 116, 0.08);
      border-color: var(--card-border);
    }
    &.active {
      background: linear-gradient(
        90deg,
        rgba(46, 143, 116, 0.2),
        rgba(46, 143, 116, 0.05)
      );
      border-left: 4px solid var(--bamboo-green);
      border-radius: 8px 12px 12px 8px;
      .dot {
        background: var(--bamboo-green);
        box-shadow: 0 0 10px var(--bamboo-green);
      }
    }
    .left-col {
      display: flex;
      gap: 14px;
      align-items: center;
      min-width: 0;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--blade-silver);
      box-shadow: 0 0 6px var(--bamboo-green);
      flex-shrink: 0;
      transition: all 0.2s;
    }
    .title {
      font-weight: 600;
      color: var(--text-primary);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 1.4;
    }
    .len {
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.85rem;
      min-width: 48px;
      text-align: right;
    }
  }
}

/* 浮动小人 */
.floating-chibis {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100;
  .chibi-img {
    position: absolute;
    width: 80px;
    pointer-events: auto;
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.5));
  }
}

/* ========== 响应式 ========== */
@media (max-width: 920px) {
  .toggle-list-text {
    display: block;
  }
  .stage {
    flex-direction: column;
  }
  .left {
    width: 100%;
    min-height: auto;
  }
  .cover {
    height: 200px;
  }
  .right {
    width: 100%;
    max-height: none;
  }
  .search-wrap input {
    width: 160px;
  }
}

@media (max-width: 520px) {
  .qiuyuan-player {
    padding: 12px;
    padding-top: 80px;
  }
  .btns {
    gap: 8px;
  }
  .volume input[type="range"] {
    width: 70px;
  }
  .playlist-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .search-wrap {
    width: 100%;
    input {
      flex: 1;
    }
  }
}
</style>
