<template>
  <div class="qiuyuan-app">
    <!-- 右下角剑鞘按钮 -->
    <button
      class="blade-trigger"
      :class="{ active: isOpen }"
      @click="isOpen = !isOpen"
      :aria-label="isOpen ? '关闭导航' : '打开导航'"
    >
      <span class="trigger-icon">导航</span>
      <span class="trigger-ring"></span>
    </button>

    <!-- 全屏竹林碑林导航 -->
    <Transition name="bamboo-fade">
      <div v-if="isOpen" class="overlay" @click.self="isOpen = false">
        <!-- 动态竹林背景 -->
        <div class="bamboo-bg">
          <!-- 原有元素保持不变 -->
          <div class="moon-main"></div>
          <div class="moon-sub"></div>
          <div class="bamboo-forest left-forest"></div>
          <div class="bamboo-forest right-forest"></div>
          <div class="leaf leaf-1">🎋</div>
          <div class="leaf leaf-2">🎋</div>
          <div class="leaf leaf-3">🎋</div>
          <div class="leaf leaf-4">🎋</div>
          <div class="leaf leaf-5">🎋</div>
          <div class="firefly firefly-1"></div>
          <div class="firefly firefly-2"></div>
          <div class="firefly firefly-3"></div>
          <div class="firefly firefly-4"></div>
          <div class="firefly firefly-5"></div>
          <div class="firefly firefly-6"></div>
          <div class="sword-light sword-light-1"></div>
          <div class="sword-light sword-light-2"></div>
          <div class="mist"></div>

          <!-- 新增装饰 -->
          <div class="hat-silhouette"></div>
          <div class="sword-light sword-light-3"></div>
          <div class="ink-drop ink-drop-1"></div>
          <div class="ink-drop ink-drop-2"></div>
          <div class="rain"></div>
        </div>

        <!-- 石碑容器 -->
        <div class="stele-container">
          <!-- 碑帽 -->
          <div class="stele-cap">
            <span class="cap-text">青冥剑影</span>
            <span class="cap-sub">藏锋于竹</span>
          </div>

          <!-- 碑身导航 -->
          <div class="stele-body">
            <template v-for="(item, index) in navItems" :key="item.name">
              <RouterLink
                v-if="!item.external"
                :to="item.path"
                class="stele-item"
                :class="{ 'active-item': false }"
                active-class="active-item"
                @click="closeNav"
              >
                <span class="item-text">{{ item.name }}</span>
                <span class="item-sword"></span>
              </RouterLink>
              <a
                v-else
                :href="item.path"
                target="_blank"
                rel="noopener"
                class="stele-item external"
                @click="closeNav"
              >
                <span class="item-text">{{ item.name }}</span>
                <span class="item-sword"></span>
              </a>
            </template>
          </div>

          <!-- 碑座 -->
          <div class="stele-base">
            <div v-if="onlineCount !== null" class="base-info">
              <span class="base-dot"></span> 江湖行者 {{ onlineCount }} 人
            </div>
          </div>
        </div>

        <!-- 移动端关闭按钮 -->
        <button class="close-btn" @click="isOpen = false" aria-label="关闭导航">
          ✕
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { io } from "socket.io-client";

const isOpen = ref(false);
function closeNav() {
  isOpen.value = false;
}

const navItems = [
  { name: "孤馆灯青", path: "/" },
  { name: "磨剑", path: "/timeLine" },
  { name: "剑鸣回响", path: "/message" },
  { name: "青冥印记", path: "/gallery" },
  { name: "铸剑工坊", path: "/resources" },
  { name: "江湖低语", path: "/talk" },
  { name: "竹下密语", path: "/voice" },
  { name: "弹铗而歌", path: "/music" },
  { name: "琅嬛秘典", path: "/wiki" },
  { name: "倦客致谢", path: "/thanks" },
  { name: "霜落映界", path: "https://slty.site/#/redirector", external: true },
];

// 在线人数
const onlineCount = ref<number | null>(null);
const siteId = "qiuyuan";
let socket: any = null;
onMounted(() => {
  socket = io(import.meta.env.VITE_API_BASE_URL, { query: { siteId } });
  socket.on("onlineCount", (count: number) => {
    onlineCount.value = count;
  });
});
onBeforeUnmount(() => {
  if (socket) socket.disconnect();
});
</script>

<style scoped lang="scss">
/* ========== 仇远色彩变量 ========== */
.qiuyuan-app {
  --bamboo-green: #2e8f74;
  --blade-silver: #cfeee8;
  --moon-light: #b4e6e2;
  --deep-ink: #26785a;
  --night-base: #061012;
  --clean-white: #f0faf8;
}

/* ---------- 右下角剑鞘按钮 ---------- */
.blade-trigger {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 1001;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(38, 120, 90, 0.5),
    var(--night-base)
  );
  border: 1.5px solid rgba(207, 238, 232, 0.45);
  box-shadow: 0 0 24px rgba(46, 143, 116, 0.35),
    inset 0 0 12px rgba(180, 230, 226, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  overflow: visible;

  .trigger-icon {
    font-size: 1.2rem;
    color: var(--blade-silver);
    filter: drop-shadow(0 0 6px var(--bamboo-green));
    
  }
  .trigger-ring {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 1px solid rgba(207, 238, 232, 0.25);
    animation: ringPulse 3s infinite;
    pointer-events: none;
  }
  &:hover {
    transform: scale(1.08);
    border-color: var(--bamboo-green);
    box-shadow: 0 0 36px rgba(46, 143, 116, 0.7);
  }
  &.active {
    background: var(--bamboo-green);
    border-color: var(--blade-silver);
   
  }
}

@keyframes ringPulse {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.15);
  }
}

/* ---------- 全屏遮罩 ---------- */
.overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    ellipse at center,
    rgba(6, 16, 18, 0.96),
    rgba(3, 10, 12, 0.99)
  );
  backdrop-filter: blur(14px);
  font-family: "Noto Serif SC", "STKaiti", serif;
}

/* 过渡动画 */
.bamboo-fade-enter-active,
.bamboo-fade-leave-active {
  transition: opacity 0.5s ease;
}
.bamboo-fade-enter-from,
.bamboo-fade-leave-to {
  opacity: 0;
}

/* ========== 动态竹林背景 ========== */
.bamboo-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;

  // 新增：水墨纹理叠加层
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
        circle at 30% 45%,
        rgba(46, 143, 116, 0.03) 2px,
        transparent 3px
      ),
      radial-gradient(
        circle at 70% 25%,
        rgba(180, 230, 226, 0.02) 1px,
        transparent 2px
      ),
      radial-gradient(
        circle at 50% 60%,
        rgba(207, 238, 232, 0.03) 4px,
        transparent 5px
      );
    background-size: 100px 100px, 150px 150px, 200px 200px;
    opacity: 0.7;
    mix-blend-mode: overlay;
    pointer-events: none;
  }

  /* 主月光：增强呼吸感，加入月晕 */
  .moon-main {
    position: absolute;
    top: 5%;
    right: 10%;
    width: 350px;
    height: 350px;
    background: radial-gradient(
        circle at 40% 40%,
        rgba(180, 230, 226, 0.28) 0%,
        transparent 55%
      ),
      radial-gradient(
        circle at 60% 60%,
        rgba(46, 143, 116, 0.12) 0%,
        transparent 70%
      );
    filter: blur(50px);
    animation: moonBreathe 7s ease-in-out infinite alternate;
  }
  .moon-sub {
    position: absolute;
    bottom: 8%;
    left: 5%;
    width: 260px;
    height: 260px;
    background: radial-gradient(
      circle,
      rgba(38, 120, 90, 0.2) 0%,
      transparent 70%
    );
    filter: blur(45px);
    animation: moonBreathe 9s ease-in-out infinite alternate-reverse;
  }

  @keyframes moonBreathe {
    from {
      opacity: 0.5;
      transform: scale(1) rotate(0deg);
    }
    to {
      opacity: 0.9;
      transform: scale(1.15) rotate(2deg);
    }
  }

  /* 竹林剪影：加深并添加竹节纹理 */
  .bamboo-forest {
    position: absolute;
    bottom: 0;
    width: 140px;
    height: 82%;
    background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 18px,
        rgba(38, 120, 90, 0.1) 18px,
        rgba(38, 120, 90, 0.1) 22px
      ),
      linear-gradient(to top, rgba(38, 120, 90, 0.2), transparent 70%);
    border-radius: 80px 80px 0 0;
    filter: blur(5px);
    mask-image: linear-gradient(to top, black 30%, transparent 95%);
  }
  .left-forest {
    left: -10px;
    transform: rotate(4deg);
  }
  .right-forest {
    right: -10px;
    transform: rotate(-4deg);
  }

  /* 新增：斗笠剪影（仇远标志） */
  .hat-silhouette {
    position: absolute;
    top: 12%;
    right: 8%;
    width: 100px;
    height: 100px;
    background: radial-gradient(
      ellipse at 50% 45%,
      transparent 35%,
      rgba(207, 238, 232, 0.05) 36%,
      rgba(207, 238, 232, 0.1) 70%,
      transparent 71%
    );
    border-radius: 50%;
    filter: blur(6px);
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
      opacity: 0.5;
    }
  }

  /* 飘落竹叶：增加旋转变化，添加影子 */
  .leaf {
    position: absolute;
    font-size: 22px;
    color: var(--bamboo-green, #2e8f74);
    opacity: 0;
    filter: drop-shadow(0 0 5px rgba(46, 143, 116, 0.6))
      drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5));
    animation: leafFall linear infinite;
  }
  .leaf-1 {
    left: 6%;
    top: -6%;
    animation-duration: 16s;
    animation-delay: 0s;
  }
  .leaf-2 {
    left: 22%;
    top: -12%;
    animation-duration: 22s;
    animation-delay: 3s;
  }
  .leaf-3 {
    left: 48%;
    top: -9%;
    animation-duration: 18s;
    animation-delay: 6s;
  }
  .leaf-4 {
    left: 68%;
    top: -7%;
    animation-duration: 24s;
    animation-delay: 9s;
  }
  .leaf-5 {
    left: 84%;
    top: -14%;
    animation-duration: 20s;
    animation-delay: 12s;
  }

  @keyframes leafFall {
    0% {
      transform: translateY(-5vh) rotate(0deg) scale(0.8);
      opacity: 0;
    }
    5% {
      opacity: 0.2;
    }
    15% {
      transform: translateY(15vh) rotate(120deg) scale(1);
      opacity: 0.25;
    }
    50% {
      opacity: 0.18;
    }
    85% {
      opacity: 0.15;
    }
    95% {
      transform: translateY(95vh) rotate(340deg) scale(0.9);
      opacity: 0.05;
    }
    100% {
      transform: translateY(105vh) rotate(360deg) scale(0.7);
      opacity: 0;
    }
  }

  /* 流萤：增加拖尾光晕，更梦幻 */
  .firefly {
    position: absolute;
    width: 5px;
    height: 5px;
    background: radial-gradient(circle, #f0faf8 0%, transparent 85%);
    border-radius: 50%;
    box-shadow: 0 0 16px #cfeee8, 0 0 35px rgba(180, 230, 226, 0.6),
      0 0 60px rgba(46, 143, 116, 0.3);
    animation: fireflyFloat ease-in-out infinite;
    &::after {
      content: "";
      position: absolute;
      top: -2px;
      left: -2px;
      width: 8px;
      height: 8px;
      background: radial-gradient(
        circle,
        rgba(207, 238, 232, 0.5),
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
    top: 82%;
    left: 58%;
    animation-duration: 14s;
    animation-delay: 7s;
  }

  @keyframes fireflyFloat {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.2;
    }
    25% {
      transform: translate(35px, -70px) scale(1.6);
      opacity: 0.9;
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

  /* 剑气流光：增加多条交叉，调整颜色为青芒 */
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
    filter: blur(1.2px) drop-shadow(0 0 8px rgba(46, 143, 116, 0.5));
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
  // 新增第三条更快的细剑光
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
      opacity: 0.8;
    }
    100% {
      transform: translateX(45%) rotate(-12deg);
      opacity: 0;
    }
  }

  /* 新增：墨滴涟漪 */
  .ink-drop {
    position: absolute;
    width: 2px;
    height: 2px;
    background: rgba(46, 143, 116, 0.8);
    border-radius: 50%;
    box-shadow: 0 0 12px #2e8f74, 0 0 30px rgba(46, 143, 116, 0.4);
    animation: inkDrop 8s linear infinite;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 40px;
      height: 40px;
      margin: -20px;
      border: 1px solid rgba(46, 143, 116, 0.3);
      border-radius: 50%;
      animation: ripple 2.5s ease-out infinite;
    }
  }
  .ink-drop-1 {
    top: 25%;
    left: 15%;
    animation-delay: 0s;
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

  /* 新增：细密雨丝（青墨色） */
  .rain {
    position: absolute;
    top: -10%;
    left: 0;
    width: 100%;
    height: 120%;
    background: repeating-linear-gradient(
      transparent,
      transparent 3px,
      rgba(180, 230, 226, 0.06) 3px,
      rgba(180, 230, 226, 0.06) 4px
    );
    mask-image: linear-gradient(
      to bottom,
      transparent 10%,
      black 40%,
      black 60%,
      transparent 90%
    );
    animation: rainFall 0.6s linear infinite;
    pointer-events: none;
  }
  @keyframes rainFall {
    0% {
      transform: translateY(-2%);
    }
    100% {
      transform: translateY(2%);
    }
  }

  /* 雾气增强 */
  .mist {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35%;
    background: linear-gradient(
        to top,
        rgba(38, 120, 90, 0.08) 0%,
        transparent 80%
      ),
      linear-gradient(
        to right,
        rgba(180, 230, 226, 0.05),
        transparent 30%,
        rgba(46, 143, 116, 0.05) 70%,
        transparent
      );
    filter: blur(25px);
    animation: mistRise 14s ease-in-out infinite;
  }
  @keyframes mistRise {
    0%,
    100% {
      opacity: 0.3;
      transform: translateY(0) scale(1);
    }
    50% {
      opacity: 0.55;
      transform: translateY(-12px) scale(1.02);
    }
  }
}
/* ========== 石碑导航 ========== */
.stele-container {
  position: relative;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 380px;
  width: 90%;
}

/* 碑帽 */
.stele-cap {
  text-align: center;
  margin-bottom: -4px;
  background: linear-gradient(
    180deg,
    rgba(38, 120, 90, 0.6),
    rgba(6, 20, 20, 0.85)
  );
  padding: 18px 30px 14px;
  border-radius: 30px 30px 4px 4px;
  border: 1px solid rgba(207, 238, 232, 0.25);
  border-bottom: none;
  box-shadow: 0 -8px 20px rgba(0, 0, 0, 0.3),
    inset 0 2px 10px rgba(180, 230, 226, 0.15);
  .cap-text {
    font-family: "ZCOOL KuaiLe", "Liu Jian Mao Cao", cursive;
    font-size: 2rem;
    font-weight: 900;
    letter-spacing: 6px;
    background: linear-gradient(180deg, #ffffff, #cfeee8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(46, 143, 116, 0.5);
  }
  .cap-sub {
    display: block;
    font-size: 0.8rem;
    color: var(--moon-light);
    margin-top: 4px;
    letter-spacing: 3px;
    opacity: 0.8;
  }
}

/* 碑身 */
.stele-body {
  background: linear-gradient(
    180deg,
    rgba(6, 20, 20, 0.9),
    rgba(6, 16, 18, 0.95)
  );
  border: 1px solid rgba(207, 238, 232, 0.2);
  border-top: none;
  padding: 20px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(46, 143, 116, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 5%;
    width: 90%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(207, 238, 232, 0.4),
      transparent
    );
  }

  .stele-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 14px 20px;
    text-decoration: none;
    color: rgba(240, 250, 248, 0.7);
    font-size: 1.15rem;
    letter-spacing: 3px;
    transition: all 0.3s;
    cursor: pointer;
    border-bottom: 1px dashed rgba(207, 238, 232, 0.1);

    .item-text {
      transition: transform 0.3s, color 0.3s, text-shadow 0.3s;
    }

    .item-sword {
      position: absolute;
      left: 10%;
      width: 0;
      height: 1px;
      background: linear-gradient(
        90deg,
        var(--bamboo-green),
        var(--blade-silver)
      );
      transition: width 0.4s cubic-bezier(0.2, 0.9, 0.2, 1);
      box-shadow: 0 0 10px var(--bamboo-green);
    }

    &:hover {
      color: #fff;
      background: rgba(46, 143, 116, 0.08);
      .item-sword {
        width: 60px;
      }
      .item-text {
        transform: translateX(12px);
        text-shadow: 0 0 12px var(--moon-light);
      }
    }

    &.active-item {
      color: var(--blade-silver);
      font-weight: 700;
      background: rgba(38, 120, 90, 0.1);
      .item-sword {
        width: 80px;
        background: var(--bamboo-green);
        box-shadow: 0 0 16px var(--bamboo-green);
      }
      .item-text {
        transform: translateX(16px);
        text-shadow: 0 0 14px var(--bamboo-green);
      }
    }

    &.external {
      .item-text::after {
        content: " ↗";
        font-size: 0.8rem;
        opacity: 0.5;
      }
    }
  }
}

/* 碑座 */
.stele-base {
  margin-top: -2px;
  background: linear-gradient(
    180deg,
    rgba(6, 20, 20, 0.9),
    rgba(38, 120, 90, 0.5)
  );
  padding: 14px 20px;
  border-radius: 4px 4px 20px 20px;
  border: 1px solid rgba(207, 238, 232, 0.2);
  border-top: none;
  width: 100%;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);

  .base-info {
    color: var(--moon-light);
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    .base-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #2e8f74;
      box-shadow: 0 0 10px #2e8f74;
      animation: dotPulse 2s infinite;
    }
  }
}

@keyframes dotPulse {
  0%,
  100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}

/* 移动端关闭按钮 */
.close-btn {
  position: fixed;
  top: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: var(--clean-white);
  font-size: 20px;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1002;
  backdrop-filter: blur(4px);
}

/* ========== 移动端适配 ========== */
@media (max-width: 768px) {
  .blade-trigger {
    bottom: 20px;
    right: 20px;
    width: 52px;
    height: 52px;
    .trigger-icon {
      font-size: 0.8rem;
    }
  }

  .stele-container {
    max-width: 320px;
  }

  .stele-cap {
    padding: 12px 24px 10px;
    .cap-text {
      font-size: 1.6rem;
      letter-spacing: 4px;
    }
    .cap-sub {
      font-size: 0.7rem;
    }
  }

  .stele-body .stele-item {
    padding: 12px 16px;
    font-size: 1rem;
    letter-spacing: 2px;
    .item-sword {
      left: 5%;
    }
    &:hover .item-sword {
      width: 40px;
    }
    &.active-item .item-sword {
      width: 60px;
    }
  }

  .stele-base {
    padding: 10px 16px;
    .base-info {
      font-size: 0.75rem;
    }
  }

  .close-btn {
    display: flex;
  }
}
</style>
