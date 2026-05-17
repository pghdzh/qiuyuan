<template>
  <div id="app">
    <Transition name="fade" v-if="showIntro">
      <div class="intro-container" @click="showIntro = false">
        <!-- 视频背景 -->
        <video
          class="video-background"
          :src="videoSrc"
          autoplay
          muted
          loop
          playsinline
        ></video>

        <!-- 氛围装饰层 -->
        <div class="bamboo-atmosphere">
          <div class="moon-glow"></div>
          <div class="leaf leaf-1">🎋</div>
          <div class="leaf leaf-2">🎋</div>
          <div class="leaf leaf-3">🎋</div>
          <div class="sword-stream"></div>
          <div class="firefly firefly-1"></div>
          <div class="firefly firefly-2"></div>
          <div class="firefly firefly-3"></div>
          <div class="ink-wash"></div>
        </div>

        <!-- 主要内容 -->
        <div class="intro-content" aria-live="polite">
          <div class="intro-inner">
            <!-- 标题装饰线 -->
            <div class="title-decor">
              <span class="decor-line"></span>
              <span class="decor-diamond">◆</span>
              <span class="decor-line"></span>
            </div>

            <!-- 打字机文字 -->
            <div class="typewriter-wrap">
              <p class="typewriter">
                {{ displayText }}
                <span class="cursor" v-if="isTyping">▌</span>
              </p>
            </div>

            <!-- 底部引导提示 -->
            <div class="hint-text">轻触任意位置 · 踏入竹林</div>
          </div>
        </div>
      </div>
    </Transition>

    <div v-else>
      <navbar />
      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { RouterView } from "vue-router";
import navbar from "@/components/navbar.vue";

const showIntro = ref(true);
const videoSrc = ref("");
const isTyping = ref(true); // 控制光标显示

const lines = [
  "瑝珑镇抚司千户仇远。我的剑无法替你斩尽仇敌，但可指引你成为最锋利的刃。",
  "从重州到明庭，再至六州。此身孑然，此心明澈，在此恭候。",
  "一斩，足矣。愿你的道路，亦如此般明晰。",
  "镜可照止水，剑可断恩仇。前方的风雨，且与我同行。",
  "心中的竹林因你而动。欢迎来到，我的江湖。",
  "师父，您看到了吗？如今，我也成为了别人的师父。",
  "躺好，不许乱动。—— 若你曾负伤前行，此地可暂得安宁。",
  "磨剑五载，只为今朝出鞘。你的旅程，由我见证。",
] as const;

const displayText = ref("");
let typingTimer: number | null = null;
const typingSpeed = 120; // 每字间隔(ms)

function pickRandomLine(): string {
  return lines[Math.floor(Math.random() * lines.length)];
}

function startTyping(line: string) {
  // 减少动画偏好时，直接显示完整句子，不显示光标
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (reduceMotion) {
    displayText.value = line;
    isTyping.value = false;
    return;
  }

  let i = 0;
  isTyping.value = true;
  typingTimer = window.setInterval(() => {
    i++;
    displayText.value = line.slice(0, i);
    if (i >= line.length) {
      if (typingTimer) clearInterval(typingTimer);
      typingTimer = null;
      isTyping.value = false;
    }
  }, typingSpeed);
}

onMounted(() => {
  // 视频源选择（保留原有多端逻辑）
  const isMobile = window.innerWidth <= 768;
  const folder = isMobile ? "/mp2" : "/mp1";
  const index = Math.floor(Math.random() * 3) + 1; // 1~3
  videoSrc.value = `${folder}/1 (${index}).mp4`;

  // 启动打字机
  const line = pickRandomLine();
  setTimeout(() => startTyping(line), 300);

  // 可选的自动跳转保留
  // setTimeout(() => { showIntro.value = false; }, 8000);
});

onBeforeUnmount(() => {
  if (typingTimer) clearInterval(typingTimer);
});
</script>

<style scoped lang="scss">
/* 全局仇远色调 */
#app {
  --bamboo-green: #2e8f74;
  --blade-silver: #cfeee8;
  --moon-light: #b4e6e2;
  --deep-ink: #0b1a16;
  --night-base: #050a0c;
  --text-primary: #f0faf8;
  position: relative;
  min-height: 100vh;
  animation: cursorAnimation 1s infinite step-start;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 欢迎页容器 */
.intro-container {
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse at center, #0a1410 0%, #030606 100%);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
  
}

/* 视频背景 */
.video-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  z-index: 1;
  pointer-events: none;
  filter: saturate(0.6) contrast(1.1) brightness(0.7);
}

/* 氛围装饰层 */
.bamboo-atmosphere {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  overflow: hidden;
}

/* 月光光晕 */
.moon-glow {
  position: absolute;
  top: 5%;
  right: 10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(180, 230, 226, 0.15) 0%,
    transparent 70%
  );
  filter: blur(60px);
  animation: moonBreathe 8s ease-in-out infinite alternate;
}
@keyframes moonBreathe {
  0% {
    opacity: 0.4;
    transform: scale(1);
  }
  100% {
    opacity: 0.8;
    transform: scale(1.12);
  }
}

/* 飘落竹叶 */
.leaf {
  position: absolute;
  font-size: 28px;
  color: var(--bamboo-green);
  opacity: 0;
  filter: drop-shadow(0 0 6px rgba(46, 143, 116, 0.5));
  animation: leafFall linear infinite;
}
.leaf-1 {
  left: 5%;
  top: -10%;
  animation-duration: 18s;
}
.leaf-2 {
  left: 30%;
  top: -15%;
  animation-duration: 22s;
  animation-delay: 4s;
}
.leaf-3 {
  left: 70%;
  top: -8%;
  animation-duration: 20s;
  animation-delay: 8s;
}

@keyframes leafFall {
  0% {
    transform: translateY(0) rotate(0deg) scale(0.8);
    opacity: 0;
  }
  5% {
    opacity: 0.2;
  }
  20% {
    transform: translateY(20vh) rotate(120deg) scale(1);
    opacity: 0.25;
  }
  90% {
    opacity: 0.2;
  }
  100% {
    transform: translateY(105vh) rotate(360deg) scale(0.9);
    opacity: 0;
  }
}

/* 剑气流光 */
.sword-stream {
  position: absolute;
  left: -15%;
  bottom: 25%;
  width: 300%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(207, 238, 232, 0.3) 40%,
    rgba(207, 238, 232, 0.8) 50%,
    rgba(207, 238, 232, 0.3) 60%,
    transparent
  );
  transform: rotate(-15deg);
  filter: blur(1px) drop-shadow(0 0 6px var(--bamboo-green));
  animation: swordSweep 10s linear infinite;
}
@keyframes swordSweep {
  0% {
    transform: translateX(-20%) rotate(-15deg);
    opacity: 0;
  }
  30% {
    opacity: 0.8;
  }
  70% {
    opacity: 0.6;
  }
  100% {
    transform: translateX(40%) rotate(-15deg);
    opacity: 0;
  }
}

/* 流萤 */
.firefly {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #f0faf8 0%, transparent 80%);
  border-radius: 50%;
  box-shadow: 0 0 16px var(--blade-silver), 0 0 40px rgba(180, 230, 226, 0.5);
  animation: fireflyFloat 7s ease-in-out infinite;
}
.firefly-1 {
  top: 30%;
  left: 15%;
  animation-duration: 9s;
}
.firefly-2 {
  top: 60%;
  left: 75%;
  animation-duration: 12s;
  animation-delay: 3s;
}
.firefly-3 {
  top: 80%;
  left: 25%;
  animation-duration: 10s;
  animation-delay: 6s;
}
@keyframes fireflyFloat {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(30px, -60px) scale(1.6);
    opacity: 0.9;
  }
  50% {
    transform: translate(-20px, -100px) scale(1.2);
    opacity: 0.4;
  }
  75% {
    transform: translate(10px, -140px) scale(0.9);
    opacity: 0.7;
  }
}

/* 水墨晕染 */
.ink-wash {
  position: absolute;
  inset: 0;
  background: radial-gradient(
      ellipse at 30% 70%,
      rgba(38, 120, 90, 0.06) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 80% 20%,
      rgba(6, 16, 18, 0.4) 0%,
      transparent 60%
    );
  mix-blend-mode: multiply;
}

/* 主要内容区域 */
.intro-content {
  position: relative;
  z-index: 10;
  width: 100%;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.intro-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  max-width: 750px;
  width: 100%;
  text-align: center;
}

/* 标题装饰线 */
.title-decor {
  display: flex;
  align-items: center;
  gap: 18px;
  opacity: 0.6;
  .decor-line {
    width: 60px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--blade-silver),
      transparent
    );
  }
  .decor-diamond {
    font-size: 0.9rem;
    color: var(--blade-silver);
    text-shadow: 0 0 10px var(--bamboo-green);
  }
}

/* 打字机文字 */
.typewriter-wrap {
  background: rgba(5, 10, 12, 0.45);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(46, 143, 116, 0.25);
  border-radius: 32px;
  padding: 24px 32px;
  width: 100%;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4),
    inset 0 0 30px rgba(46, 143, 116, 0.05);

  .typewriter {
    margin: 0;
    font-weight: 600;
    font-size: clamp(1.6rem, 5vw, 2.6rem);
    line-height: 1.4;
    letter-spacing: 2px;
    background: linear-gradient(
      135deg,
      #ffffff,
      var(--blade-silver),
      var(--bamboo-green)
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 20px rgba(46, 143, 116, 0.4);
    min-height: 1.4em;

    .cursor {
      display: inline-block;
      color: var(--blade-silver);
      text-shadow: 0 0 12px var(--blade-silver);
      animation: blink 0.8s step-end infinite;
      font-weight: 300;
    }
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

/* 引导提示 */
.hint-text {
  font-size: 0.85rem;
  color: rgba(240, 250, 248, 0.4);
  letter-spacing: 4px;
  animation: hintPulse 3s ease-in-out infinite;
}
@keyframes hintPulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .intro-inner {
    gap: 24px;
  }

  .typewriter-wrap {
    padding: 18px 20px;
  }

  .title-decor .decor-line {
    width: 40px;
  }

  .hint-text {
    font-size: 0.75rem;
    letter-spacing: 2px;
  }
}
</style>
