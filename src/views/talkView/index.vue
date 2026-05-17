<template>
  <div class="qiuyuan-chat">
    <!-- 背景轮播（保留） -->
    <div class="carousel carousel1" aria-hidden="true">
      <img
        v-for="(src, idx) in randomFive"
        :key="idx"
        :src="src"
        class="carousel-image"
        :class="{ active: idx === currentIndex }"
      />
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

    <!-- 竹影纹理叠加层 -->
    <div class="bg-overlay"></div>

    <div class="chat-container">
      <!-- 统计面板：竹林卷宗风格 -->
      <div class="stats-panel">
        <div class="stats-header">
          <span class="stats-title">江湖低语</span>
        </div>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">总对话</span>
            <span class="stat-value">{{ stats.totalChats }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">初遇</span>
            <span class="stat-value">{{
              new Date(stats.firstTimestamp).toISOString().slice(0, 10)
            }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">活跃日</span>
            <span class="stat-value">{{ stats.activeDates.length }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">今日</span>
            <span class="stat-value">{{
              stats.dailyChats[new Date().toISOString().slice(0, 10)] || 0
            }}</span>
          </div>
        </div>
        <div class="panel-buttons">
          <button class="detail-btn" @click="showModal = true">卷宗详情</button>
          <button class="settings-btn" @click="showSettingsModal = true">
            剑意调校
          </button>
        </div>
      </div>

      <!-- 对话消息区 -->
      <div class="messages" ref="msgList">
        <transition-group name="msg" tag="div">
          <div
            v-for="msg in chatLog"
            :key="msg.id"
            :class="[
              'message',
              msg.role,
              { error: msg.isError, egg: msg.isEgg },
            ]"
          >
            <div class="avatar" :class="msg.role"></div>
            <div class="bubble">
              <div class="content" v-html="msg.text"></div>
            </div>
          </div>
          <div v-if="loading" class="message bot" key="loading">
            <div class="avatar bot"></div>
            <div class="bubble loading">
              <span class="loading-text">剑意凝神中</span>
              <span class="dots">
                <span class="dot">.</span>
                <span class="dot">.</span>
                <span class="dot">.</span>
              </span>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- 输入区：竹匣传书样式 -->
      <form class="input-area" @submit.prevent="sendMessage">
        <textarea
          v-model="input"
          placeholder="向仇远提问…"
          :disabled="loading"
          @keydown="handleKeydown"
          rows="1"
        ></textarea>

        <div class="input-actions">
          <button
            type="button"
            class="clear-btn"
            @click="clearChat"
            :disabled="loading"
            title="拂去尘埃"
          >
            拂尘
          </button>

          <button
            type="submit"
            class="send-btn"
            :disabled="!input.trim() || loading"
          >
            <span v-if="!loading">青锋传音</span>
            <span v-else>传音中</span>
          </button>
        </div>
      </form>
    </div>

    <!-- 详细统计弹窗 -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>江湖卷宗</h3>
          <div class="header-line"></div>
        </div>
        <ul class="detail-list">
          <li>
            <span class="detail-label">总对话次数</span>
            <span class="detail-value">{{ stats.totalChats }}</span>
          </li>
          <li>
            <span class="detail-label">初次相遇</span>
            <span class="detail-value">{{
              new Date(stats.firstTimestamp).toISOString().slice(0, 10)
            }}</span>
          </li>
          <li>
            <span class="detail-label">活跃天数</span>
            <span class="detail-value">{{ stats.activeDates.length }} 天</span>
          </li>
          <li>
            <span class="detail-label">今日低语</span>
            <span class="detail-value"
              >{{
                stats.dailyChats[new Date().toISOString().slice(0, 10)] || 0
              }}
              次</span
            >
          </li>
          <li>
            <span class="detail-label">相伴时长</span>
            <span class="detail-value">{{
              formatDuration(stats.totalTime)
            }}</span>
          </li>
          <li>
            <span class="detail-label">当前连语</span>
            <span class="detail-value">{{ stats.currentStreak }} 天</span>
          </li>
          <li>
            <span class="detail-label">最长连语</span>
            <span class="detail-value">{{ stats.longestStreak }} 天</span>
          </li>
          <li>
            <span class="detail-label">最密对话日</span>
            <span class="detail-value"
              >{{ mostActiveDayComputed }}（{{
                stats.dailyChats[mostActiveDayComputed] || 0
              }}次）</span
            >
          </li>
        </ul>
        <button class="close-btn" @click="showModal = false">收起卷宗</button>
      </div>
    </div>

    <!-- 设定弹窗 -->
    <div
      v-if="showSettingsModal"
      class="modal-overlay"
      @click.self="showSettingsModal = false"
    >
      <div class="modal-content settings-modal">
        <div class="modal-header">
          <h3>剑意调校</h3>
          <div class="header-line"></div>
        </div>
        <div class="settings-form">
          <div class="setting-item">
            <label>额外密语 <span class="optional">（临时覆盖）</span></label>
            <textarea
              v-model="tempAdditionalPrompt"
              placeholder="例如：与你对话的人是XXX、你和ta的关系是XXX……"
              rows="3"
              maxlength="200"
            ></textarea>
            <div class="char-counter">
              {{ tempAdditionalPrompt.length }} / 200 字
            </div>
          </div>

          <div class="setting-item">
            <label>剑意温度 <span class="optional">（创造性）</span></label>
            <div class="temperature-control">
              <input
                type="range"
                v-model.number="tempTemperature"
                min="0.1"
                max="1.9"
                step="0.05"
              />
              <span class="temp-value">{{ tempTemperature.toFixed(2) }}</span>
            </div>
            <div class="hint">
              温度越高（近2），回应越天马行空；<br />
              温度越低（近0），回应越沉稳持重。建议0.5~1.2。
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="cancel-btn" @click="showSettingsModal = false">
            回鞘
          </button>
          <button class="save-btn" @click="saveSettings">剑意入定</button>
        </div>
      </div>
    </div>

    <!-- floating-chibis -->
    <div class="floating-chibis">
      <img
        v-for="(pet, i) in chibiList"
        :key="i"
        :src="pet.src"
        :style="{ top: pet.top + 'px', left: pet.left + 'px' }"
        class="chibi-img"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  ref,
  computed,
  onMounted,
  nextTick,
  watch,
  onBeforeUnmount,
} from "vue";
import { sendMessageToHui } from "@/api/deepseekApi";
import gsap from "gsap";

const STORAGE_KEY = "qiuyuan_chat_log";
const STORAGE_STATS_KEY = "qiuyuan_chat_stats";
const STORAGE_SETTINGS_KEY = "qiuyuan_chat_settings";

interface Stats {
  firstTimestamp: number;
  totalChats: number;
  activeDates: string[];
  dailyChats: Record<string, number>;
  currentStreak: number;
  longestStreak: number;
  totalTime: number;
}

const defaultStats: Stats = {
  firstTimestamp: Date.now(),
  totalChats: 0,
  activeDates: [],
  dailyChats: {},
  currentStreak: 0,
  longestStreak: 0,
  totalTime: 0,
};

function loadStats(): Stats {
  const saved = localStorage.getItem(STORAGE_STATS_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return { ...defaultStats, ...parsed };
    } catch {
      /* ignore */
    }
  }
  return { ...defaultStats };
}

function saveStats() {
  localStorage.setItem(STORAGE_STATS_KEY, JSON.stringify(stats));
}

function updateActive(date: string) {
  if (!stats.activeDates.includes(date)) {
    stats.activeDates.push(date);
    updateStreak();
    saveStats();
  }
}

function updateStreak() {
  const dates = [...stats.activeDates].sort();
  let curr = 0,
    max = stats.longestStreak,
    prevTs = 0;
  const todayStr = new Date().toISOString().slice(0, 10);
  dates.forEach((d) => {
    const ts = new Date(d).getTime();
    if (prevTs && ts - prevTs === 86400000) curr++;
    else curr = 1;
    max = Math.max(max, curr);
    prevTs = ts;
  });
  stats.currentStreak = dates[dates.length - 1] === todayStr ? curr : 0;
  stats.longestStreak = max;
  saveStats();
}

function updateDaily(date: string) {
  stats.dailyChats[date] = (stats.dailyChats[date] || 0) + 1;
  saveStats();
}

const mostActiveDayComputed = computed(() => {
  let day = "",
    max = 0;
  for (const [d, c] of Object.entries(stats.dailyChats)) {
    if (c > max) {
      max = c;
      day = d;
    }
  }
  return day || new Date().toISOString().slice(0, 10);
});

function formatDuration(ms: number): string {
  const totalMin = Math.floor(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h ? `${h} 时辰 ${m} 分` : `${m} 分`;
}

const stats = reactive<Stats>(loadStats());
const sessionStart = Date.now();

interface ChatMsg {
  id: number;
  role: "user" | "bot";
  text: string;
  isError?: boolean;
  isEgg?: boolean;
}

const chatLog = ref<ChatMsg[]>(loadChatLog());
const input = ref("");
const loading = ref(false);
const msgList = ref<HTMLElement>();

const showModal = ref(false);
const showSettingsModal = ref(false);
const tempAdditionalPrompt = ref("");
const tempTemperature = ref(0.7);
const currentAdditionalPrompt = ref("");
const currentTemperature = ref(0.7);

function loadSettings() {
  const saved = localStorage.getItem(STORAGE_SETTINGS_KEY);
  if (saved) {
    try {
      const settings = JSON.parse(saved);
      currentAdditionalPrompt.value = settings.additionalPrompt || "";
      currentTemperature.value = settings.temperature ?? 0.7;
      tempAdditionalPrompt.value = currentAdditionalPrompt.value;
      tempTemperature.value = currentTemperature.value;
    } catch {
      /* ignore */
    }
  }
}

function saveSettings() {
  if (tempAdditionalPrompt.value.length > 200) {
    alert("密语不可超过200字");
    return;
  }
  currentAdditionalPrompt.value = tempAdditionalPrompt.value;
  currentTemperature.value = tempTemperature.value;
  localStorage.setItem(
    STORAGE_SETTINGS_KEY,
    JSON.stringify({
      additionalPrompt: currentAdditionalPrompt.value,
      temperature: currentTemperature.value,
    })
  );
  showSettingsModal.value = false;
}

async function sendMessage() {
  if (!input.value.trim()) return;
  if (stats.totalChats === 0 && !localStorage.getItem(STORAGE_STATS_KEY)) {
    stats.firstTimestamp = Date.now();
    saveStats();
  }
  const date = new Date().toISOString().slice(0, 10);
  stats.totalChats++;
  updateActive(date);
  updateDaily(date);
  saveStats();

  const userText = input.value;
  chatLog.value.push({ id: Date.now(), role: "user", text: userText });
  input.value = "";
  loading.value = true;

  try {
    const history = chatLog.value.filter((msg) => !msg.isEgg && !msg.isError);
    const options: any = { character: "qiuyuan" };
    if (currentAdditionalPrompt.value?.trim()) {
      options.additionalPrompt = currentAdditionalPrompt.value.trim();
    }
    if (
      currentTemperature.value !== undefined &&
      currentTemperature.value !== null
    ) {
      options.temperature = currentTemperature.value;
    }
    const botReply = await sendMessageToHui(userText, history, options);
    if (botReply === "error") {
      chatLog.value.push({
        id: Date.now() + 2,
        role: "bot",
        text: "剑意已尽，请在B站提醒我补充内力。",
        isError: true,
      });
    } else {
      chatLog.value.push({ id: Date.now() + 1, role: "bot", text: botReply });
    }
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
    await scrollToBottom();
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Enter") sendMessage();
}

function clearChat() {
  if (confirm("确定拂去所有对话吗？")) {
    chatLog.value = [
      {
        id: Date.now(),
        role: "bot",
        text: "竹林风起，我于此地听你诉说。",
      },
    ];
    localStorage.removeItem(STORAGE_KEY);
  }
}

function loadChatLog(): ChatMsg[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      /* ignore */
    }
  }
  return [
    {
      id: Date.now(),
      role: "bot",
      text: "竹林风起，我于此地听你诉说。",
    },
  ];
}

async function scrollToBottom() {
  await nextTick();
  if (msgList.value) {
    msgList.value.scrollTop = msgList.value.scrollHeight;
  }
}

watch(
  chatLog,
  async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chatLog.value));
    await scrollToBottom();
  },
  { deep: true }
);

function handleBeforeUnload() {
  stats.totalTime += Date.now() - sessionStart;
  saveStats();
}

// 轮播 & 小人
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

interface Chibi {
  src: string;
  top: number;
  left: number;
}
const chibiList = ref<Chibi[]>([]);

onMounted(async () => {
  scrollToBottom();
  window.addEventListener("beforeunload", handleBeforeUnload);
  Imgtimer = window.setInterval(() => {
    currentIndex.value =
      (currentIndex.value + 1) % Math.max(1, randomFive.value.length);
  }, 5200);

  loadSettings();

  const total = 8;
  const isMobile = window.innerWidth <= 768;
  const pickCount = isMobile ? 1 : 3;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const imgWidth = 100,
    imgHeight = 100;

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
  window.removeEventListener("beforeunload", handleBeforeUnload);
  if (Imgtimer) clearInterval(Imgtimer);
});
</script>

<style scoped lang="scss">
.qiuyuan-chat {
  --bamboo-green: #2e8f74;
  --blade-silver: #cfeee8;
  --moon-light: #b4e6e2;
  --deep-ink: #0b1a16;
  --night-base: #050a0c;
  --text-primary: #f0faf8;
  --text-secondary: rgba(207, 238, 232, 0.7);
  --card-bg: rgba(5, 10, 12, 0.6);
  --card-border: rgba(46, 143, 116, 0.2);
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  position: relative;
  min-height: 100vh;

  font-family: "Noto Serif SC", "STKaiti", "KaiTi", serif;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  background: var(--night-base);
  overflow-x: hidden;

  .carousel {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    .carousel-image {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 1.2s ease;
      filter: brightness(0.8) saturate(0.7);
      &.active {
        opacity: 1;
      }
    }
    .carousel-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(
          circle at 30% 40%,
          rgba(6, 16, 18, 0.2),
          rgba(5, 10, 12, 0.45)
        ),
        repeating-linear-gradient(
          90deg,
          transparent 0px,
          rgba(46, 143, 116, 0.02) 2px,
          transparent 4px
        );
      z-index: 1;
    }
  }
  .carousel2 {
    display: none;
  }

  .bg-overlay {
    position: fixed;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: repeating-linear-gradient(
        0deg,
        transparent 0 38px,
        rgba(46, 143, 116, 0.02) 38px 40px
      ),
      repeating-linear-gradient(
        90deg,
        transparent 0 2px,
        rgba(46, 143, 116, 0.015) 2px 4px
      ),
      radial-gradient(
        ellipse at 50% 30%,
        transparent 40%,
        rgba(5, 10, 12, 0.6) 100%
      );
  }

  .chat-container {
    position: relative;
    z-index: 10;
    flex: 1;
    width: 920px;
    max-width: calc(100% - 32px);
    margin: 0 auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .stats-panel {
    background: var(--card-bg);
    backdrop-filter: blur(16px);
    border-radius: 18px;
    padding: 18px 24px;
    border: 1px solid var(--card-border);
    box-shadow: var(--shadow), inset 0 1px 0 rgba(46, 143, 116, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .stats-header .stats-title {
      font-family: "ZCOOL KuaiLe", serif;
      font-size: 1.4rem;
      color: var(--blade-silver);
      letter-spacing: 3px;
      text-shadow: 0 0 10px rgba(46, 143, 116, 0.5);
    }
    .stats-grid {
      display: flex;
      gap: 28px;
      .stat-item {
        text-align: center;
        .stat-label {
          display: block;
          font-size: 0.7rem;
          color: var(--text-secondary);
          letter-spacing: 2px;
        }
        .stat-value {
          display: block;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--bamboo-green);
          text-shadow: 0 0 6px rgba(46, 143, 116, 0.4);
        }
      }
    }
    .panel-buttons {
      display: flex;
      gap: 10px;
      button {
        background: rgba(46, 143, 116, 0.1);
        border: 1px solid var(--card-border);
        border-radius: 24px;
        padding: 8px 18px;
        color: var(--blade-silver);
        font-family: inherit;
        letter-spacing: 1px;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          background: rgba(46, 143, 116, 0.25);
          border-color: var(--bamboo-green);
          transform: translateY(-2px);
          box-shadow: 0 0 12px rgba(46, 143, 116, 0.3);
        }
      }
    }
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 12px 0 20px;
    max-height: calc(100vh - 240px);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .message {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    &.user {
      flex-direction: row-reverse;
    }
    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background-size: cover;
      background-position: center;
      flex-shrink: 0;

      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
      &.bot {
        background-image: url("@/assets/avatar/changli.png");
        border-color: var(--bamboo-green);
        transform: scaleX(-1);
      }
      &.user {
        background: linear-gradient(
          135deg,
          var(--bamboo-green),
          var(--deep-ink)
        );
        border-color: var(--blade-silver);
      }
    }
    .bubble {
      max-width: 75%;
      padding: 16px 20px;
      background: rgba(6, 16, 18, 0.7);
      backdrop-filter: blur(12px);
      border: 1px solid var(--card-border);
      border-radius: 18px;
      line-height: 1.7;
      word-break: break-word;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      .message.user & {
        border-right: 3px solid var(--blade-silver);
        border-radius: 18px 6px 18px 18px;
      }
      .message.bot & {
        border-left: 3px solid var(--bamboo-green);
        border-radius: 6px 18px 18px 18px;
      }
      &.error {
        border-color: #c94a3a;
        background: rgba(201, 74, 58, 0.1);
      }
      .content {
        color: var(--text-primary);
        font-size: 0.95rem;
      }
    }
  }

  .input-area {
    background: var(--card-bg);
    backdrop-filter: blur(16px);
    border-radius: 20px;
    padding: 16px 20px;
    border: 1px solid var(--card-border);
    box-shadow: var(--shadow);
    display: flex;
    align-items: flex-end;
    gap: 16px;
    textarea {
      flex: 1;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 14px 18px;
      color: var(--text-primary);
      font-size: 0.95rem;
      line-height: 1.5;
      outline: none;
      resize: none;
      min-height: 56px;
      max-height: 150px;
      font-family: inherit;
      &::placeholder {
        color: var(--text-secondary);
        opacity: 0.6;
      }
      &:focus {
        border-color: var(--bamboo-green);
        box-shadow: 0 0 12px rgba(46, 143, 116, 0.3);
      }
    }
    .input-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      .clear-btn {
        background: transparent;
        border: 1px solid var(--card-border);
        border-radius: 14px;
        padding: 8px 14px;
        color: var(--text-secondary);
        cursor: pointer;
        font-family: inherit;
        transition: all 0.2s;
        &:hover {
          border-color: var(--bamboo-green);
          color: var(--blade-silver);
        }
      }
      .send-btn {
        padding: 0 28px;
        height: 44px;
        background: linear-gradient(
          135deg,
          var(--bamboo-green),
          var(--deep-ink)
        );
        border: none;
        border-radius: 14px;
        font-weight: 700;
        color: #fff;
        cursor: pointer;
        font-family: "ZCOOL KuaiLe", serif;
        letter-spacing: 2px;
        transition: all 0.3s;
        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(46, 143, 116, 0.5);
        }
        &:disabled {
          opacity: 0.5;
          animation: cursorAnimation_disabled 1s infinite step-start;
        }
      }
    }
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(5, 10, 12, 0.85);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    .modal-content {
      width: 480px;
      max-width: 100%;
      background: rgba(6, 16, 18, 0.95);
      border: 1px solid var(--card-border);
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
      padding: 28px;
      .modal-header {
        margin-bottom: 20px;
        h3 {
          font-family: "ZCOOL KuaiLe", serif;
          color: var(--blade-silver);
          letter-spacing: 3px;
          margin: 0 0 10px;
        }
        .header-line {
          width: 60px;
          height: 2px;
          background: var(--bamboo-green);
          box-shadow: 0 0 8px var(--bamboo-green);
        }
      }
    }
  }

  .detail-list {
    list-style: none;
    padding: 0;
    margin: 0 0 24px;
    li {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px dashed var(--card-border);
      .detail-label {
        color: var(--text-secondary);
      }
      .detail-value {
        color: var(--bamboo-green);
        font-weight: 600;
      }
    }
  }

  .settings-modal .settings-form {
    margin-bottom: 24px;
    .setting-item {
      margin-bottom: 24px;
      label {
        display: block;
        font-weight: 600;
        color: var(--blade-silver);
        margin-bottom: 8px;
        .optional {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: normal;
        }
      }
      textarea {
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid var(--card-border);
        border-radius: 12px;
        padding: 12px;
        color: var(--text-primary);
        font-family: inherit;
        resize: vertical;
        &:focus {
          border-color: var(--bamboo-green);
          outline: none;
        }
      }
      .char-counter {
        text-align: right;
        font-size: 0.75rem;
        color: var(--text-secondary);
        margin-top: 4px;
      }
      .temperature-control {
        display: flex;
        align-items: center;
        gap: 16px;
        input {
          flex: 1;
          height: 6px;
          -webkit-appearance: none;
          background: var(--text-secondary);
          border-radius: 3px;
          outline: none;
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 18px;
            height: 18px;
            background: var(--bamboo-green);
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 8px var(--bamboo-green);
          }
        }
        .temp-value {
          min-width: 40px;
          text-align: center;
          font-weight: 700;
          color: var(--bamboo-green);
        }
      }
      .hint {
        font-size: 0.75rem;
        color: var(--text-secondary);
        margin-top: 8px;
        line-height: 1.4;
      }
    }
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    button {
      padding: 10px 24px;
      border-radius: 24px;
      font-family: inherit;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }
    .cancel-btn {
      background: rgba(46, 143, 116, 0.1);
      color: var(--text-secondary);
      border: 1px solid var(--card-border);
      &:hover {
        background: rgba(46, 143, 116, 0.2);
        color: var(--text-primary);
      }
    }
    .save-btn {
      background: linear-gradient(135deg, var(--bamboo-green), var(--deep-ink));
      color: #fff;
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(46, 143, 116, 0.4);
      }
    }
  }

  .close-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, var(--bamboo-green), var(--deep-ink));
    border: none;
    border-radius: 14px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s;
    font-family: "ZCOOL KuaiLe", serif;
    letter-spacing: 2px;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(46, 143, 116, 0.4);
    }
  }

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

  .msg-enter-active,
  .msg-leave-active {
    transition: all 0.3s ease;
  }
  .msg-enter-from {
    opacity: 0;
    transform: translateY(10px);
  }
  .msg-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  @media (max-width: 768px) {
    .carousel1 {
      display: none;
    }
    .carousel2 {
      display: block;
    }
    .stats-panel {
      .stats-grid {
        display: none;
      }
      .panel-buttons button {
        padding: 6px 12px;
        font-size: 0.8rem;
      }
    }
    .input-area {
      flex-direction: column;
      textarea {
        width: 100%;
      }
    }
    .message .bubble {
      max-width: 85%;
    }
    .modal-content {
      width: 90%;
    }
  }
}
</style>
