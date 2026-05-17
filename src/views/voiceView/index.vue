<template>
  <section class="voice-gallery">
    <!-- 背景轮播（保留） -->
    <div class="bg-carousel" aria-hidden="true">
      <transition-group name="bg-fade" tag="div" class="bg-layer">
        <img
          v-for="(src, idx) in activeImages"
          :key="`bg-${idx}-${isMobile ? 'm' : 'd'}`"
          :src="src"
          :class="['bg-img', { active: idx === currentIndex }]"
          alt=""
        />
      </transition-group>
    </div>

    <div class="vg__wrap">
      <header class="vg__header">
        <div class="logo">
          <div class="title-group">
            <h1 class="title">仇远 · 语音馆</h1>
            <p class="subtitle">藏锋于竹 · 细听剑鸣</p>
          </div>
        </div>
      </header>

      <!-- 语音列表（全部可播放） -->
      <ul class="vg__list" role="list">
        <li
          v-for="id in allVoiceIds"
          :key="id"
          class="vg__item"
          :class="{ playing: id === currentId }"
        >
          <div class="item__left">
            <div class="index">{{ String(id).padStart(3, "0") }}</div>
            <div class="info">
              <div class="name">语音 {{ String(id).padStart(3, "0") }}</div>
              <div class="note">点击聆听</div>
            </div>
          </div>

          <div class="item__right">
            <button
              class="btn btn--icon"
              @click="playEntry(id)"
              :title="currentId === id && isPlaying ? '暂停' : '播放'"
            >
              <span v-if="currentId === id && isPlaying">❚❚</span>
              <span v-else>▶</span>
            </button>

            <a :href="voicePath(id)" :download="`audio_${id}.mp3`" title="下载">
              <el-button type="primary" :icon="Download" circle />
            </a>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { Download } from "@element-plus/icons-vue";

/* ================== 配置 ================== */
const TOTAL_VOICES = 21; // 语音总数
const BG_INTERVAL_MS = 4500; // 背景切换间隔（毫秒）
const MOBILE_BREAKPOINT = 720; // 移动端断点

/* ========== 导入图片资源 ========== */
// 横图（PC）
const modules: Record<string, any> = import.meta.glob(
  "@/assets/images1/*.{jpg,png,jpeg,webp}",
  { eager: true }
);
const allSrcs: string[] = Object.values(modules).map(
  (m: any) => m.default || m
);

// 竖图（移动端）
const modules2: Record<string, any> = import.meta.glob(
  "@/assets/images2/*.{jpg,png,jpeg,webp}",
  { eager: true }
);
const allSrcs2: string[] = Object.values(modules2).map(
  (m: any) => m.default || m
);

/* 洗牌函数 */
function shuffle<T>(arr: T[]) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const randomFive = ref<string[]>(
  shuffle(allSrcs).slice(0, Math.min(5, allSrcs.length))
);
const randomFive2 = ref<string[]>(
  shuffle(allSrcs2).slice(0, Math.min(5, allSrcs2.length))
);

const currentIndex = ref(0);
let imgTimer: number | null = null;

/* ========== 设备判断 ========== */
const isMobile = ref(window.innerWidth < MOBILE_BREAKPOINT);
function handleResize() {
  const nowMobile = window.innerWidth < MOBILE_BREAKPOINT;
  if (nowMobile !== isMobile.value) {
    isMobile.value = nowMobile;
    currentIndex.value = 0; // 切换图片组时重置索引
  }
}

const activeImages = computed(() =>
  isMobile.value ? randomFive2.value : randomFive.value
);

/* ========== 语音列表（全解锁） ========== */
const allIds = Array.from({ length: TOTAL_VOICES }, (_, i) => i);
const allVoiceIds = computed(() => allIds);

/* ========== 音频控制 ========== */
let currentAudio: HTMLAudioElement | null = null;
const currentId = ref<number | null>(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const currentDuration = ref(0);

function createAudio(src?: string) {
  destroyAudio();
  currentAudio = new Audio();
  currentAudio.preload = "auto";
  if (src) currentAudio.src = src;
  currentAudio.addEventListener("timeupdate", onTimeUpdate);
  currentAudio.addEventListener("loadedmetadata", onLoadedMeta);
  currentAudio.addEventListener("ended", onEnded);
  currentAudio.addEventListener("error", onAudioError);
}

function destroyAudio() {
  if (!currentAudio) return;
  try {
    currentAudio.pause();
    currentAudio.removeEventListener("timeupdate", onTimeUpdate);
    currentAudio.removeEventListener("loadedmetadata", onLoadedMeta);
    currentAudio.removeEventListener("ended", onEnded);
    currentAudio.removeEventListener("error", onAudioError);
    currentAudio.src = "";
  } catch (e) {}
  currentAudio = null;
}

function onTimeUpdate() {
  if (currentAudio) currentTime.value = currentAudio.currentTime || 0;
}

function onLoadedMeta() {
  if (currentAudio) currentDuration.value = currentAudio.duration || 0;
}

function onEnded() {
  isPlaying.value = false;
}

function onAudioError(e?: any) {
  console.error("audio error", e);
  isPlaying.value = false;
}

function voicePath(id: number) {
  return `/voice/audio (${id}).mp3`;
}

async function playEntry(id: number) {
  // 同一条 -> 切换暂停/恢复
  if (currentId.value === id && isPlaying.value) {
    currentAudio?.pause();
    isPlaying.value = false;
    return;
  }
  if (currentId.value === id && !isPlaying.value && currentAudio) {
    try {
      await currentAudio.play();
      isPlaying.value = true;
    } catch (e) {
      console.warn(e);
    }
    return;
  }

  // 新条目
  currentId.value = id;
  createAudio(voicePath(id));
  try {
    await currentAudio!.play();
    isPlaying.value = true;
  } catch (e) {
    console.warn("播放被阻止或失败", e);
    isPlaying.value = false;
  }
}

/* ========== 背景轮播控制 ========== */
function startBgTimer() {
  stopBgTimer();
  imgTimer = window.setInterval(() => {
    const len = Math.max(1, activeImages.value.length);
    currentIndex.value = (currentIndex.value + 1) % len;
  }, BG_INTERVAL_MS);
}

function stopBgTimer() {
  if (imgTimer !== null) {
    clearInterval(imgTimer);
    imgTimer = null;
  }
}

/* ========== 生命周期 ========== */
onMounted(() => {
  window.addEventListener("resize", handleResize);

  // 确保图片数组非空
  if (!randomFive.value.length && allSrcs.length)
    randomFive.value = shuffle(allSrcs).slice(0, Math.min(5, allSrcs.length));
  if (!randomFive2.value.length && allSrcs2.length)
    randomFive2.value = shuffle(allSrcs2).slice(
      0,
      Math.min(5, allSrcs2.length)
    );

  startBgTimer();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  stopBgTimer();
  destroyAudio();
});

watch(activeImages, () => {
  currentIndex.value = 0;
});
</script>

<style lang="scss" scoped>
/* 颜色变量 */
$accent-1: #2e8f74; // 竹青
$accent-2: #cfeee8; // 霜刃银
$accent-2-light: #a8d5cc; // 提亮
$gold: #c9b37a; // 点缀金
$text-light: #f0faf8; // 近白
$text-dark: #041018; // 深色文字
$bg-deep: #030a0c;
$bg-mid: #061216;
$bg-ink: #040e10;

/* 半透明辅助 */
$accent-1-05: rgba($accent-1, 0.05);
$accent-2-03: rgba($accent-2, 0.03);
$accent-2-04: rgba($accent-2, 0.04);
$accent-2-06: rgba($accent-2, 0.06);
$accent-2-12: rgba($accent-2, 0.12);
$accent-1-12: rgba($accent-1, 0.12);
$gold-008: rgba($gold, 0.008);
$text-light-02: rgba($text-light, 0.02);
$text-light-06: rgba($text-light, 0.06);

.voice-gallery {
  position: relative;
  min-height: 560px;
  font-family: "Noto Serif SC", "STKaiti", "KaiTi", serif;
  color: $text-light;
  overflow: hidden;
  padding: 28px;
  padding-top: 80px;
  background: linear-gradient(180deg, $bg-ink 0%, $bg-mid 40%, $bg-deep 100%);
  -webkit-font-smoothing: antialiased;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background: radial-gradient(
        600px 200px at 12% 10%,
        $accent-1-05,
        transparent 12%
      ),
      radial-gradient(420px 140px at 78% 18%, $accent-2-03, transparent 12%);
    filter: blur(6px);
    mix-blend-mode: screen;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image: radial-gradient(
        circle at 8% 12%,
        $text-light-02 0.6px,
        transparent 1px
      ),
      radial-gradient(circle at 84% 26%, $gold-008 0.6px, transparent 1px);
    background-size: 180px 180px, 220px 220px;
    mix-blend-mode: screen;
    opacity: 0.98;
  }

  .bg-carousel {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;

    .bg-layer {
      position: absolute;
      inset: 0;
      overflow: hidden;

      .bg-img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        opacity: 0;
        transform: scale(1.02);
        transition: opacity 900ms ease, transform 900ms ease, filter 900ms ease;
        pointer-events: none;
        filter: brightness(0.68) contrast(0.96) saturate(0.9) hue-rotate(-6deg);
        mix-blend-mode: screen;
      }

      .bg-img.active {
        opacity: 1;
        transform: scale(1);
        filter: brightness(0.92) contrast(1.02) saturate(1.04);
      }
    }
  }

  .vg__wrap {
    position: relative;
    z-index: 2;
    max-width: 980px;
    margin: 0 auto;
    border-radius: 14px;
    padding: 18px;
    box-shadow: 0 12px 48px rgba(2, 8, 18, 0.72), inset 0 1px 0 $text-light-02;
    background: linear-gradient(
      180deg,
      rgba($bg-mid, 0.28),
      rgba($bg-ink, 0.22)
    );
    border: 1px solid $accent-2-03;
    backdrop-filter: blur(3px) saturate(1.02);
  }

  .vg__header {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 24px;

    .title-group {
      display: flex;
      flex-direction: column;

      .title {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 800;
        background: linear-gradient(
          90deg,
          $accent-2 0%,
          $accent-1 50%,
          $accent-2 100%
        );
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 6px 20px rgba(2, 8, 18, 0.6);
        letter-spacing: 0.4px;
      }

      .subtitle {
        margin: 4px 0 0;
        color: rgba($text-light, 0.82);
        font-size: 1rem;
      }
    }
  }

  .vg__list {
    display: grid;
    gap: 12px;
    margin: 0;
    padding: 0;
    list-style: none;
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    padding-right: 8px;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, $accent-2-12, $accent-2-04);
      border-radius: 8px;
      border: 2px solid transparent;
      background-clip: padding-box;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }

  .vg__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 14px;
    background: linear-gradient(
      90deg,
      rgba($bg-mid, 0.42),
      rgba($bg-ink, 0.48)
    );
    border: 1px solid $accent-2-03;
    backdrop-filter: blur(4px);
    transition: transform 0.15s ease, box-shadow 0.15s ease,
      border-color 0.15s ease;

    &.playing {
      transform: translateY(-4px);
      box-shadow: 0 0 52px $accent-2-12, inset 0 2px 12px $accent-2-03;
      border-color: $accent-2-12;

      &::after {
        content: "";
        position: absolute;
        right: 12px;
        top: 50%;
        width: 40px;
        height: 40px;
        transform: translateY(-50%);
        border-radius: 50%;
        background: radial-gradient(
          circle,
          rgba($accent-2, 0.06),
          transparent 40%
        );
        filter: blur(6px);
        pointer-events: none;
      }
    }

    .item__left {
      display: flex;
      gap: 12px;
      align-items: center;

      .index {
        min-width: 60px;
        height: 60px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        background: linear-gradient(180deg, $accent-2-light 0%, $accent-2 60%);
        color: $text-dark;
        font-weight: 800;
        box-shadow: 0 6px 20px rgba(6, 8, 14, 0.36);
        text-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
        border: 1px solid rgba($text-light, 0.04);
      }

      .info {
        .name {
          color: $text-light;
          font-weight: 700;
          letter-spacing: 0.3px;
        }

        .note {
          color: rgba($text-light, 0.75);
          font-size: 0.9rem;
          margin-top: 4px;
        }
      }
    }

    .item__right {
      display: flex;
      gap: 10px;
      align-items: center;

      .btn--icon {
        width: 52px;
        height: 52px;
        border-radius: 12px;
        border: none;
        display: inline-grid;
        place-items: center;
        background: linear-gradient(180deg, $accent-2 0%, $accent-1 100%);
        color: $text-dark;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 6px 26px rgba($accent-2, 0.12);
        transition: all 0.15s ease;
        border: 1px solid rgba($text-light, 0.02);

        &:hover {
          background: linear-gradient(180deg, $accent-2-light, $accent-1);
          box-shadow: 0 10px 44px $accent-2-12;
          transform: translateY(-3px);
        }
      }

      a .el-button {
        background: linear-gradient(180deg, $accent-2, $accent-1);
        border: none;
        color: $text-dark;
        transition: all 0.15s ease;
        border: 1px solid rgba($text-light, 0.02);

        &:hover {
          background: linear-gradient(180deg, $accent-2-light, $accent-1);
        }
      }
    }
  }

  .bg-fade-enter-active,
  .bg-fade-leave-active {
    transition: opacity 900ms ease, transform 900ms ease;
  }
  .bg-fade-enter-from,
  .bg-fade-leave-to {
    opacity: 0;
    transform: scale(1.05);
  }
  .bg-fade-enter-to,
  .bg-fade-leave-from {
    opacity: 1;
    transform: scale(1);
  }

  @media (max-width: 720px) {
    padding: 12px;
    padding-top: 80px;

    .vg__wrap {
      padding: 14px;
    }
    .vg__item {
      padding: 10px;
    }
    .index {
      min-width: 48px;
      height: 48px;
      font-size: 0.95rem;
    }
  }
}
</style>
