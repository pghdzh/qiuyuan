<template>
  <header class="app-header">
    <h1 class="title">仇远电子设定集</h1>
    <!-- 在线人数展示 -->
    <div class="online-count" v-if="onlineCount !== null">
      当前在线：<span class="count">{{ onlineCount }}人</span>
    </div>
    <!-- 移动端汉堡按钮 -->
    <button
      class="hamburger"
      @click="toggleMobileNav"
      aria-label="Toggle navigation"
    >
      <span :class="{ open: mobileNavOpen }"></span>
      <span :class="{ open: mobileNavOpen }"></span>
      <span :class="{ open: mobileNavOpen }"></span>
    </button>

    <!-- 普通导航 & 移动端下拉导航 -->
    <nav :class="['nav-links', { 'mobile-open': mobileNavOpen }]">
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        :to="item.path"
        class="nav-item"
        active-class="active-link"
        @click="mobileNavOpen = false"
      >
        {{ item.name }}
      </RouterLink>

      <a
        href="http://36.150.237.25/#/redirector"
        target="_blank"
        rel="noopener"
        class="nav-item"
        active-class="active-link"
        @click="mobileNavOpen = false"
      >
        霜落映界
      </a>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { io } from "socket.io-client";

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
];

const mobileNavOpen = ref(false);
function toggleMobileNav() {
  mobileNavOpen.value = !mobileNavOpen.value;
}

const siteId = "qiuyuan";

const onlineCount = ref<number | null>(null);

// 连接时带上 query.siteId
const socket: any = io("http://36.150.237.25:3000", {
  query: { siteId },
});

onMounted(() => {
  socket.on("onlineCount", (count: number) => {
    onlineCount.value = count;
  });
});

onBeforeUnmount(() => {
  socket.disconnect();
});
</script>

<style scoped lang="scss">
/* 仇远 — 竹月剑影：墨青 / 翠绿 / 月银 + 竹影风吟 */
.app-header {
  --deep-bg: linear-gradient(
    180deg,
    rgba(6, 14, 18, 0.98),
    rgba(10, 20, 22, 0.995)
  ); /* 寒月底色（深墨青） */
  --moon-core: rgba(190, 230, 230, 0.06); /* 月华薄光 */
  --accent: #2e8f74; /* 主色：翠玉绿色（竹叶色） */
  --accent-2: #cfeee8; /* 次色：月色浅绿/银白 */
  --silver-accent: #d7e9ee; /* 剑光银色点缀 */
  --muted-text: #e8f6f4; /* 冷白文字 */
  --bamboo-mist: rgba(38, 120, 90, 0.06); /* 竹影薄雾 */
  --wind-sheen: rgba(180, 220, 215, 0.03); /* 风中光雾/微光 */

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background: radial-gradient(
      360px 80px at 12% 12%,
      rgba(180, 230, 226, 0.02),
      transparent 12%
    ),
    var(--deep-bg);
  backdrop-filter: blur(6px) saturate(1);
  box-shadow: 0 10px 36px rgba(6, 10, 12, 0.72), 0 0 18px var(--moon-core) inset;
  border-bottom: 1px solid rgba(180, 220, 215, 0.03);
  animation: fadeInDown 0.5s ease-out both;
  overflow: visible;

  &::after {
    /* 竹影薄雾 + 剑锋冷光 */
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(180deg, var(--bamboo-mist), transparent 28%);
    mix-blend-mode: overlay;
  }

  /* 右侧竹影与月光剪影 */
  &::before {
    content: "";
    position: absolute;
    right: 6%;
    top: 6%;
    width: 300px;
    height: 92px;
    pointer-events: none;
    background: radial-gradient(
        44px 14px at 14% 22%,
        rgba(200, 245, 240, 0.12),
        transparent 30%
      ),
      radial-gradient(
        88px 28px at 50% 40%,
        rgba(46, 143, 116, 0.06),
        transparent 46%
      ),
      radial-gradient(
        24px 10px at 78% 62%,
        rgba(223, 240, 238, 0.04),
        transparent 42%
      );
    filter: blur(6px);
    transform: translateY(0) rotate(-2deg);
    animation: breeze-drift 9s ease-in-out infinite;
    mix-blend-mode: screen;
  }

  .title {
    position: relative;
    font-family: "Cinzel", serif;
    font-style: normal;
    font-size: 26px;
    font-weight: 800;
    color: var(--muted-text);
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 0.6px;
    text-shadow: 0 6px 22px rgba(6, 10, 12, 0.6);
    transition: transform 0.28s ease, text-shadow 0.28s ease;
    animation: pulse-still 8.6s ease-in-out infinite;

    &:hover {
      transform: translateY(-2px) scale(1.04);
      text-shadow: 0 12px 36px rgba(60, 140, 110, 0.08);
    }
  }

  .online-count {
    position: relative;
    margin-left: 16px;
    padding: 6px 14px;
    font-family: "Cinzel", serif;
    font-size: 1rem;
    color: var(--muted-text);
    background: linear-gradient(
      135deg,
      rgba(8, 14, 12, 0.26),
      rgba(6, 12, 12, 0.18)
    );
    border: 1px solid rgba(200, 230, 220, 0.03);
    border-radius: 24px;
    backdrop-filter: blur(6px);
    box-shadow: 0 6px 18px rgba(6, 10, 12, 0.5), 0 0 10px var(--moon-core) inset;
    overflow: hidden;
    cursor: default;
    transition: transform 0.22s ease, box-shadow 0.22s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 36px rgba(6, 10, 12, 0.6),
        0 0 34px rgba(180, 230, 225, 0.06);
    }

    .count {
      display: inline-block;
      margin-left: 18px;
      font-weight: 800;
      color: var(--accent-2);
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 8px rgba(160, 230, 210, 0.04);
    }
  }

  .nav-links {
    display: flex;
    gap: 22px;
    align-items: center;

    .nav-item {
      position: relative;
      color: var(--muted-text);
      font-weight: 600;
      text-decoration: none;
      transition: color 0.22s ease, transform 0.16s ease;
      padding: 6px 4px;
      border-radius: 6px;
      overflow: visible;
      font-family: "STKaiti", "KaiTi", "Noto Serif SC", serif;
      font-style: italic;

      &::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -8px;
        width: 0;
        height: 6px;
        border-radius: 6px;
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0),
          rgba(60, 140, 110, 0.92),
          rgba(200, 240, 235, 0.9),
          rgba(0, 0, 0, 0)
        );
        transform: translateX(-50%);
        opacity: 0.95;
        filter: blur(0.8px) contrast(1.03);
        transition: width 0.36s cubic-bezier(0.2, 0.9, 0.2, 1), left 0.36s,
          opacity 0.24s;
        background-size: 200% 100%;
        animation: wave-breeze 5.8s linear infinite;
      }

      &::before {
        content: "";
        position: absolute;
        right: 14%;
        top: -6px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: radial-gradient(
          circle,
          var(--silver-accent),
          transparent 60%
        );
        opacity: 0;
        transform: translateY(-6px) scale(0.86);
        transition: opacity 0.26s, transform 0.36s;
        box-shadow: 0 6px 14px rgba(40, 140, 110, 0.06);
      }

      &:hover {
        color: var(--accent-2);
        transform: translateY(-1.8px);
        text-shadow: 0 0 8px rgba(80, 160, 140, 0.02);
      }

      &:hover::after {
        width: 72%;
        left: 50%;
        opacity: 1;
      }

      &:hover::before {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .active-link {
      color: var(--accent);
      font-weight: 700;

      &::before {
        content: "🌙";
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-50%) rotate(-6deg);
        font-size: 12px;
        color: var(--silver-accent);
        text-shadow: 0 2px 10px rgba(200, 240, 235, 0.06);
        animation: moon-emblem 3.6s ease-in-out infinite;
        opacity: 0.98;
      }

      &::after {
        width: 92%;
        opacity: 1;
        box-shadow: 0 6px 22px rgba(40, 110, 95, 0.06);
      }
    }
  }

  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 28px;
    height: 24px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;

    span {
      display: block;
      width: 100%;
      height: 3px;
      background: rgba(232, 246, 244, 0.92);
      border-radius: 2px;
      transition: transform 0.28s ease, opacity 0.28s ease, background 0.28s;
      box-shadow: 0 2px 6px rgba(6, 10, 12, 0.18), 0 0 8px var(--moon-core);
    }

    span.open:nth-child(1) {
      transform: translateY(10px) rotate(45deg);
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
    }

    span.open:nth-child(2) {
      opacity: 0;
    }

    span.open:nth-child(3) {
      transform: translateY(-10px) rotate(-45deg);
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
    }
  }

  @media (max-width: 768px) {
    padding: 0 20px;

    .title {
      display: none;
    }
    .hamburger {
      display: flex;
    }

    .nav-links {
      position: absolute;
      top: 64px;
      left: 0;
      right: 0;
      flex-direction: column;
      background: linear-gradient(
        180deg,
        rgba(10, 14, 12, 0.98),
        rgba(6, 10, 10, 0.995)
      );
      backdrop-filter: blur(12px);
      gap: 0;
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.34s ease;
      border-top: 1px solid rgba(180, 220, 215, 0.03);

      &.mobile-open {
        max-height: 520px;
      }

      .nav-item {
        padding: 14px 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      }
    }
  }
}

/* 动效关键帧（竹影 / 微风 / 剑光） */
@keyframes wave-breeze {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse-still {
  0% {
    transform: translateY(0);
  }
  45% {
    transform: translateY(-2px) scale(1.01);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes breeze-drift {
  0% {
    transform: translateY(0) rotate(-2deg) translateX(0);
    opacity: 0.9;
    filter: blur(6px);
  }
  50% {
    transform: translateY(-6px) rotate(2deg) translateX(-6px);
    opacity: 1;
    filter: blur(4px) saturate(1.03);
  }
  100% {
    transform: translateY(0) rotate(-2deg) translateX(0);
    opacity: 0.9;
  }
}

@keyframes lunar-glint {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-4px) rotate(0.4deg);
    opacity: 1;
    filter: drop-shadow(0 6px 18px rgba(180, 230, 225, 0.06));
  }
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.6;
  }
}

@keyframes moon-emblem {
  0% {
    transform: translateY(-6%) rotate(-6deg);
    opacity: 0.8;
    filter: drop-shadow(0 2px 8px rgba(180, 230, 225, 0.04));
  }
  50% {
    transform: translateY(6%) rotate(2deg);
    opacity: 1;
    filter: drop-shadow(0 6px 18px rgba(200, 240, 235, 0.08));
  }
  100% {
    transform: translateY(-6%) rotate(-6deg);
    opacity: 0.8;
  }
}
</style>
