<template>
  <div class="qiuyuan-wiki">
    <!-- 背景轮播 -->
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

    <!-- 页眉 -->
    <header class="wiki-header">
      <div class="title">
        <h1>琅嬛秘典</h1>
        <p class="subtitle">武林秘籍，尽藏其中 · 仇远 Wiki</p>
      </div>
      <div class="actions">
        <input
          v-model="search"
          class="search"
          placeholder="搜索剑谱或标签..."
        />
        <button class="btn btn-new" @click="openCreate">镌刻新篇</button>
      </div>
    </header>

    <main class="wiki-body">
      <div v-if="filteredEntries.length === 0" class="empty">
        剑匣无痕，尚无匹配的秘典
      </div>

      <ul class="entry-list">
        <li v-for="entry in filteredEntries" :key="entry.id" class="entry-card">
          <div class="entry-head">
            <div class="entry-meta" @click="openDetail(entry)">
              <div class="entry-title-wrap">
                <h2 class="entry-title">{{ entry.title }}</h2>
                <span class="entry-badge">#{{ entry.slug || "未分类" }}</span>
              </div>
              <div class="entry-info">
                <span class="meta-item">撰者：{{ entry.author }}</span>
                <span class="meta-item"
                  >修于：{{ formatTime(entry.updatedAt) }}</span
                >
              </div>
            </div>

            <div class="entry-actions">
              <button
                class="like"
                :class="{ active: isLiked(entry.id) }"
                :aria-pressed="isLiked(entry.id)"
                @click.stop="toggleLike(entry.id)"
              >
                <img
                  :src="
                    isLiked(entry.id)
                      ? '/icons/heart-red-filled.svg'
                      : '/icons/heart-red-outline.svg'
                  "
                  alt="like"
                />
                <span class="like-count">{{ entry.likes }}</span>
              </button>
              <div class="edit-delete" v-if="canEdit(entry.id)">
                <button class="small" @click="openEdit(entry)">修撰</button>
                <button class="small danger" @click="remove(entry.id)">
                  焚毁
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </main>

    <!-- 新建/编辑弹窗 -->
    <transition name="fade-zoom">
      <div class="modal-overlay" v-if="showModal">
        <div class="modal">
          <header class="modal-header">
            <h3>{{ editing ? "修撰秘典" : "镌刻新篇" }}</h3>
            <button class="close" @click="closeModal">✕</button>
          </header>
          <section class="modal-body">
            <label>
              剑谱之名
              <input v-model="form.title" placeholder="输入标题" />
            </label>
            <label>
              分类标签
              <input v-model="form.slug" placeholder="如：彩蛋、AI人设、攻略" />
            </label>
            <label>
              撰者
              <input v-model="form.author" placeholder="作者名号" />
            </label>
            <label>
              秘典正文
              <textarea
                v-model="form.content"
                rows="8"
                placeholder="在此书写秘典内容…"
              ></textarea>
            </label>
          </section>
          <footer class="modal-footer">
            <button class="btn ghost" @click="closeModal">回鞘</button>
            <button class="btn" @click="submit">
              {{ editing ? "存卷" : "入典" }}
            </button>
          </footer>
        </div>
      </div>
    </transition>

    <!-- 详情弹窗 -->
    <transition name="fade-zoom">
      <div class="modal-overlay" v-if="detailEntry">
        <div class="modal detail-modal">
          <header class="modal-header">
            <h3>{{ detailEntry.title }}</h3>
            <button class="close" @click="detailEntry = null">✕</button>
          </header>
          <section class="modal-body">
            <div class="detail-content">{{ detailEntry.content }}</div>
          </section>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import {
  getWikiList,
  createWiki,
  updateWiki,
  deleteWiki,
  likeWiki,
} from "@/api/modules/wiki";

const LS_MY_WIKI_IDS = "qiuyuan_wiki_my_ids";
const myWikiIds: string[] = JSON.parse(
  localStorage.getItem(LS_MY_WIKI_IDS) || "[]"
);
const markAsMine = (id: string | number) => {
  if (!myWikiIds.includes(String(id))) {
    myWikiIds.push(String(id));
    localStorage.setItem(LS_MY_WIKI_IDS, JSON.stringify(myWikiIds));
  }
};
const canEdit = (id: string | number) => myWikiIds.includes(String(id));

const entries = ref<any[]>([]);
const LS_LIKED_IDS = "qiuyuan_wiki_liked_ids";
const likedIds = ref<string[]>(
  JSON.parse(localStorage.getItem(LS_LIKED_IDS) || "[]")
);

const showModal = ref(false);
const editing = ref(false);
const editingId = ref<string | number | null>(null);
const detailEntry = ref<any>(null);
const form = reactive({ title: "", slug: "", author: "", content: "" });
const search = ref("");

function formatTime(ts: string | number | null | undefined) {
  if (!ts) return "未知";
  const date = new Date(ts);
  if (isNaN(date.getTime())) return "未知";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

async function loadEntries() {
  try {
    const res: any = await getWikiList();
    entries.value = res.data.map((e: any) => ({
      ...e,
      createdAt: e.createdAt || e.created_at,
      updatedAt: e.updatedAt || e.updated_at,
    }));
  } catch (err) {
    console.error(err);
    ElMessage.error("加载秘典失败");
  }
}

function openCreate() {
  editing.value = false;
  editingId.value = null;
  form.title = "";
  form.slug = "";
  form.author = "";
  form.content = "";
  showModal.value = true;
}

function openEdit(entry: any) {
  if (!canEdit(entry.id)) {
    ElMessage.warning("仅有撰者可以修撰");
    return;
  }
  editing.value = true;
  editingId.value = entry.id;
  form.title = entry.title;
  form.slug = entry.slug;
  form.author = entry.author;
  form.content = entry.content;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

const canSubmit = computed(() => form.title.trim() && form.content.trim());

async function submit() {
  if (!canSubmit.value) {
    ElMessage.warning("剑谱之名与秘典正文不可为空");
    return;
  }
  const payload: any = {
    title: form.title.trim(),
    author: form.author.trim() || "无名",
    content: form.content.trim(),
  };
  if (form.slug.trim()) payload.slug = form.slug.trim();

  try {
    if (editing.value && editingId.value) {
      await updateWiki(editingId.value, payload);
      ElMessage.success("秘典已修撰");
    } else {
      const res: any = await createWiki(payload);
      markAsMine(res.data.id);
      editingId.value = res.data.id;
      ElMessage.success("秘典已入阁");
    }
    showModal.value = false;
    loadEntries();
  } catch (err) {
    console.error(err);
    ElMessage.error("提交失败");
  }
}

async function remove(id: string | number) {
  if (!canEdit(id)) {
    ElMessage.warning("仅有撰者可以焚毁");
    return;
  }
  if (!confirm("确认焚毁此秘典？此操作不可逆转")) return;
  try {
    await deleteWiki(id);
    const index = myWikiIds.indexOf(String(id));
    if (index !== -1) myWikiIds.splice(index, 1);
    localStorage.setItem(LS_MY_WIKI_IDS, JSON.stringify(myWikiIds));
    ElMessage.success("秘典已焚毁");
    loadEntries();
  } catch (err) {
    console.error(err);
    ElMessage.error("焚毁失败");
  }
}

function persistLikedIds() {
  localStorage.setItem(LS_LIKED_IDS, JSON.stringify(likedIds.value));
}

function isLiked(id: string | number) {
  return likedIds.value.includes(String(id));
}

async function toggleLike(id: string | number) {
  const entry = entries.value.find((e) => e.id === id);
  if (!entry) return;

  const idStr = String(id);
  const wasLiked = likedIds.value.includes(idStr);

  if (wasLiked) {
    entry.likes = Math.max(0, (entry.likes || 0) - 1);
    likedIds.value = likedIds.value.filter((x) => x !== idStr);
  } else {
    entry.likes = (entry.likes || 0) + 1;
    likedIds.value.push(idStr);
  }
  persistLikedIds();

  try {
    const action = wasLiked ? "unlike" : "like";
    await likeWiki(id, action);
  } catch (err) {
    console.error("toggleLike error", err);
    if (wasLiked) {
      entry.likes = (entry.likes || 0) + 1;
      if (!likedIds.value.includes(idStr)) likedIds.value.push(idStr);
    } else {
      entry.likes = Math.max(0, (entry.likes || 0) - 1);
      likedIds.value = likedIds.value.filter((x) => x !== idStr);
    }
    persistLikedIds();
    ElMessage.error("点赞失败，请稍后重试");
  }
}

function openDetail(entry: any) {
  detailEntry.value = entry;
}

const filteredEntries = computed(() => {
  const q = String(search.value || "")
    .trim()
    .toLowerCase();
  let list = entries.value;
  if (q) {
    list = list.filter(
      (e) =>
        (e.title || "").toLowerCase().includes(q) ||
        (e.slug || "").toLowerCase().includes(q)
    );
  }
  return [...list].sort((a, b) => (b.likes || 0) - (a.likes || 0));
});

// 背景轮播
const pcModules = import.meta.glob("@/assets/images1/*.{jpg,png,jpeg,webp}", {
  eager: true,
});
const mobileModules = import.meta.glob(
  "@/assets/images2/*.{jpg,png,jpeg,webp}",
  { eager: true }
);
const pcSrcs: string[] = Object.values(pcModules).map((m: any) => m.default);
const mobileSrcs: string[] = Object.values(mobileModules).map(
  (m: any) => m.default
);

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const randomFive = ref<string[]>([]);
const randomFive2 = ref<string[]>([]);
const currentIndex = ref(0);
let timer: number;

function pickImages() {
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    randomFive2.value = shuffle(mobileSrcs).slice(0, 5);
    randomFive.value = [];
  } else {
    randomFive.value = shuffle(pcSrcs).slice(0, 5);
    randomFive2.value = [];
  }
}

onMounted(() => {
  loadEntries();
  pickImages();
  window.addEventListener("resize", pickImages);
  timer = window.setInterval(() => {
    const active =
      window.innerWidth < 768 ? randomFive2.value : randomFive.value;
    if (active.length > 0) {
      currentIndex.value = (currentIndex.value + 1) % active.length;
    }
  }, 5000);
});

onUnmounted(() => {
  clearInterval(timer);
  window.removeEventListener("resize", pickImages);
});
</script>

<style scoped lang="scss">
/* ========== 仇远色彩变量 ========== */
.qiuyuan-wiki {
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

  min-height: 100vh;
  color: var(--text-primary);
  padding: 16px;
  padding-top: 80px;
  box-sizing: border-box;
  background: var(--night-base);
  font-family: "Noto Serif SC", "STKaiti", "KaiTi", serif;
  position: relative;
  overflow-x: hidden;

  /* 轮播背景 */
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

  /* 页眉 */
  .wiki-header {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: var(--card-bg);
    backdrop-filter: blur(2px);
    border-radius: 16px;
    box-shadow: var(--shadow), inset 0 1px 0 rgba(46, 143, 116, 0.1);
    border: 1px solid var(--card-border);
    flex-wrap: wrap;
    margin-bottom: 20px;

    .title {
      h1 {
        margin: 0;
        font-family: "ZCOOL KuaiLe", "STKaiti", serif;
        font-size: 2rem;
        letter-spacing: 4px;
        background: linear-gradient(135deg, #fff, var(--blade-silver));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 0 20px rgba(46, 143, 116, 0.4);
      }
      .subtitle {
        font-size: 0.9rem;
        color: var(--moon-light);
        letter-spacing: 2px;
        margin-top: 4px;
      }
    }

    .actions {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }

    .search {
      padding: 10px 16px;
      border-radius: 12px;
      border: 1px solid var(--card-border);
      background: rgba(0, 0, 0, 0.3);
      color: var(--text-primary);
      font-size: 0.9rem;
      font-family: inherit;
      outline: none;
      transition: border-color 0.3s, box-shadow 0.3s;
      &::placeholder {
        color: var(--text-secondary);
        opacity: 0.6;
      }
      &:focus {
        border-color: var(--bamboo-green);
        box-shadow: 0 0 12px rgba(46, 143, 116, 0.3);
      }
    }

    .btn-new {
      background: linear-gradient(135deg, var(--bamboo-green), var(--deep-ink));
      color: #fff;
      border: 1px solid var(--blade-silver);
      border-radius: 12px;
      padding: 10px 22px;
      font-size: 0.95rem;
      font-family: "ZCOOL KuaiLe", "STKaiti", serif;
      font-weight: 600;
      letter-spacing: 2px;
      cursor: pointer;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4),
        0 0 10px rgba(46, 143, 116, 0.3);
      transition: all 0.3s ease;
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 28px rgba(46, 143, 116, 0.5);
      }
    }
  }

  /* 列表 */
  .wiki-body {
    position: relative;
    z-index: 2;
    .empty {
      text-align: center;
      padding: 60px 16px;
      color: var(--text-secondary);
      font-style: italic;
      letter-spacing: 2px;
      font-size: 1.1rem;
    }
  }

  .entry-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 16px;

    .entry-card {
      background: var(--card-bg);
      backdrop-filter: blur(1px);
      border-radius: 14px;
      padding: 16px 20px;
      border: 1px solid var(--card-border);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
      transition: all 0.3s ease;
      &:hover {
        border-color: var(--bamboo-green);
        transform: translateY(-3px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6),
          0 0 16px rgba(46, 143, 116, 0.2);
      }

      .entry-head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
        flex-wrap: wrap;

        .entry-meta {
          flex: 1;
          cursor: pointer;
          .entry-title-wrap {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
          }
          .entry-title {
            font-size: 1.2rem;
            margin: 0;
            color: var(--blade-silver);
            font-weight: 700;
            letter-spacing: 1px;
          }
          .entry-badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 20px;
            background: rgba(46, 143, 116, 0.2);
            color: var(--moon-light);
            font-size: 0.75rem;
            border: 1px solid var(--card-border);
          }
          .entry-info {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            .meta-item {
              font-size: 0.8rem;
              color: var(--text-secondary);
              padding: 2px 8px;
              background: rgba(46, 143, 116, 0.08);
              border-radius: 6px;
            }
          }
        }

        .entry-actions {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;

          .like {
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 10px;
            transition: all 0.2s;
            img {
              width: 20px;
              height: 20px;
              filter: drop-shadow(0 0 4px var(--bamboo-green));
            }
            .like-count {
              font-size: 0.9rem;
              color: var(--text-primary);
              font-weight: 600;
            }
            &.active {
              background: rgba(46, 143, 116, 0.15);
            }
          }

          .edit-delete {
            display: flex;
            gap: 6px;
          }

          .small {
            padding: 6px 12px;
            border-radius: 8px;
            background: rgba(46, 143, 116, 0.1);
            border: 1px solid var(--card-border);
            color: var(--text-primary);
            font-family: inherit;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.2s;
            &:hover {
              background: rgba(46, 143, 116, 0.2);
              border-color: var(--bamboo-green);
            }
          }
          .danger {
            color: #ff7b7b;
            border-color: rgba(255, 100, 100, 0.15);
            &:hover {
              background: rgba(255, 100, 100, 0.1);
              border-color: rgba(255, 100, 100, 0.3);
            }
          }
        }
      }
    }
  }

  /* 弹窗 */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(5, 10, 12, 0.85);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 20px;

    .modal {
      width: min(720px, 94%);
      max-height: 90vh;
      overflow-y: auto;
      background: rgba(6, 16, 18, 0.95);
      border-radius: 18px;
      padding: 20px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
      border: 1px solid var(--card-border);

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--card-border);
        h3 {
          margin: 0;
          font-family: "ZCOOL KuaiLe", serif;
          color: var(--blade-silver);
          letter-spacing: 2px;
        }
        .close {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.2rem;
          cursor: pointer;
          &:hover {
            color: var(--blade-silver);
          }
        }
      }

      .modal-body {
        display: flex;
        flex-direction: column;
        gap: 14px;
        .detail-content {
          white-space: pre-wrap;
          line-height: 1.8;
        }
        label {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.9rem;
          color: var(--text-secondary);
          input,
          textarea {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid var(--card-border);
            border-radius: 10px;
            padding: 10px 14px;
            color: var(--text-primary);
            font-family: inherit;
            font-size: 0.95rem;
            outline: none;
            transition: border-color 0.3s;
            &::placeholder {
              color: var(--text-secondary);
              opacity: 0.5;
            }
            &:focus {
              border-color: var(--bamboo-green);
              box-shadow: 0 0 8px rgba(46, 143, 116, 0.3);
            }
          }
          textarea {
            resize: vertical;
          }
        }
      }

      .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        margin-top: 20px;
        padding-top: 16px;
        border-top: 1px solid var(--card-border);
        .btn {
          background: linear-gradient(
            135deg,
            var(--bamboo-green),
            var(--deep-ink)
          );
          color: #fff;
          padding: 10px 24px;
          border-radius: 12px;
          border: none;
          font-family: "ZCOOL KuaiLe", serif;
          font-weight: 600;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(46, 143, 116, 0.4);
          }
        }
        .btn.ghost {
          background: transparent;
          border: 1px solid var(--card-border);
          color: var(--text-secondary);
          &:hover {
            border-color: var(--blade-silver);
            color: var(--text-primary);
          }
        }
      }
    }
  }

  /* 过渡动画 */
  .fade-zoom-enter-active,
  .fade-zoom-leave-active {
    transition: all 0.3s ease;
  }
  .fade-zoom-enter-from,
  .fade-zoom-leave-to {
    opacity: 0;
    transform: scale(0.96);
  }

  /* 移动端适配 */
  @media (max-width: 768px) {
    .carousel1 {
      display: none;
    }
    .carousel2 {
      display: block;
    }

    .wiki-header {
      flex-direction: column;
      align-items: stretch;
      .title h1 {
        font-size: 1.6rem;
      }
    }
  }
}
</style>
