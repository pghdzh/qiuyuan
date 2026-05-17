<template>
  <div class="qiuyuan-thanks">
    <!-- 动态装饰层 -->
    <div class="bg-atmosphere">
      <div class="moon-main"></div>
      <div class="moon-sub"></div>
      <div class="firefly firefly-1"></div>
      <div class="firefly firefly-2"></div>
      <div class="firefly firefly-3"></div>
      <div class="sword-light sword-light-1"></div>
      <div class="sword-light sword-light-2"></div>
      <div class="ink-drop ink-drop-1"></div>
      <div class="ink-drop ink-drop-2"></div>
      <div class="mist"></div>
    </div>

    <div class="container">
      <!-- 标题区 -->
      <header class="page-header">
        <div class="title-decor left"></div>
        <div class="title-group">
          <h1 class="page-title">倦客致谢</h1>
          <p class="page-subtitle">倦客不知身近远，青锋有鸣谢知音</p>
        </div>
        <div class="title-decor right"></div>
      </header>

      <!-- 鸣谢列表 -->
      <ul class="ack-list" v-if="acknowledgements.length > 0">
        <li
          v-for="(item, index) in acknowledgements"
          :key="index"
          class="ack-item"
          :style="{ animationDelay: index * 0.12 + 's' }"
        >
          <div class="item-left">
            <span class="nickname">{{ item.nickname }}</span>
          </div>
          <div class="item-right">
            <span class="suggestion">{{ item.suggestion }}</span>
          </div>
        </li>
      </ul>

      <div v-else class="empty-state">暂无鸣谢内容 · 剑匣静待知音</div>
    </div>

    <footer class="page-footer">
      <span>© {{ new Date().getFullYear() }} 仇远电子设定集</span>
      <span class="dot">·</span>
      <span>感谢所有持剑同行者</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const acknowledgements = reactive([
  { nickname: "雁眠", suggestion: "赞助光标" },
  { nickname: "雪_霁__", suggestion: "千仇非杀，谢罪非远(首页主标题)" },
  {
    nickname: "雪_霁__",
    suggestion:
      "竹似枪，叶似锋，鬼影重重。心如镜，墨如言，剑斩心魔(首页副标题)",
  },
  {
    nickname: "白石流奕",
    suggestion:
      "于无边黑暗中，裁一片竹海为锋；在血火恩仇外，寻一隅心镜清明。(首页副标题)",
  },
  { nickname: "ACD第一队长", suggestion: "wiki功能建议" },
  { nickname: "ACD第一队长", suggestion: "页面通缉伤痕和哥舒林" },
]);
</script>

<style scoped lang="scss">
/* ========== 仇远色彩变量 ========== */
.qiuyuan-thanks {
  --bamboo-green: #2e8f74;
  --blade-silver: #cfeee8;
  --moon-light: #b4e6e2;
  --deep-ink: #0b1a16;
  --night-base: #050a0c;
  --text-primary: #f0faf8;
  --text-secondary: rgba(207, 238, 232, 0.7);
  --card-bg: rgba(5, 10, 12, 0.55);
  --card-border: rgba(46, 143, 116, 0.2);
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

  position: relative;
  min-height: 100vh;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: radial-gradient(ellipse at 50% 30%, #0a1410 0%, #030606 100%);
  font-family: "Noto Serif SC", "STKaiti", "KaiTi", serif;
  color: var(--text-primary);
  overflow-x: hidden;
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
    width: 350px;
    height: 350px;
    background: radial-gradient(
      circle at 45% 40%,
      rgba(180, 230, 226, 0.15),
      transparent 70%
    );
    filter: blur(55px);
    animation: moonBreathe 8s ease-in-out infinite alternate;
  }
  .moon-sub {
    position: absolute;
    bottom: 12%;
    left: 5%;
    width: 260px;
    height: 260px;
    background: radial-gradient(
      circle at 60% 60%,
      rgba(46, 143, 116, 0.1),
      transparent 70%
    );
    filter: blur(45px);
    animation: moonBreathe 10s ease-in-out infinite alternate-reverse;
  }
  @keyframes moonBreathe {
    from {
      opacity: 0.35;
      transform: scale(1);
    }
    to {
      opacity: 0.7;
      transform: scale(1.12);
    }
  }

  .firefly {
    position: absolute;
    width: 5px;
    height: 5px;
    background: radial-gradient(circle, #f0faf8 0%, transparent 85%);
    border-radius: 50%;
    box-shadow: 0 0 16px #cfeee8, 0 0 35px rgba(180, 230, 226, 0.5);
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
        rgba(207, 238, 232, 0.4),
        transparent 70%
      );
      border-radius: 50%;
      filter: blur(2px);
    }
  }
  .firefly-1 {
    top: 20%;
    left: 12%;
    animation-duration: 9s;
  }
  .firefly-2 {
    top: 50%;
    left: 75%;
    animation-duration: 12s;
    animation-delay: 3s;
  }
  .firefly-3 {
    top: 70%;
    left: 30%;
    animation-duration: 10s;
    animation-delay: 6s;
  }
  @keyframes fireflyFloat {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.2;
    }
    25% {
      transform: translate(30px, -60px) scale(1.5);
      opacity: 0.85;
    }
    50% {
      transform: translate(-20px, -100px) scale(1.1);
      opacity: 0.3;
    }
    75% {
      transform: translate(10px, -140px) scale(0.9);
      opacity: 0.65;
    }
  }

  .sword-light {
    position: absolute;
    left: -10%;
    width: 320%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(207, 238, 232, 0.25) 40%,
      rgba(207, 238, 232, 0.7) 50%,
      rgba(207, 238, 232, 0.25) 60%,
      transparent
    );
    filter: blur(1px) drop-shadow(0 0 6px var(--bamboo-green));
    animation: swordSweep linear infinite;
    mix-blend-mode: screen;
  }
  .sword-light-1 {
    bottom: 25%;
    animation-duration: 10s;
    transform: rotate(-12deg);
  }
  .sword-light-2 {
    bottom: 45%;
    animation-duration: 14s;
    animation-delay: -5s;
    transform: rotate(15deg) scaleX(1.1);
  }
  @keyframes swordSweep {
    0% {
      transform: translateX(-25%) rotate(-12deg);
      opacity: 0;
    }
    30% {
      opacity: 0.8;
    }
    70% {
      opacity: 0.5;
    }
    100% {
      transform: translateX(45%) rotate(-12deg);
      opacity: 0;
    }
  }

  .ink-drop {
    position: absolute;
    width: 2px;
    height: 2px;
    background: rgba(46, 143, 116, 0.8);
    border-radius: 50%;
    box-shadow: 0 0 12px #2e8f74;
    animation: inkDrop 8s linear infinite;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 35px;
      height: 35px;
      margin: -17px;
      border: 1px solid rgba(46, 143, 116, 0.2);
      border-radius: 50%;
      animation: ripple 2.5s ease-out infinite;
    }
  }
  .ink-drop-1 {
    top: 30%;
    left: 18%;
  }
  .ink-drop-2 {
    top: 50%;
    left: 70%;
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
      transform: translateY(70vh);
      opacity: 0;
    }
  }
  @keyframes ripple {
    0% {
      transform: scale(0.5);
      opacity: 0.7;
    }
    100% {
      transform: scale(2.2);
      opacity: 0;
    }
  }

  .mist {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(to top, rgba(38, 120, 90, 0.08), transparent);
    filter: blur(25px);
    animation: mistRise 12s ease-in-out infinite;
  }
  @keyframes mistRise {
    0%,
    100% {
      opacity: 0.25;
      transform: translateY(0);
    }
    50% {
      opacity: 0.5;
      transform: translateY(-8px);
    }
  }
}

/* ========== 内容容器 ========== */
.container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 700px;
  padding: 24px 20px;
}

/* ========== 标题区 ========== */
.page-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  text-align: center;

  .title-decor {
    width: 60px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--blade-silver));
    opacity: 0.5;
    &.left {
      background: linear-gradient(-90deg, transparent, var(--blade-silver));
    }
    &.right {
      background: linear-gradient(90deg, transparent, var(--blade-silver));
    }
  }

  .title-group {
    .page-title {
      font-family: "ZCOOL KuaiLe", "STKaiti", serif;
      font-size: 2.8rem;
      font-weight: 700;
      letter-spacing: 6px;
      background: linear-gradient(
        135deg,
        #fff,
        var(--blade-silver),
        var(--bamboo-green)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 30px rgba(46, 143, 116, 0.4);
      margin: 0;
    }
    .page-subtitle {
      margin: 8px 0 0;
      font-size: 0.95rem;
      color: var(--moon-light);
      letter-spacing: 2px;
      font-style: italic;
      opacity: 0.8;
    }
  }
}

/* ========== 列表 ========== */
.ack-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;

  .ack-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 16px 20px;
    background: var(--card-bg);
    backdrop-filter: blur(12px);
    border-radius: 14px;
    border: 1px solid var(--card-border);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
    opacity: 0;
    transform: translateY(12px);
    animation: itemIn 0.5s ease forwards;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      border-color: var(--bamboo-green);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6),
        0 0 20px rgba(46, 143, 116, 0.15);
    }

    .item-left {
      flex-shrink: 0;
      min-width: 80px;

      .nickname {
        font-weight: 700;
        font-size: 1.05rem;
        color: var(--blade-silver);
        letter-spacing: 1px;
        text-shadow: 0 0 8px rgba(46, 143, 116, 0.3);
      }
    }

    .item-right {
      flex: 1;

      .suggestion {
        color: var(--text-primary);
        font-size: 0.95rem;
        line-height: 1.6;
        opacity: 0.9;
      }
    }
  }
}

/* 入场动画 */
@keyframes itemIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 0;
  color: var(--text-secondary);
  font-style: italic;
  letter-spacing: 2px;
  font-size: 1.1rem;
}

/* ========== 页脚 ========== */
.page-footer {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 20px;
  margin-top: 40px;
  color: var(--text-secondary);
  font-size: 0.85rem;
  letter-spacing: 1px;
  opacity: 0.7;

  .dot {
    margin: 0 8px;
    opacity: 0.5;
  }
}

/* ========== 响应式 ========== */
@media (max-width: 640px) {
  .qiuyuan-thanks {
    padding-top: 60px;
  }

  .page-header {
    gap: 12px;
    .title-decor {
      width: 30px;
    }
    .title-group .page-title {
      font-size: 2rem;
      letter-spacing: 3px;
    }
    .page-subtitle {
      font-size: 0.8rem;
    }
  }

  .ack-item {
    flex-direction: column;
    gap: 8px;
    padding: 14px 16px;

    .item-left .nickname {
      font-size: 1rem;
    }
    .item-right .suggestion {
      font-size: 0.9rem;
    }
  }
}
</style>
