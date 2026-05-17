<template>
  <div class="qiuyuan-message-board" aria-live="polite">
    <!-- 背景轮播（保留原有图片集，添加青墨遮罩） -->
    <div class="carousel carousel1" aria-hidden="true">
      <img
        v-for="(src, idx) in randomFive"
        :key="idx"
        :src="src"
        class="carousel-image"
        :class="{ active: idx === currentIndex }"
      />
    </div>
    <div class="carousel carousel2" aria-hidden="true">
      <img
        v-for="(src, idx) in randomFive2"
        :key="idx"
        :src="src"
        class="carousel-image"
        :class="{ active: idx === currentIndex }"
      />
    </div>

    <!-- 仇远主题动态氛围层 -->
    <div class="qiuyuan-decor">
      <!-- 月光 -->
      <div class="moon-main"></div>
      <div class="moon-sub"></div>
      <!-- 流萤 -->
      <div class="firefly firefly-1"></div>
      <div class="firefly firefly-2"></div>
      <div class="firefly firefly-3"></div>
      <div class="firefly firefly-4"></div>
      <div class="firefly firefly-5"></div>
      <div class="firefly firefly-6"></div>
      <!-- 剑气流光 -->
      <div class="sword-light sword-light-1"></div>
      <div class="sword-light sword-light-2"></div>
      <div class="sword-light sword-light-3"></div>
      <!-- 细雨与雾气 -->
      <div class="rain"></div>
      <div class="mist"></div>
      <!-- 斗笠剪影 -->
      <div class="hat-silhouette"></div>
      <!-- 墨滴涟漪 -->
      <div class="ink-drop ink-drop-1"></div>
      <div class="ink-drop ink-drop-2"></div>
    </div>

    <!-- 顶部标题区 -->
    <header class="board-header" role="banner">
      <div class="title-wrap">
        <div class="sword-emblem">⚔️</div>
        <h1>剑鸣回响</h1>
        <span class="title-count">（共{{ totalCount }}条）</span>
        <p class="subtitle">藏锋于竹 · 江湖低语</p>
      </div>
    </header>

    <!-- 留言展示区（带无限滚动哨兵） -->
    <section class="message-list">
      <div class="message-list-inner">
        <transition-group name="msg" tag="div">
          <div
            v-if="loading && messages.length === 0"
            class="skeleton-wrap"
            key="skeleton"
          >
            <div class="skeleton" v-for="i in 3" :key="i">
              <div class="sk-avatar"></div>
              <div class="sk-lines">
                <div class="sk-line short"></div>
                <div class="sk-line"></div>
              </div>
            </div>
          </div>
          <div
            v-for="(msg, idx) in messages"
            :key="msg.id || msg._tempId || idx"
            class="message-card"
            :data-index="idx"
            tabindex="0"
            role="article"
            :aria-label="`留言来自 ${msg.name || '匿名'}，内容：${msg.content}`"
          >
            <div class="message-meta">
              <div class="left-meta">
                <div class="name-avatar" :title="msg.name || '匿名'">
                  {{ getInitial(msg.name) }}
                </div>
                <div class="meta-texts">
                  <div class="message-name">{{ msg.name || "无名剑客" }}</div>
                  <div class="message-time">
                    {{ formatTime(msg.created_at) }}
                  </div>
                </div>
              </div>
            </div>
            <p class="message-content">{{ msg.content }}</p>
          </div>
        </transition-group>
        <!-- 无限滚动哨兵 -->
        <div ref="sentinel" class="sentinel"></div>
        <!-- 加载更多提示 -->
        <div v-if="loadingMore" class="loading-more">
          <span class="spark">⚔️</span> 剑意凝聚中...
          <span class="spark">⚔️</span>
        </div>
        <div v-if="!hasMore && messages.length > 0" class="end-message">
          —— 青锋已藏 · 暂无更多回响 ——
        </div>
      </div>
    </section>

    <!-- 底部发送区 -->
    <section class="message-form" aria-label="留下你的江湖低语">
      <label class="sr-only" for="mb-name">你的署名</label>
      <input
        id="mb-name"
        v-model="name"
        type="text"
        placeholder="留下你的江湖名号"
        @keydown.enter.prevent
      />

      <label class="sr-only" for="mb-content">留言内容</label>
      <textarea
        id="mb-content"
        v-model="content"
        placeholder="写下你的江湖低语…"
        @keydown.ctrl.enter.prevent="submitMessage"
        @input="autoGrow"
        ref="textareaRef"
      />

      <div class="form-row">
        <div class="hint">
          <span class="spark">🎋</span>
          <kbd>Ctrl</kbd> + <kbd>Enter</kbd>
          <span class="spark">🎋</span>
        </div>
        <button @click="submitMessage" :disabled="isSending || !content.trim()">
          <span v-if="!isSending">青锋出鞘</span>
          <span v-else>剑已出鞘…</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { getMessageList, createMessage } from "@/api/modules/message";

// ========== 分页状态 ==========
const messages = ref<any[]>([]);
const totalCount = ref(0);
const currentPage = ref(1);
const pageSize = 20;
const hasMore = ref(true);
const loading = ref(true);
const loadingMore = ref(false);
let observer: IntersectionObserver | null = null;

// ========== 表单状态 ==========
const name = ref(localStorage.getItem("message_name") || "");
const content = ref("");
const isSending = ref(false);
const textareaRef = ref<HTMLTextAreaElement | null>(null);

// ========== 无限滚动哨兵 ==========
const sentinel = ref<HTMLElement | null>(null);

// ========== 数据获取 ==========
const loadMessages = async (page: number, append = false) => {
  if (page === 1) loading.value = true;
  else loadingMore.value = true;

  try {
    const res = await getMessageList({ page, pageSize });
    const newData = res.data || [];
    const pagination = res.pagination;

    if (append) {
      messages.value = [...messages.value, ...newData];
    } else {
      messages.value = newData;
    }
    totalCount.value = pagination.total;
    hasMore.value = page < pagination.totalPages;
    currentPage.value = page;
    await nextTick();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

// 加载下一页
const loadNextPage = () => {
  if (!hasMore.value || loadingMore.value) return;
  loadMessages(currentPage.value + 1, true);
};

// ========== 提交留言 ==========
const submitMessage = async () => {
  if (!content.value.trim() || isSending.value) return;
  isSending.value = true;
  const payload = { name: name.value || "无名剑客", content: content.value };
  try {
    localStorage.setItem("message_name", name.value);
    content.value = "";
    await nextTick();
    await createMessage(payload);
    // 重置分页重新加载
    currentPage.value = 1;
    hasMore.value = true;
    await loadMessages(1, false);
    // 滚动到顶部
    const listEl = document.querySelector(".message-list-inner");
    if (listEl) listEl.scrollTop = 0;
  } catch (err) {
    console.error(err);
  } finally {
    isSending.value = false;
  }
};

// ========== 辅助函数 ==========
const formatTime = (time: string) => {
  if (!time) return "";
  const d = new Date(time);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day} ${hh}:${mm}`;
};

const getInitial = (n?: string) => {
  if (!n) return "竹";
  return n.trim().slice(0, 1).toUpperCase();
};

const autoGrow = (e?: Event) => {
  const ta = textareaRef.value;
  if (!ta) return;
  ta.style.height = "auto";
  const h = Math.min(ta.scrollHeight, 220);
  ta.style.height = h + "px";
};

// ========== 背景轮播 ==========
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

// ========== 生命周期 ==========
onMounted(async () => {
  await loadMessages(1, false);

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore.value && !loadingMore.value) {
        loadNextPage();
      }
    },
    { threshold: 0.5 }
  );
  if (sentinel.value) observer.observe(sentinel.value);

  Imgtimer = window.setInterval(() => {
    currentIndex.value =
      (currentIndex.value + 1) % Math.max(1, randomFive.value.length);
  }, 5200);

  nextTick(() => autoGrow());
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  if (Imgtimer) clearInterval(Imgtimer);
});
</script>

<style scoped lang="scss">
/* ========== 仇远主题色彩 ========== */
$bamboo-green: #2e8f74;
$blade-silver: #cfeee8;
$moon-light: #b4e6e2;
$deep-ink: #0b1a16;
$night-base: #050a0c;
$text-primary: #f0faf8;
$text-secondary: rgba(207, 238, 232, 0.7);
$card-bg: rgba(5, 10, 12, 0.6);
$card-border: rgba(46, 143, 116, 0.2);
$shadow: 0 10px 30px rgba(0, 0, 0, 0.6);

.qiuyuan-message-board {
  position: relative;
  min-height: 100vh;
  padding-top: 110px;
  display: flex;
  flex-direction: column;
  background: radial-gradient(ellipse at 30% 20%, #0a1410 0%, #030606 100%);
  font-family: "Noto Serif SC", "STKaiti", "KaiTi", serif;
  color: $text-primary;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;

  /* 背景轮播保留，增加青墨遮罩 */
  .carousel {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(5, 10, 12, 0.45);

      z-index: 1;
    }
    .carousel-image {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 1.2s ease;
      &.active {
        opacity: 1;
      }
    }
  }
  .carousel2 {
    display: none; // 移动端切换显示逻辑已在响应式中保留
  }

  /* 仇远氛围层 */
  .qiuyuan-decor {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  }

  .moon-main {
    position: absolute;
    top: 5%;
    right: 10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(
      circle,
      rgba(180, 230, 226, 0.15),
      transparent 70%
    );
    filter: blur(60px);
    animation: moonBreathe 8s ease-in-out infinite alternate;
  }
  .moon-sub {
    position: absolute;
    bottom: 10%;
    left: 5%;
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba(46, 143, 116, 0.1),
      transparent 70%
    );
    filter: blur(50px);
    animation: moonBreathe 10s ease-in-out infinite alternate-reverse;
  }
  @keyframes moonBreathe {
    from {
      opacity: 0.3;
      transform: scale(1);
    }
    to {
      opacity: 0.7;
      transform: scale(1.15);
    }
  }

  .firefly {
    position: absolute;
    width: 5px;
    height: 5px;
    background: radial-gradient(circle, #f0faf8 0%, transparent 85%);
    border-radius: 50%;
    box-shadow: 0 0 18px $blade-silver, 0 0 40px rgba(180, 230, 226, 0.5);
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
    top: 85%;
    left: 55%;
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
      opacity: 0.8;
    }
    50% {
      transform: translate(-25px, -120px) scale(1.2);
      opacity: 0.3;
    }
    75% {
      transform: translate(15px, -160px) scale(1);
      opacity: 0.6;
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
      rgba($bamboo-green, 0.3),
      $blade-silver,
      rgba($bamboo-green, 0.3),
      transparent
    );
    filter: blur(1px) drop-shadow(0 0 6px $bamboo-green);
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
      opacity: 0.6;
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
    background: linear-gradient(to top, rgba(38, 120, 90, 0.1), transparent);
    filter: blur(30px);
    animation: mistRise 14s ease-in-out infinite;
  }
  @keyframes mistRise {
    0%,
    100% {
      opacity: 0.3;
      transform: translateY(0);
    }
    50% {
      opacity: 0.6;
      transform: translateY(-8px);
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
    background: rgba($bamboo-green, 0.8);
    border-radius: 50%;
    box-shadow: 0 0 12px $bamboo-green;
    animation: inkDrop 8s linear infinite;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 40px;
      height: 40px;
      margin: -20px;
      border: 1px solid rgba($bamboo-green, 0.25);
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

  /* 顶部标题 */
  .board-header {
    position: absolute;
    top: 72px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 32px);
    max-width: 960px;
    padding: 14px 28px;
    border-radius: 40px;
    background: rgba(5, 10, 12, 0.55);
    backdrop-filter: blur(2px);
    border: 1px solid $card-border;
    box-shadow: 0 12px 30px $shadow, inset 0 1px 0 rgba($blade-silver, 0.1);
    z-index: 6;

    .title-wrap {
      display: flex;
      align-items: baseline;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;

      .sword-emblem {
        font-size: 28px;
        filter: drop-shadow(0 0 10px $bamboo-green);
      }
      h1 {
        margin: 0;
        font-size: 1.8rem;
        font-weight: 700;
        background: linear-gradient(135deg, #fff, $blade-silver);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        letter-spacing: 4px;
      }
      .title-count {
        font-size: 0.85rem;
        color: $text-secondary;
      }
      .subtitle {
        margin: 0 0 0 auto;
        font-size: 0.85rem;
        color: $moon-light;
        font-style: italic;
        letter-spacing: 2px;
      }
    }
  }

  /* 留言列表 */
  .message-list {
    position: relative;
    z-index: 2;
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    margin-top: 18px;
    max-height: 60vh;
    .message-list-inner {
      max-width: 960px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .skeleton-wrap {
      display: flex;
      flex-direction: column;
      gap: 16px;
      .skeleton {
        display: flex;
        gap: 14px;
        align-items: center;
        padding: 14px;
        background: $card-bg;
        border-radius: 20px;
        border: 1px solid $card-border;
      }
      .sk-avatar {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: linear-gradient(135deg, $bamboo-green, $deep-ink);
      }
      .sk-lines {
        flex: 1;
        .sk-line {
          height: 12px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.06);
          margin-bottom: 8px;
          &.short {
            width: 40%;
          }
        }
      }
    }

    .message-card {
      background: rgba(6, 16, 18, 0.45);
      backdrop-filter: blur(1px);
      border-radius: 24px;
      padding: 20px;
      margin: 16px 0;
      border: 1px solid $card-border;
      transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);

      &:hover {
        transform: translateY(-4px);
        border-color: $bamboo-green;
        box-shadow: 0 12px 30px rgba(46, 143, 116, 0.2);
        .message-content {
          border-left-color: $blade-silver;
        }
      }

      .message-meta {
        display: flex;
        justify-content: space-between;
        margin-bottom: 14px;
        .left-meta {
          display: flex;
          gap: 14px;
          align-items: center;
          .name-avatar {
            width: 52px;
            height: 52px;
            border-radius: 14px;
            background: linear-gradient(135deg, $bamboo-green, $deep-ink);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 1.2rem;
            color: $blade-silver;
            box-shadow: 0 0 10px rgba(46, 143, 116, 0.4);
          }
          .meta-texts {
            .message-name {
              font-size: 1rem;
              font-weight: 700;
              color: $blade-silver;
              letter-spacing: 1px;
            }
            .message-time {
              font-size: 0.75rem;
              color: $text-secondary;
              margin-top: 2px;
            }
          }
        }
      }

      .message-content {
        font-size: 0.95rem;
        line-height: 1.7;
        color: $text-primary;
        white-space: pre-wrap;
        word-break: break-word;
        margin: 0;
        border-left: 3px solid $bamboo-green;
        padding-left: 14px;
        transition: border-color 0.3s;
      }
    }

    .sentinel {
      height: 20px;
      width: 100%;
      margin: 10px 0;
    }

    .loading-more,
    .end-message {
      text-align: center;
      padding: 20px;
      color: $text-secondary;
      font-size: 0.9rem;
      letter-spacing: 1px;
      .spark {
        color: $bamboo-green;
        margin: 0 8px;
      }
    }
    .end-message {
      font-style: italic;
      opacity: 0.7;
    }
  }

  /* 底部发送区 */
  .message-form {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    width: calc(100% - 32px);
    max-width: 960px;
    background: rgba(5, 10, 12, 0.6);
    backdrop-filter: blur(2px);
    padding: 16px;
    border-radius: 28px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.7),
      inset 0 1px 0 rgba($blade-silver, 0.1);
    z-index: 6;
    border: 1px solid $card-border;

    input,
    textarea {
      background: rgba(6, 16, 18, 0.7);
      border: 1px solid $card-border;
      border-radius: 20px;
      padding: 12px 16px;
      font-size: 0.9rem;
      color: $text-primary;
      outline: none;
      transition: all 0.2s;
      font-family: inherit;
      resize: none;
      &::placeholder {
        color: rgba($text-primary, 0.35);
      }
      &:focus {
        border-color: $bamboo-green;
        box-shadow: 0 0 10px rgba(46, 143, 116, 0.3);
        background: rgba(6, 20, 20, 0.8);
      }
    }
    textarea {
      min-height: 70px;
      max-height: 200px;
    }

    .form-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      .hint {
        font-size: 0.75rem;
        color: $text-secondary;
        display: flex;
        align-items: center;
        gap: 6px;
        .spark {
          color: $bamboo-green;
        }
        kbd {
          background: rgba(0, 0, 0, 0.5);
          border-radius: 6px;
          padding: 2px 8px;
          font-size: 0.7rem;
          font-family: monospace;
          border: 1px solid $card-border;
          color: $moon-light;
        }
      }
      button {
        background: linear-gradient(135deg, $bamboo-green, $deep-ink);
        border: none;
        padding: 10px 24px;
        border-radius: 40px;
        font-weight: 700;
        color: $text-primary;

        transition: all 0.2s;
        font-family: inherit;
        letter-spacing: 2px;
        box-shadow: 0 4px 15px rgba(46, 143, 116, 0.4);
        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(46, 143, 116, 0.6);
        }
        &:active:not(:disabled) {
          transform: translateY(1px);
        }
        &:disabled {
          opacity: 0.5;
          animation: cursorAnimation_disabled 1s infinite step-start;
        }
      }
    }
  }

  /* 响应式 */
  @media (max-width: 980px) {
    padding-top: 90px;
    .carousel1 {
      display: none;
    }
    .carousel2 {
      display: block;
    }

    .board-header {
      left: 12px;
      transform: none;
      width: calc(100% - 24px);
      padding: 8px 16px;
      .title-wrap {
        .sword-emblem {
          font-size: 22px;
        }
        h1 {
          font-size: 1.4rem;
        }
        .subtitle {
          display: none;
        }
      }
    }

    .message-list {
      padding: 16px 12px 150px;
      .message-card {
        padding: 14px 16px;
        .name-avatar {
          width: 44px;
          height: 44px;
          font-size: 1rem;
        }
        .message-content {
          font-size: 0.85rem;
        }
      }
    }

    .message-form {
      left: 12px;
      transform: none;
      width: calc(100% - 24px);
      padding: 12px;
      .form-row .hint {
        display: none;
      }
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}
</style>
