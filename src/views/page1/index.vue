<template>
  <main class="home-page" role="main">
    <!-- Three.js 抽象几何背景 -->
    <div class="three-dom" ref="threeContainer"></div>

    <!-- 极简 CSS 装饰层：仅保留光晕与网格 -->
    <div class="bg-decor">
      <div class="glow-orb glow-1"></div>
      <div class="glow-orb glow-2"></div>
      <div class="grid-overlay"></div>
    </div>

    <!-- 居中内容区 -->
    <section class="center-wrap" aria-live="polite">
      <header class="hero" role="banner">
        <div class="title-decoration">
          <span class="bamboo-left">🎋</span>
          <span class="bamboo-right">🎋</span>
        </div>
        <h1 class="title">
          <span class="title-main">仇远</span>
          <span class="title-sub">千仇非杀，谢罪非远</span>
        </h1>
        <div class="title-glow"></div>
      </header>

      <div class="type-area" role="status" aria-atomic="true">
        <div class="type-box">
          <div class="type-content">
            <span class="typed">{{ displayText }}</span>
            <span class="cursor" aria-hidden="true">▌</span>
          </div>
          <div class="type-border-glow"></div>
        </div>
        <button @click="randomExplore" class="enter-btn">
          <span class="btn-text">🎋 踏竹寻迹 🎋</span>
          <div class="btn-glow"></div>
        </button>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="site-footer" role="contentinfo">
      <div class="footer-inner">
        <div class="left">
          <small
            >© {{ new Date().getFullYear() }} 但求手中之剑百折不摧，挥之有道 ·
            霜落天亦</small
          >
        </div>
      </div>
      <div class="footer-wave"></div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
// 引入重构后的抽象几何背景
import initQiuyuanAbstract from "./initQiuyuanStar";

const router = useRouter();
const threeContainer = ref<HTMLElement | null>(null);

// 随机探索路由
const exploreRoutes = [
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
];

function randomExplore() {
  const randomIndex = Math.floor(Math.random() * exploreRoutes.length);
  router.push(exploreRoutes[randomIndex].path);
}

// 仇远台词（精选，更契合抽象冷峻气质）
const lines = ref([
  { text: "剑不在杀，而在藏。" },
  { text: "竹似枪，叶似锋，鬼影重重。心如镜，墨如言，剑斩心魔。" },
  { text: "于无边黑暗中，裁一片竹海为锋；在血火恩仇外，寻一隅心镜清明。" },
  { text: "一斩，足矣。" },
  { text: "归处……我早已经没有那种地方。" },
  { text: "布衣之侠，不求冠绝江湖，但求手中之剑百折不摧。" },
  { text: "我手中的剑，虽无法替你斩尽仇敌，但我将教你如何成为一柄锋利的剑。" },
  { text: "危险的地方，交给我。" },
  { text: "竹影摇曳处，一剑封喉时。" },
  { text: "青冥照胆，明镜止水。" },
]);

const displayText = ref("");
const lineIndex = ref(0);
const charIndex = ref(0);

const TYPING_SPEED = 100;
const DELETING_SPEED = 30;
const PAUSE_AFTER_FULL = 1400;

let typingTimer: number | null = null;
let pauseTimer: number | null = null;

function typeStep() {
  const cur = lines.value[lineIndex.value].text;
  if (charIndex.value <= cur.length) {
    displayText.value = cur.slice(0, charIndex.value);
    charIndex.value++;
    typingTimer = window.setTimeout(typeStep, TYPING_SPEED);
  } else {
    pauseTimer = window.setTimeout(startDeleting, PAUSE_AFTER_FULL);
  }
}

function startDeleting() {
  const cur = lines.value[lineIndex.value].text;
  if (charIndex.value >= 0) {
    displayText.value = cur.slice(0, charIndex.value);
    charIndex.value--;
    typingTimer = window.setTimeout(startDeleting, DELETING_SPEED);
  } else {
    lineIndex.value = (lineIndex.value + 1) % lines.value.length;
    pauseTimer = window.setTimeout(() => {
      charIndex.value = 0;
      typeStep();
    }, 600);
  }
}

let bgCleanup: (() => void) | null = null;

onMounted(() => {
  if (threeContainer.value) {
    const { cleanup } = initQiuyuanAbstract(threeContainer.value);
    bgCleanup = cleanup;
  }

  pauseTimer = window.setTimeout(() => {
    charIndex.value = 0;
    typeStep();
  }, 1000);
});

onUnmounted(() => {
  if (typingTimer) clearTimeout(typingTimer);
  if (pauseTimer) clearTimeout(pauseTimer);
  if (bgCleanup) bgCleanup();
});
</script>

<style scoped lang="scss">
.home-page {
  // 与抽象几何背景匹配的冷峻色调
  --qiuyuan-bamboo: #2e8f74;
  --qiuyuan-silver: #cfeee8;
  --qiuyuan-ink: #050a0c;
  --qiuyuan-deep: #030608;
  --qiuyuan-gold: #c9b37a;
  --qiuyuan-white: #e8f6f4;
  --glass-edge: rgba(46, 143, 116, 0.25);
  --glass-bg: rgba(5, 10, 12, 0.45);
  --shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

  min-height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: "Noto Serif SC", "STKaiti", "KaiTi", serif;
  color: var(--qiuyuan-white);
  background: transparent; // 完全依赖Three.js背景
  padding-top: 0;

  .three-dom {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  // 极简 CSS 装饰层
  .bg-decor {
    position: fixed;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;

    .glow-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(120px);
      opacity: 0.15;
      animation: floatGlow 18s infinite alternate;

      &.glow-1 {
        width: 600px;
        height: 600px;
        background: radial-gradient(
          circle,
          rgba(46, 143, 116, 0.3),
          transparent
        );
        top: -15%;
        left: -10%;
      }
      &.glow-2 {
        width: 700px;
        height: 700px;
        background: radial-gradient(
          circle,
          rgba(207, 238, 232, 0.15),
          transparent
        );
        bottom: -20%;
        right: -15%;
        animation-delay: -5s;
      }
    }

    .grid-overlay {
      position: absolute;
      inset: 0;
      background-image: linear-gradient(
          rgba(46, 143, 116, 0.02) 1px,
          transparent 1px
        ),
        linear-gradient(90deg, rgba(46, 143, 116, 0.02) 1px, transparent 1px);
      background-size: 60px 60px;
      mask: radial-gradient(circle at 50% 50%, black 20%, transparent 80%);
    }
  }

  .center-wrap {
    position: relative;
    z-index: 6;
    min-height: calc(100vh - 96px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.5rem;
    gap: 2.8rem;
    text-align: center;

    .hero {
      position: relative;

      .title-decoration {
        .bamboo-left,
        .bamboo-right {
          position: absolute;
          font-size: 2rem;
          opacity: 0.5;
          filter: drop-shadow(0 0 10px rgba(46, 143, 116, 0.3));
          animation: bambooSway 4s infinite alternate;
        }
        .bamboo-left {
          left: -60px;
          top: -30px;
        }
        .bamboo-right {
          right: -60px;
          bottom: -30px;
          animation-delay: 1.5s;
        }
        @media (max-width: 680px) {
          .bamboo-left,
          .bamboo-right {
            display: none;
          }
        }
      }

      .title {
        margin: 0;
        position: relative;
        .title-main {
          font-size: 5.5rem;
          font-weight: 800;
          font-family: "Cinzel", "ZCOOL KuaiLe", "STKaiti", serif;
          background: linear-gradient(
            135deg,
            #fff,
            var(--qiuyuan-silver),
            var(--qiuyuan-bamboo)
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 10px;
          text-shadow: 0 0 40px rgba(46, 143, 116, 0.4);
          animation: titleFloat 4s ease-in-out infinite;
          -webkit-text-stroke: 0.5px rgba(46, 143, 116, 0.3);
        }
        .title-sub {
          display: block;
          font-size: 1.2rem;
          letter-spacing: 8px;
          color: var(--qiuyuan-silver);
          margin-top: 16px;
          font-weight: 300;
          opacity: 0.85;
          text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(2px);
        }
      }
      .title-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 150%;
        height: 150%;
        transform: translate(-50%, -50%);
        background: radial-gradient(
          ellipse at center,
          rgba(46, 143, 116, 0.1),
          transparent 70%
        );
        filter: blur(70px);
        pointer-events: none;
      }
    }

    .type-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 40px;
      width: 100%;
      max-width: 650px;

      .type-box {
        position: relative;
        background: var(--glass-bg);
        backdrop-filter: blur(8px);
        border: 1px solid var(--glass-edge);
        padding: 1.5rem 2.2rem;
        border-radius: 48px;
        box-shadow: var(--shadow), 0 0 0 1px rgba(46, 143, 116, 0.15) inset;
        transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1);
        width: 100%;

        &:hover {
          border-color: rgba(207, 238, 232, 0.5);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(46, 143, 116, 0.3) inset;
          transform: translateY(-4px);
        }

        .type-content {
          display: flex;
          align-items: baseline;
          gap: 10px;
          .typed {
            font-size: 1.4rem;
            font-weight: 500;
            line-height: 1.6;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
            letter-spacing: 1.5px;
            background: linear-gradient(
              90deg,
              var(--qiuyuan-white),
              var(--qiuyuan-silver)
            );
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .cursor {
            font-size: 1.5rem;
            font-weight: 300;
            color: var(--qiuyuan-silver);
            animation: blink 0.9s step-end infinite;
            text-shadow: 0 0 12px var(--qiuyuan-silver);
          }
        }

        .type-border-glow {
          position: absolute;
          inset: -2px;
          border-radius: 50px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--qiuyuan-bamboo),
            var(--qiuyuan-silver),
            transparent
          );
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
        }

        &:hover .type-border-glow {
          opacity: 0.5;
          animation: borderFlow 3s linear infinite;
        }
      }

      .enter-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 1rem 2.2rem;
        border-radius: 60px;
        font-weight: 600;
        font-size: 1.1rem;
        text-decoration: none;
        color: var(--qiuyuan-ink);
        background: linear-gradient(
          135deg,
          var(--qiuyuan-silver),
          var(--qiuyuan-bamboo)
        );
        box-shadow: 0 8px 28px rgba(46, 143, 116, 0.5),
          0 0 0 1px rgba(207, 238, 232, 0.2) inset;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        overflow: hidden;
        z-index: 6;
        letter-spacing: 3px;
        backdrop-filter: blur(4px);

        .btn-text {
          position: relative;
          z-index: 2;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .btn-glow {
          position: absolute;
          inset: -5px;
          border-radius: 70px;
          background: radial-gradient(
            ellipse at center,
            rgba(207, 238, 232, 0.6),
            transparent 75%
          );
          filter: blur(16px);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        &:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(46, 143, 116, 0.7),
            0 0 0 1px rgba(207, 238, 232, 0.4) inset;
          .btn-glow {
            opacity: 1;
          }
        }

        &:active {
          transform: translateY(-2px);
        }
      }
    }
  }

  .site-footer {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 6;
    border-top: 1px solid rgba(46, 143, 116, 0.2);
    padding: 1rem;
    background: linear-gradient(0deg, rgba(5, 10, 12, 0.8), transparent);
    backdrop-filter: blur(4px);
    overflow: hidden;

    .footer-wave {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(
        90deg,
        transparent,
        var(--qiuyuan-bamboo),
        var(--qiuyuan-silver),
        var(--qiuyuan-gold),
        transparent
      );
      animation: waveMove 6s linear infinite;
    }

    .footer-inner {
      max-width: 1000px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--qiuyuan-silver);
      font-size: 0.85rem;
      opacity: 0.7;

      .left {
        display: flex;
        gap: 0.8rem;
        align-items: center;
        padding: 0 1rem;
      }
      .dot {
        opacity: 0.5;
      }
    }
  }

  // 动画关键帧
  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  @keyframes floatGlow {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 0.1;
    }
    100% {
      transform: translate(30px, 20px) scale(1.15);
      opacity: 0.2;
    }
  }

  @keyframes titleFloat {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-6px);
    }
  }

  @keyframes bambooSway {
    0% {
      opacity: 0.3;
      transform: rotate(-8deg);
    }
    100% {
      opacity: 0.7;
      transform: rotate(8deg);
    }
  }

  @keyframes borderFlow {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  @keyframes waveMove {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  // 响应式
  @media (max-width: 880px) {
    .center-wrap {
      .hero .title .title-main {
        font-size: 4rem;
        letter-spacing: 6px;
      }
      .type-area .type-box {
        padding: 1.2rem 1.5rem;
        .typed {
          font-size: 1.2rem;
        }
      }
      .enter-btn {
        padding: 0.8rem 1.6rem;
        font-size: 1rem;
      }
    }
  }

  @media (max-width: 480px) {
    .center-wrap {
      min-height: calc(100vh - 100px);
      .hero .title .title-main {
        font-size: 2.8rem;
        letter-spacing: 4px;
      }
      .title-sub {
        font-size: 1rem;
        letter-spacing: 4px;
      }
      .type-area .type-box {
        padding: 1rem 1.2rem;
        .typed {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
