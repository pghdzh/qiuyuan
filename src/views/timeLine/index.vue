<template>
  <div class="megumi-page" aria-live="polite">
    <!-- 动态氛围背景 -->
    <div class="bg-atmosphere">
      <!-- 月光层（双层月晕） -->
      <div class="moon-main"></div>
      <div class="moon-sub"></div>

      <!-- 流萤（六只） -->
      <div class="firefly firefly-1"></div>
      <div class="firefly firefly-2"></div>
      <div class="firefly firefly-3"></div>
      <div class="firefly firefly-4"></div>
      <div class="firefly firefly-5"></div>
      <div class="firefly firefly-6"></div>

      <!-- 剑气流光（三道不同角度与速度） -->
      <div class="sword-light sword-light-1"></div>
      <div class="sword-light sword-light-2"></div>
      <div class="sword-light sword-light-3"></div>

      <!-- 墨滴涟漪 -->
      <div class="ink-drop ink-drop-1"></div>
      <div class="ink-drop ink-drop-2"></div>

      <!-- 斗笠剪影 -->
      <div class="hat-silhouette"></div>

      <!-- 细密雨丝 -->
      <div class="rain"></div>

      <!-- 地面雾气 -->
      <div class="mist"></div>
    </div>

    <main class="container" ref="mainContainer">
      <!-- HERO 区域 -->
      <header class="hero" role="banner">
        <div class="left-col">
          <div class="avatar-card">
            <div class="avatar-wrap">
              <img
                src="@/assets/images1/qiuyuan-slty (17).webp"
                class="avatar"
                alt="仇远"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="avatar-meta">
              <span class="avatar-badge">共鸣能力：藏锋于竹</span>
            </div>
          </div>
        </div>

        <div class="right-col" ref="metaCard">
          <div class="hero-panel">
            <h1 class="name">
              仇远
              <span class="jp">（前明庭镇抚司千户，双眼失明的独行剑客）</span>
            </h1>
            <p class="subtitle">
              布衣之侠不求冠绝江湖、高居庙堂，但求手中之剑百折不摧，挥之有道。
            </p>
            <p class="lead">
              少时仇人无算，长时办差拿人，谁料蒙冤下狱，如今浪迹天涯。
            </p>
          </div>
        </div>
      </header>

      <!-- 内容卡片区 -->
      <section id="personality" class="card personality">
        <div class="card-head">
          <h2> 核心机制</h2>
        </div>
        <ul class="traits">
          <li>
            仇远施放普攻第三段、闪避反击时，获取【挑灯问剑】。达到200/400/600点分别解锁答剑·质黑相青/【竹照】/【淋漓醉墨】状态。
          </li>
          <li>
            【淋漓醉墨】状态下，仇远无法获得【挑灯问剑】，但可消耗点数施放技能造成更多伤害。
          </li>
          <li style="font-weight: bold">输出流程：</li>
          <li>基础流程：Q-E-R-AA-Z</li>
          <li>
            技能缩写：普攻 = A，重击 = Z，共鸣技能 = E，共鸣解放 = R，声骸 = Q
          </li>
        </ul>
      </section>

      <section id="resonance-status" class="card resonance-overview">
        <!-- 顶部光晕装饰条 -->
        <div class="card-head">
          <h2>共鸣状况</h2>
          <span class="head-line"></span>
        </div>

        <!-- 主体双栏布局 -->
        <div class="two-col">
          <div class="text-block">
            <!-- 频谱检验报告 -->
            <article class="report-section">
              <h3 class="report-title">频谱检验报告</h3>
              <div class="report-meta">明庭谛天鉴监正杂录 — 书信编</div>

              <p class="report-content">
                <span class="highlight">东园兄台钧鉴</span
                >，前日镇抚司转三法司并华胥研究院行文谛天鉴，弟便立刻责成重州州监协办，清点重州共鸣者名录，现已查明此人和重州岁主鸣式并无关联。
              </p>
              <p class="report-content">
                据谛天鉴查，此人共鸣史距今十五年有余，即所谓<span
                  class="emphasis"
                  >“成竹于胸，裁竹为锋”</span
                >，虽双眼不能视物，却有<span class="emphasis">“心镜”</span
                >，能透过心中具象化的“竹林”感知到外界的事物，勘破对手的心境和破绽，甚至能将“心镜”外化成虚景，不容小觑。
              </p>
              <p class="report-content">
                另外，他的剑术似乎更源自于他自身的技艺而非来自于共鸣能力，能很明显地感觉到，他无时无刻不在克制着自己的共鸣能力。据他自己说，那随身的竹壶中装着一种能够催动他“心镜”和共鸣力的药液，据说是重州一位江湖郎中所配，只在必要时才会饮用。关于此事，兄可另行转交研究院解析其成分。
              </p>
              <p class="report-content">
                至于此人详细的测试数据，兄可静候研究院报告……
              </p>
              <div class="postscript">
                <span>——东园注：</span
                >正式报告登记明白就好，一切都以谛天鉴的意思为准……哎，老林他还是这么说话文绉绉的。
              </div>
            </article>

            <!-- 分割光带 -->
            <div class="divider-light"></div>

            <!-- 超频诊断报告 -->
            <article class="report-section">
              <h3 class="report-title">超频诊断报告</h3>
              <div class="report-meta">明庭谛天鉴监正杂录 — 书信编</div>

              <p class="report-content">
                ……数日以来，以弟观之，与其说他不使用共鸣能力，不如说他始终刻意制压自己不去使用它。而关于这能力本身，他自己三缄其口，只能从研究院的报告中略窥一二：
              </p>
              <ul class="diagnosis-list">
                <li>
                  受试人员波形检测呈现椭圆形波动，时域表示稳定，未见异常波形。
                </li>
                <li>
                  当前超频临界值<span class="emphasis">极高</span
                  >，稳定性高，无超频风险。
                </li>
                <li>无过往超频史，无需心理辅导……</li>
              </ul>
              <p class="report-content">
                备注：受试人员自述曾多有犯案，以武犯禁，而语气极为平静，建议刑部并重州地方查明。
              </p>
              <p class="report-content">
                ……然而我看此人似无杀意，镇浮沉静，而其剑术之高超，遍观明庭，少有敌手，可为镇抚司栋梁。竟有三法司案卷所载以武犯禁情事，实难置信。弟已秉呈礼部，陈明利害，东园兄若用此人，想必于礼部处并无大碍。
              </p>
              <div class="postscript">
                <span>——东园注：</span
                >超频这种事，自然是越稳定越好，不过这报告看着，是不是有点太波澜不惊了……
              </div>
            </article>
          </div>
        </div>

        <!-- 背景动态光点（纯装饰） -->
        <div class="bg-spark spark-1"></div>
        <div class="bg-spark spark-2"></div>
      </section>
      <!-- 杯中物 -->
      <section id="food" class="card special-section qiuyuan-item item-cup">
        <div class="card-head">
          <h2>杯中物</h2>
          <span class="head-line"></span>
        </div>
        <div class="content two-col">
          <div class="img-area">
            <div class="img-frame">
              <img
                src="./img/item1.png"
                loading="lazy"
                decoding="async"
                alt="竹筒"
              />
            </div>
          </div>
          <div class="text-block">
            <p>
              仇远随身携带的竹筒，由重州特有的黑竹制作，不过似乎是因为常年装着药液的缘由，已经闻不到原本应有的竹香，只有浓重的药香。
            </p>
            <p>
              那位重州的郎中下猛药将他从阎王手里勾回，他也因此落下共鸣力微弱的病根，必须服用这种特殊的药液才能全然使出自己的力量，只不过对他来说，那力量也不过是他引以为傲的剑技的添头罢了。
            </p>
          </div>
        </div>
        <div class="card-ambient ambient-left"></div>
      </section>

      <!-- 铁中剑 -->
      <section
        id="shattered-crystal"
        class="card special-section qiuyuan-item item-sword"
      >
        <div class="card-head">
          <h2>铁中剑</h2>
          <span class="head-line"></span>
        </div>
        <div class="content two-col">
          <div class="img-area">
            <div class="img-frame">
              <img
                src="./img/item2.png"
                loading="lazy"
                decoding="async"
                alt="信物"
              />
            </div>
          </div>
          <div class="text-block">
            <p>
              仇远平日佩戴的明庭镇抚司信物，按理他早就应该褪下这身公服，信物也应被没收。只是似乎因为有人在明庭暗中帮了他一把，最终让他留下了这一切。
            </p>
            <p class="sword-quote">
              “……我将剑交到你们手中，百官各州，凡见此物，如同见我。”
            </p>
          </div>
        </div>
        <div class="card-ambient ambient-right"></div>
      </section>

      <!-- 竹中声 -->
      <section
        id="cyclic-clock"
        class="card special-section qiuyuan-item item-bamboo"
      >
        <div class="card-head">
          <h2>竹中声</h2>
          <span class="head-line"></span>
        </div>
        <div class="content two-col">
          <div class="img-area">
            <div class="img-frame">
              <img
                src="./img/item3.png"
                loading="lazy"
                decoding="async"
                alt="聆听"
              />
            </div>
          </div>
          <div class="text-block">
            <p>他对于这个世界的第一印象，不是眼看的，而是听到的。</p>
            <p>
              他听到父母的无奈，听到重州山林中无数毛竹的空洞，听到刀和剑，听到师父的血，听到仇人的怒号。
            </p>
            <p>
              后来，他听到光亮，听到明庭里数不清的明争暗斗，听到贪官墨吏的告饶，听到一场阴谋，听到另一种仇恨和希望。
            </p>
            <p class="bamboo-essence">
              他看不到，但他一切都听得清楚。因为有许多声音，在他听到时，它就已经在那里了。如同剑生于铁，玉生于石，音生于竹。
            </p>
          </div>
        </div>
        <div class="card-ambient ambient-left"></div>
      </section>

      <!-- 重州麻辣豆腐 -->
      <section
        id="collective-album"
        class="card special-section qiuyuan-item item-tofu"
      >
        <div class="card-head">
          <h2>重州麻辣豆腐</h2>
          <span class="head-line"></span>
        </div>
        <div class="content two-col">
          <div class="img-area">
            <div class="img-frame">
              <img
                src="./img/food.png"
                loading="lazy"
                decoding="async"
                alt="麻辣豆腐"
              />
            </div>
          </div>
          <div class="text-block">
            <p>
              过去当差时，仇远和他的弟兄们日夜兼程，风餐露宿，没什么机会吃顿好饭，即便是到了外地的馆子住下，也要因为防备而亲自下厨做饭。而出身于重州的仇远早年间也恰恰懂得几个小菜，鲜香麻辣，最是解馋下饭，讲究的就是畅快。
            </p>
            <p class="tofu-wisdom">“好好吃饭，好好活着。”</p>
          </div>
        </div>
        <div class="card-ambient ambient-right"></div>
      </section>

      <!-- 通缉令 -->
      <section id="wanted-slim" class="card wanted-slim-board">
        <div class="card-head">
          <h2>📋 通缉令</h2>
        </div>
        <ul class="wanted-slim-list" aria-label="通缉人物">
          <li class="wanted-slim-item">
            <figure class="ws-thumb">
              <img
                src="./img/shanghen.jpg"
                alt="伤痕"
                width="220"
                height="300"
                loading="lazy"
                decoding="async"
              />
              <figcaption class="seal">通缉</figcaption>
              <span class="staple staple-top"></span>
              <span class="staple staple-bottom"></span>
            </figure>
            <div class="ws-info">
              <h3 class="ws-name">伤痕</h3>
              <p class="ws-brief">
                残星会会监，外号“黑羊”。极度疯狂，享受混乱与破坏。曾在瑝珑跟踪漂泊者，后在今州被击败关押，越狱后正被仇远追杀。
              </p>
            </div>
          </li>
          <li class="wanted-slim-item">
            <figure class="ws-thumb">
              <img
                src="./img/gsl.webp"
                alt="哥舒林"
                width="220"
                height="300"
                loading="lazy"
                decoding="async"
              />
              <figcaption class="seal">通缉</figcaption>
              <span class="staple staple-top"></span>
              <span class="staple staple-bottom"></span>
            </figure>
            <div class="ws-info">
              <h3 class="ws-name">哥舒临</h3>
              <p class="ws-brief">
                夜归前任将军。仇远曾违抗追杀令将其放走。后于“弯刀之役”与无相燹主同归于尽，下落不明。因那道惨烈军令，在瑝珑被视为罪人。
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section
        id="timeline"
        class="card timeline"
        aria-labelledby="timeline-heading"
      >
        <div class="card-head">
          <h2 id="timeline-heading">🔗 共鸣链详解</h2>
        </div>
        <div class="tl-wrap" role="list">
          <div class="vl" aria-hidden="true"></div>
          <ol class="tl-list">
            <li
              v-for="(ev, i) in timeline"
              :key="i"
              class="tl-item"
              role="listitem"
              tabindex="0"
            >
              <div class="tl-card">
                <h3 class="tl-title">第 {{ i + 1 }} 链 · {{ ev.title }}</h3>
                <p class="tl-desc">{{ ev.desc }}</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section class="ll-stories" ref="storyRef">
        <div
          class="card stories-card"
          role="region"
          aria-labelledby="stories-title"
        >
          <!-- 标题区 -->
          <header class="card-head">
            <h2 id="stories-title" class="card-title">仇远纪事</h2>
            <span class="title-underline"></span>
          </header>

          <!-- 故事正文区 -->
          <main class="card-body">
            <transition name="story-fade" mode="out-in">
              <article :key="items[current].id" class="story" role="tabpanel">
                <h3 class="story-head">{{ items[current].title }}</h3>
                <div
                  class="story-content"
                  v-html="items[current].content"
                ></div>
              </article>
            </transition>
          </main>

          <!-- 翻页控制区 -->
          <footer class="card-foot">
            <button
              class="nav-btn prev-btn"
              @click="prev"
              aria-label="上一则故事"
            >
              <span class="btn-arrow">‹</span>
            </button>
            <div class="pager">
              <span class="pager-current">{{ current + 1 }}</span>
              <span class="pager-sep">/</span>
              <span class="pager-total">{{ items.length }}</span>
            </div>
            <button
              class="nav-btn next-btn"
              @click="next"
              aria-label="下一则故事"
            >
              <span class="btn-arrow">›</span>
            </button>
          </footer>

          <!-- 背景装饰光点 -->
          <div class="bg-ambient ambient-1"></div>
          <div class="bg-ambient ambient-2"></div>
        </div>
      </section>
    </main>

    <!-- 浮动小人（保留原逻辑） -->
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
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// 共鸣链数据
const timeline = ref([
  {
    title: "如剑不动，相由心生",
    desc: `答剑·弦歌不辍、答剑·割股之心、答剑·忠烈死节免疫打断。
仇远暴击提升20%。`,
  },
  {
    title: "剑啊，谓我弃绝弦歌不辍",
    desc: `【竹照】获得时增加额外效果：附近队伍中的角色声骸技能伤害加深30%。`,
  },
  {
    title: "剑啊，谓我弃绝割股之心",
    desc: `共鸣解放万钧一断伤害倍率增加500%。
协奏能量充满且不处于【淋漓醉墨】状态下时，仇远的共鸣技能替换为共鸣技能荷蓑出林，每20秒可施放1次。
施放荷蓑出林时，提前结束且从容效果，消耗60点协奏能量并回复【挑灯问剑】400点，对目标造成仇远自身500%攻击的气动伤害，此次伤害视为声骸技能伤害，下一次常态攻击普攻替换为答剑·质黑相青第三段。
施放荷蓑出林后，下次仇远进入【淋漓醉墨】状态时无法获得且从容效果，答剑·弦歌不辍、答剑·割股之心、答剑·忠烈死节伤害倍率增加600%，答剑·忠烈死节命中时额外获得协奏能量30点。
施放荷蓑出林后，非联机状态下下次延奏技能替换为延奏技能新筠坠箨，造成仇远自身500%攻击的气动伤害，此次伤害视为声骸技能伤害。`,
  },
  {
    title: "剑啊，谓我弃绝忠烈死节",
    desc: `仇远攻击提升20%。`,
  },
  {
    title: "剑啊，如今我弹铗而歌",
    desc: `仇远无视目标15%的防御。`,
  },
  {
    title: "如是我闻、我见、我言",
    desc: `施放重击答剑·忠烈死节时，停滞周围的敌人，持续5秒，该效果联机状态下不会生效。切换至其他角色或目标受到伤害时提前清除停滞效果。
退出【淋漓醉墨】状态且为队伍中登场角色时，对范围内敌人造成自身600%攻击的气动伤害，该伤害视为声骸技能伤害。
施放共鸣技能荷蓑出林时，仇远暴击伤害增加100%，持续6秒。切换至其他角色时，效果提前结束。`,
  },
]);

// 故事数据
const items = [
  {
    id: "1",
    title: "磨剑",
    content: `“一重山是一道关，过了这座山，你就能出关了。过得了这座山，你就能出关做你想做的事。但若是你过不了这座山，你身上的东西，就得留在这座山里了。”

仇远当然记得，这是五年前，自己在血与火的废墟中遇到那老人时，他和自己说的第一句话。

他叫那老人为“师父”，可他从未亲眼见过那被他称呼为“师父”的人，只知道他的师父或许是个蓄着胡子的老人，穿一身粗麻破了几个窟窿的大褂。他领着自己学得一身武艺，在日复一日的磨炼中，窥得心中的那片山风摇荡的竹林。

有人说他的师父是过去重州的剑鬼，杀人如麻，手下亡魂无数，在岁主的饶恕下逃得死罪。有人说，那老头乃是明庭有名的大将军，位极人臣，有开疆拓土的功劳，只是后来被贬至此孤独终老。也有人说，那老头只是一个传说，根本不存在，哪有人能只用一根竹竿，就能杀退一山残象呢？

但他信。

五年以来，他打遍江湖几无敌手，可唯独没能从这个老头手下赢下一合。

“师父，五年前，您也是这句话。”

“真快啊，一眨眼，这就五年过去了。”

他一直在等待这一天。只消赢过师父，他便能跨过这片竹海，跨过这座山，跨过这个他未尝一胜的人。

“五年了，我已经没什么能教给你的了，只剩这最要紧的活，还在我身上。这最后的关隘，你知道是什么吗？”

“还请师父明示。”

“仇远，你在这片竹林里，看到了什么。”

“叶若明枪，竹似暗棒。好像站满了人，鬼影重重。”

“五年前的火，还在你心里烧着。”

“那场火，不也在您心里烧着吗……剑鬼？”

“已经……很久没有活着的人这么叫过我了。也罢，那我也不必再多解释了。这活，就在我身上，来拿吧。”

成就五年前那片修罗地狱的人，是他。把仇远从那片修罗地狱里救出来的人，也是他。

“此剑既出，定不负所学！”

那场火，从来没有熄灭。`,
  },
  {
    id: "2",
    title: "藏剑",
    content: `“躺好，不许乱动。”

他再次醒来时，除了身上那被一层一层纱布包裹住的疼痛之外，他还能感受到那严厉的声音里包含着一种与杀意全然相反的东西。也就是这个时候，这种差异让他回忆起了这周身疼痛的缘由。

“我……”

“赤手空拳打几十个人，找死也不是你这么个找法。”

“我应该死了才对。”

“许多活着的人都该死，而很多死了的人却本该活着。人命就是这样。”

混杂着仇恨的悔恨令他知晓自己的剑该何时入鞘，但这份悔恨依旧不能阻止他过去五年间未曾忘记的仇恨。他仍然记得五年前那场连滂沱大雨都浇不灭的烈火，那个手执长剑，站在自己面前的老人。

而五年后他下山的那一天，没有大雨为他洗剑，只有顺着自己脸颊留下的烈酒和一声叹息。

仇恨或许只能以血洗血。可洗净之后的事，没有人知道。

他也已失去了握住剑的动力，任由那些刀枪剑戟朝自己袭来——

“哼，不过，我也不知道你到底是该死，还是该活。是死是活，也都在你自己”

从那一天开始，他再也没有拿起过剑，只是随身抓一根竹枝，颓唐地坐在茅草屋前照看那些日夜煎着药的瓦罐，想象着来往求医问药的病人，和那个被称为“张太医”的倔强中年人的模样。

以及享受着，他过去几年中从未享受过的宁静。

自从他被这位“张太医”从十殿阎罗案上勾回，他便再也没有“看见”过心中的那片由刀枪剑戟栽成的竹林，他的眼前，只剩一片最纯粹的宁静的黑暗。他不必再“看见”他人眼中仇恨的炬火，鼻尖是厚重的药香，耳畔只有炉中柴薪日复一日劈啪作响，人们的痛苦、泪水、感谢和欢笑。

这时候他才想起自己和他们，也没有什么两样。

“这药壶，你且收好。将来抓药时，按照我给你的方子，三碗水煎一碗。”

“这是？”

“你重伤时，我看你身上血运微弱，下了猛药才勾回性命。不过，作为代价，你那共鸣力也被伤得所剩无几。”

“这是能重新勾起你‘心镜’的药，若是将来一日，你再握刀剑，想必有用。”

“不会了。没有那一天了。先生救了我，无以为报，我便在您这儿当个看火的杂役，为先生打杂吧。”

“你生来杀相，掌中命途尽断，有情惊怖，恒受苦恼，只会身殒刀剑丛中，怎能老死我这茅草屋中。”

“有情惊怖……恒受苦恼，师父也说过这样的话。”

“哼，教出你这样的徒弟，想必他也不是什么善茬。”

“……无论如何，我都不会再拿起剑了。不过这药我会收下，也恳请先生留我在此。如果有人因我上门来招惹是非，我离开便是。”

“哎，药啊，和剑一样，怎么用，用多少，都不一样。能杀人，也能救人。”

“仇远，去把门开了吧，炉子也点上。有一点我比你好些，还没有人敢来我这里惹是生非。”`,
  },
  {
    id: "3",
    title: "用剑",
    content: `“呵，担着这身力气空老林泉，倒是愧对了死在你手上的性命。”

“你认错人了。先生，给这位病人抓药吧。”

他只是拨弄着炉里的柴，没有理会身边的老年男人。起先，那人还只是偶尔来草堂上和张太医闲聊，后来竟三番五次找上门来，和他胡乱说些什么没有营养的话。

只是这一次，那男人朝着他劈头丢过一个巴掌大小的铁砣子，他只得伸手防住额头，将其稳稳接在手中。

“你是先生的朋友，何故如此为难。”

“你应该认得那东西吧。”

那精钢天铁铸就的兽头，隐隐散着一股寒意，错不了。

“镇抚司……你是来抓我的吗？”

“要抓你也轮不到我来亲自抓你，你身上倒是背了不少命案，按理，确实要有三法司提审定你的罪。”

“那定罪便是。”

“不过，你真的只想要死在刑场上吗？”

“横竖一死，有什么分别。”

“那才是愧对了你这身力气。”

“…………”

“杀人偿命，欠债还钱，这是自古的规矩。也许你总要死在刑场上，但在那之前，你还能多少赎清些你的罪过。”

“跟我干吧，在你上刑场之前，我能保证，你绝不会死在牢房里或是病床上。”

他知道明庭镇抚司的厉害。那一块御赐精钢天铁的穷奇兽头，见此物如见龙主，各地官员也须行觐见龙主之礼。他们能自由行走于瑝珑各地，不受诸官衙门限制，只听命于瑝珑龙主，专办瑝珑各地大案——他们要你三更死，无常也不敢五更勾你的魂。

“你可以不只为自己而挥剑，报效明庭，惩奸除恶，你也能为天下苍生挥剑。”

“我只是个普普通通的瞎子，天下苍生这四个字太大了，我担不住。”

那男人捡起身边的一根柴，盯着眼前的炉火。

“你知道为什么张先生离开明庭吗？”

“……不知道，先生从来没说过，我也从来没问过。”

“医一人，不如医万人。”

男人没再说话，只是那煎着药的炉里，又多了一根柴。

三天后，他和男人一并站在草堂门前，那时重州深山的晨露还没有打湿他们的斗笠，草堂外煎药的火炉也还没有升起缕缕青烟，只有熹微晨光，照在他们身上。

“他一定跟你说了吧，我离开明庭的原因……哼。”

“这个镇抚司的家伙，和我差不多，向来是倔脾气，不过我想这也是他能说动你跟他走的原因。”

“江湖之远，我能救一个是一个。不过，他梁东园才是能在庙堂上治病的人。”

“时候到了，走吧，要是你们一直站在这儿，等会我的病人来了，都叫你们给吓跑了。”

郎中拍了拍他的肩膀，头也不回地钻进草堂中，甚至没留给他说一句话的功夫。

多年以后，仇远仍然记得，这个他叩倒在一片被无数病人踏成的泥土路上的清晨。

“仇远，谢过先生之恩。”`,
  },
  {
    id: "4",
    title: "折剑",
    content: `手上枷锁，脚下镣铐。

许多贪官污吏江洋大盗被他亲手送到这里，那时他乃是槛外人，如今，他却和那些人一样，成了槛中人。

“打开吧。”

“林大人，马上就是时辰了，这……”

"打开。"

一连串榫卯栏杆窸窣作响，来人坐到他身前，随之而来的还有隐约的饭菜酒香。

“谛天鉴问话，你也要在这里看着吗？”

“大人，下官只是奉命办差而已……”

“好，那我告诉你，我也是奉命办差，天牢重犯行刑历来要有谛天鉴过问，我有要紧的话要问死囚，你们都给我退了。”

“是，大人……”

“把牢门关了，等我要出来时，再叫你们给我打开。”

一阵匆忙的脚步声过去，牢房里只剩下两人。

“午正三刻才会杀人，现在是午初一刻。”

“林大人，是来送我。”

“先饮此杯。就当做是，祭奠他了。”

他没有饮下林监正给他倒满的酒，而是拖着沉重的镣铐，举杯倾倒在地上。

“哎，那时节只有你们二人，东园他就那么惨死在那里……奈何这是通天的大案，只是那真凶没留下半点罪证，三法司也只能拿你顶罪。”

“是我没能救下梁大人。”

“你还记得那从东园身上……‘剥离’出来的凶手吗？”

“就是化成灰了，那气息我也会记得。”

“谛天鉴遍查史书，也没找到有这样能够幻化成他人模样，剥离他人身形的共鸣者……”

“那时候，也不知梁大人到底还有多少神志了……”

“也许东园最后交给你办的今州那场案子，不是东园的本意。以他的为人，绝不可能对一个能杀残象的小卒下追杀令。”

“所以……我放过了他，那个叫哥舒临的人。那时我想，如果是我熟悉的恩公，不会下这样的命令的。”

“东园他果然没有看错你，若是要查，只能从那场案子查起，不过这里面……也许永远也查不清。”

“仇某一生，欠下血债不少，又受恩于梁林二位大人，还有张太医……”

“仇某，只能来世再还了。”

“我记得东园曾说，不会让你死在牢房里或是病床上。”

谛天鉴监正起身走到牢门前，语重心长地说着。

“明庭天牢重犯，午正三刻杀人，午初三刻就要有三法司发往谛天鉴请龙主和岁主明断的行文。有了龙主和岁主的文书，一个小时之后才能杀人。”

“没有谛天鉴发还给三法司那份龙主和岁主的文书，谁也不敢杀人。”

“往后的路，你只能自己走了。你要记住，这场案子，你就是舍了性命也要查明白，死也要死在给东园报仇的路上。”`,
  },
  {
    id: "5",
    title: "铸剑",
    content: `自打他从明庭逃得生路，沦为六州通缉的逃犯，已经过去五年了。

五年的光景过去，明庭这座大城一点没变，繁华依旧，只是他身上的行装愈发破烂，浸染着六州旅尘风霜。谛天鉴的林监正身染沉疴，老病致仕。那个从他手中活下来的年轻人，成了镇守边陲的将军，却又堕入鸣式的魔障。

他的师父告诉他要懂得什么时候拔剑，什么时候收剑，可当他收住剑的时候，一切都滑向了深渊之中。

他的救命恩人告诉他剑能杀人亦能救人，可他却没能救下他想要救下的人。

变幻莫测的命运始终纠缠着他，一切都变了，一切却又好像没变。

而如今未曾改变的是，他始终没有追寻到那个杀害了他恩公的凶手，不过，他也从未放弃寻找真相。

如果不是林监正托人找到他，告诉他明庭军策府的本兵有重要线索，可能他根本不会在这个节骨眼上犯险重返明庭。

“你来了。”

连缀成线的暴雨之中，一个同样戴着斗笠看不清面庞的人从漆黑的桥洞底下走了出来。

“前些阵子残星会那个名叫「伤痕」的会监，从今州的大牢里逃出去了。”

“根据我们的线报，他前几天在黎那汐塔的七丘城附近出现了。他是今州的犯人，是我瑝珑的犯人，无论怎么说，也得给他缉拿归案。”

“这事你们自己做不就行了。”

“只是那黎那汐塔有些不一样，那里有着类似于鸣式共鸣者的人存在。”

“……所以你们想起我了？”

“东园案的疑点在你，你的疑点在哥舒临，哥舒临身上的疑点在今州鸣式，顺藤摸瓜，也许能知道当时东园为什么会给你下那道命令，也就能找到真凶的线索。”

“关于残星会和黎那汐塔鸣式，都在这份卷宗里了。拿着我的印信文书，先去今州问话。”

“你的那个亲族，那个令尹近卫就在今州，查清楚那伤痕是怎么从大牢里被人救出去的，然后再向东渡海去黎那汐塔。”

仇远的确有这么一位远房表亲，不过各州之间山高路远几乎没什么交集，只知道那人近来成了今州令尹的近卫。

“她未必见我。”

“再怎么说，你们叔侄一场，你说话，她会信的。对了，从今州出发的话……那个【玩家名】，眼下也在黎那汐塔。”

“【玩家名】……这人也在那儿吗？”

“是的，有关今州的事，你也可以问问【TA】。”

“……行了，卷宗给我吧，我这就准备出发。”

“等等！”

仇远接过卷宗转身就要走，却被那人叫住。

“既然回来了，就去看看东园吧。我知道，每年忌日，你都会回来上一炷香。”

“……等我回来再说吧。我一定会找到线索，等到那时，再回来告慰恩公的在天之灵。"

“至于你说的那个逃犯……”

“最好能缉捕归案，但如果情势紧急，也可就地处决。三法司那边，有我说话。”

“好。”

仇远点了点头，不再说话，消隐在雨线之中。

他知道自己身上担着朝堂上数不清的明争暗斗，甚至连这个缉捕伤痕的差事，明庭都不愿正式派遣人手捉拿，只是让自己一个在案逃犯单独行动。

可这一切也和他没什么联系，他不在乎，也不关心。他只想找到他没能看到的那些真相。

可报了仇，还了恩，之后又该如何？那算是他的剑鞘吗？

也许等他再老些就知道了吧。`,
  },
];

const current = ref(0);
const storyRef = ref<HTMLElement | null>(null);

function prev() {
  current.value = (current.value - 1 + items.length) % items.length;
  storyRef.value?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function next() {
  current.value = (current.value + 1) % items.length;
  storyRef.value?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// 浮动小人
interface Chibi {
  src: string;
  top: number;
  left: number;
}

const chibiList = ref<Chibi[]>([]);
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

onMounted(async () => {
  if (!reducedMotion) {
    // 时间线滚动触发
    gsap.utils.toArray(".tl-item").forEach((it: any, idx: number) => {
      gsap.from(it.querySelector(".tl-card"), {
        scrollTrigger: {
          trigger: it,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 22,
        duration: 0.7,
        delay: idx * 0.06,
      });
    });

    // 头像微呼吸
    gsap.to(".avatar-card", {
      scale: 1.007,
      duration: 2.8,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }

  // 生成浮动小人
  const total = 6;
  const pickCount = window.innerWidth <= 768 ? 1 : 3;
  const nums = shuffle(Array.from({ length: total }, (_, k) => k + 1));
  const picks = nums.slice(0, pickCount);
  const imgWidth = 100;
  const imgHeight = 100;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  chibiList.value = picks.map((i) => ({
    src: `/QImages/1 (${i}).png`,
    left: Math.random() * (vw - imgWidth),
    top: Math.random() * (vh - imgHeight),
  }));

  await nextTick();
  const imgs = document.querySelectorAll<HTMLImageElement>(".chibi-img");
  imgs.forEach((img, index) => {
    if (!reducedMotion) {
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
          onComplete: () => animateChibi(img),
        });
      });
      animateChibi(img);
    }
  });
});

function animateChibi(img: HTMLImageElement) {
  const padding = 200;
  const rect = img.getBoundingClientRect();
  let deltaX = (Math.random() - 0.5) * 200;
  let deltaY = (Math.random() - 0.5) * 200;
  let nextX = rect.x + deltaX;
  let nextY = rect.y + deltaY;
  if (nextX < padding) deltaX = padding - rect.x;
  if (nextX + img.width > window.innerWidth - padding)
    deltaX = window.innerWidth - padding - (rect.x + img.width);
  if (nextY < padding) deltaY = padding - rect.y;
  if (nextY + img.height > window.innerHeight - padding)
    deltaY = window.innerHeight - padding - (rect.y + img.height);

  gsap.to(img, {
    x: `+=${deltaX.toFixed(0)}`,
    y: `+=${deltaY.toFixed(0)}`,
    rotation: `+=${((Math.random() - 0.5) * 60).toFixed(0)}`,
    duration: 2 + Math.random() * 2,
    ease: "power1.inOut",
    onComplete: () => animateChibi(img),
  });
}

function shuffle(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
</script>

<style scoped lang="scss">
/* ========== 全局色彩变量 ========== */
:root {
  --bamboo-green: #2e8f74;
  --blade-silver: #cfeee8;
  --moon-light: #b4e6e2;
  --deep-ink: #0b1a16;
  --night-base: #050a0c;
  --text-primary: #f0faf8;
  --text-secondary: rgba(207, 238, 232, 0.7);
  --card-border: rgba(46, 143, 116, 0.15);
  --card-bg: rgba(5, 10, 12, 0.55);
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  --font-special: "ZCOOL KuaiLe", "STKaiti", serif;
}

/* ========== 页面基础 ========== */
.megumi-page {
  position: relative;
  min-height: 100vh;
  background: radial-gradient(ellipse at 30% 20%, #0a1410 0%, #030606 100%);
  font-family: "Noto Serif SC", "STKaiti", "KaiTi", serif;
  color: var(--text-primary);
  padding: 60px 20px 40px;
  box-sizing: border-box;
  overflow-x: hidden;

  &.reduced-motion * {
    transition: none !important;
    animation: none !important;
  }
}

/* ========== 动态氛围背景 ========== */
.bg-atmosphere {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
        circle at 40% 30%,
        rgba(46, 143, 116, 0.02) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 70%,
        rgba(207, 238, 232, 0.03) 0%,
        transparent 50%
      );
    pointer-events: none;
  }

  .moon-main {
    position: absolute;
    top: 5%;
    right: 10%;
    width: 450px;
    height: 450px;
    background: radial-gradient(
      circle at 45% 40%,
      rgba(180, 230, 226, 0.18) 0%,
      transparent 70%
    );
    filter: blur(65px);
    animation: moonBreathe 8s ease-in-out infinite alternate;
  }
  .moon-sub {
    position: absolute;
    bottom: 12%;
    left: 8%;
    width: 350px;
    height: 350px;
    background: radial-gradient(
      circle at 60% 60%,
      rgba(46, 143, 116, 0.12) 0%,
      transparent 70%
    );
    filter: blur(55px);
    animation: moonBreathe 10s ease-in-out infinite alternate-reverse;
  }

  .firefly {
    position: absolute;
    width: 5px;
    height: 5px;
    background: radial-gradient(circle, #f0faf8 0%, transparent 85%);
    border-radius: 50%;
    box-shadow: 0 0 18px #cfeee8, 0 0 40px rgba(180, 230, 226, 0.55),
      0 0 60px rgba(46, 143, 116, 0.25);
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
        rgba(207, 238, 232, 0.5) 0%,
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

  .sword-light {
    position: absolute;
    left: -15%;
    width: 320%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(46, 143, 116, 0.25) 20%,
      rgba(207, 238, 232, 0.7) 45%,
      rgba(180, 230, 226, 0.9) 50%,
      rgba(207, 238, 232, 0.7) 55%,
      rgba(46, 143, 116, 0.25) 80%,
      transparent 100%
    );
    filter: blur(1px) drop-shadow(0 0 6px rgba(46, 143, 116, 0.5));
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

  .ink-drop {
    position: absolute;
    width: 2px;
    height: 2px;
    background: rgba(46, 143, 116, 0.85);
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
      border: 1px solid rgba(46, 143, 116, 0.25);
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

  .rain {
    position: absolute;
    top: -10%;
    left: 0;
    width: 100%;
    height: 120%;
    background: repeating-linear-gradient(
      transparent 0px,
      transparent 3px,
      rgba(180, 230, 226, 0.05) 3px,
      rgba(180, 230, 226, 0.05) 4px
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

  .mist {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35%;
    background: linear-gradient(
        to top,
        rgba(38, 120, 90, 0.1) 0%,
        transparent 80%
      ),
      linear-gradient(
        to right,
        rgba(180, 230, 226, 0.06),
        transparent 30%,
        rgba(46, 143, 116, 0.06) 70%,
        transparent
      );
    filter: blur(35px);
    animation: mistRise 14s ease-in-out infinite;
  }
}

/* ========== 容器与Hero布局 ========== */
.container {
  position: relative;
  z-index: 10;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 10px;
}

.hero {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 30px;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
}

.left-col {
  display: flex;
  justify-content: center;
}

.avatar-card {
  background: rgba(6, 16, 18, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 12px;
  border: 1px solid rgba(207, 238, 232, 0.15);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease;
}

.avatar-wrap img {
  width: 100%;
  border-radius: 12px;
  display: block;
  filter: saturate(0.8) brightness(0.9);
}

.avatar-meta {
  margin-top: 10px;
  text-align: center;
}

.avatar-badge {
  font-size: 0.9rem;
  color: var(--blade-silver);
  background: rgba(0, 0, 0, 0.3);
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid rgba(207, 238, 232, 0.2);
}

.right-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-panel {
  background: rgba(5, 10, 12, 0.5);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(207, 238, 232, 0.15);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.name {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(
    135deg,
    #fff,
    var(--blade-silver),
    var(--bamboo-green)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 4px;
  margin-bottom: 8px;
  .jp {
    font-size: 0.9rem;
    color: var(--bamboo-green);
    margin-left: 10px;
    -webkit-text-fill-color: var(--bamboo-green);
  }
}

.subtitle {
  color: var(--moon-light);
  font-size: 1.1rem;
  margin: 12px 0;
  font-style: italic;
}

.lead {
  color: rgba(240, 250, 248, 0.8);
  line-height: 1.6;
}

/* ========== 通用卡片基础 ========== */
.card {
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 24px 28px;
  margin-bottom: 20px;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: rgba(46, 143, 116, 0.3);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.7),
      0 0 0 1px rgba(46, 143, 116, 0.2) inset;
    transform: translateY(-4px);
  }

  // 顶部公共装饰光带
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--blade-silver),
      transparent
    );
    opacity: 0.2;
    animation: shimmerLine 4s ease-in-out infinite;
    pointer-events: none;
  }

  h2 {
    color: var(--blade-silver);
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: 4px;
    text-shadow: 0 0 15px rgba(46, 143, 116, 0.3);
    margin: 0 0 16px;
    white-space: nowrap;
  }
}

// 去除故事卡片默认的伪元素（故事卡片内部会自己定义）
.stories-card::before {
  content: none;
}

/* 通用card-head（用于除故事卡片外的其他卡片） */
.card-head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 24px;
  position: relative;
  z-index: 2;

  .head-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, var(--bamboo-green), transparent);
    opacity: 0.3;
    margin-left: 8px;
    box-shadow: 0 0 6px rgba(46, 143, 116, 0.2);
  }
}

/* ========== 共鸣状况卡片 ========== */
.resonance-overview {
  // 背景微光点（卡片内装饰）
  .bg-spark {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0.15;
  }
  .spark-1 {
    width: 200px;
    height: 200px;
    background: radial-gradient(
      circle,
      rgba(46, 143, 116, 0.4) 0%,
      transparent 70%
    );
    top: -40px;
    right: -40px;
    animation: floatSlow 8s ease-in-out infinite;
  }
  .spark-2 {
    width: 160px;
    height: 160px;
    background: radial-gradient(
      circle,
      rgba(207, 238, 232, 0.3) 0%,
      transparent 70%
    );
    bottom: -30px;
    left: -30px;
    animation: floatSlow 10s ease-in-out infinite alternate;
  }
}

/* 报告块通用 */
.report-section {
  position: relative;
  padding-left: 12px;
  border-left: 2px solid rgba(46, 143, 116, 0.2);
  transition: border-color 0.3s;
  &:hover {
    border-left-color: rgba(46, 143, 116, 0.5);
  }

  .report-title {
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--blade-silver);
    margin: 0 0 6px;
    letter-spacing: 2px;
    &::after {
      content: "";
      display: block;
      width: 40px;
      height: 2px;
      background: var(--bamboo-green);
      margin-top: 6px;
      border-radius: 1px;
      box-shadow: 0 0 8px var(--bamboo-green);
    }
  }

  .report-meta {
    font-size: 0.85rem;
    color: var(--text-secondary);
    font-style: italic;
    margin-bottom: 16px;
    opacity: 0.7;
    letter-spacing: 0.5px;
  }

  .report-content {
    font-size: 1rem;
    line-height: 1.8;
    color: var(--text-primary);
    margin: 0 0 12px;
    text-align: justify;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  .highlight {
    color: var(--blade-silver);
    font-weight: 600;
    letter-spacing: 1px;
  }

  .emphasis {
    font-family: var(--font-special);
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--bamboo-green);
    text-shadow: 0 0 8px rgba(46, 143, 116, 0.4);
    font-size: 1.05em;
    transition: text-shadow 0.3s;
    &:hover {
      text-shadow: 0 0 16px rgba(46, 143, 116, 0.8);
    }
  }

  .diagnosis-list {
    list-style: none;
    padding: 0;
    margin: 12px 0 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    li {
      position: relative;
      padding-left: 20px;
      color: var(--text-primary);
      line-height: 1.6;
      transition: transform 0.2s, color 0.2s;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.6em;
        width: 8px;
        height: 1px;
        background: var(--bamboo-green);
        box-shadow: 0 0 4px var(--bamboo-green);
      }
      &:hover {
        transform: translateX(6px);
        color: #fff;
      }
    }
  }

  .postscript {
    margin-top: 16px;
    padding-top: 14px;
    border-top: 1px dashed rgba(207, 238, 232, 0.15);
    font-size: 0.95rem;
    color: var(--text-secondary);
    font-style: italic;
    line-height: 1.7;
    span {
      color: var(--blade-silver);
      font-weight: 600;
      font-style: normal;
    }
  }
}

.divider-light {
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--bamboo-green),
    var(--blade-silver),
    var(--bamboo-green),
    transparent
  );
  margin: 12px 0 18px;
  opacity: 0.3;
  position: relative;
  z-index: 2;
}

/* 双栏布局 */
.two-col {
  display: flex;
  gap: 24px;
  position: relative;
  z-index: 2;
}

.text-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: var(--text-primary);
  line-height: 1.75;
  p {
    margin: 0;
    font-size: 1rem;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
}

/* ========== 特殊物品卡片（杯中物、铁中剑、竹中声、麻辣豆腐） ========== */
.qiuyuan-item {
  // 背景氛围光点
  .card-ambient {
    position: absolute;
    pointer-events: none;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.08;
    transition: opacity 0.5s;
  }
  .ambient-left {
    width: 220px;
    height: 220px;
    background: radial-gradient(
      circle,
      var(--bamboo-green) 0%,
      transparent 70%
    );
    top: -40px;
    left: -40px;
  }
  .ambient-right {
    width: 200px;
    height: 200px;
    background: radial-gradient(
      circle,
      var(--blade-silver) 0%,
      transparent 70%
    );
    bottom: -50px;
    right: -50px;
  }
  &:hover .card-ambient {
    opacity: 0.15;
  }

  // 图片框
  .img-area {
    flex: 0 0 180px;
    max-width: 180px;
    .img-frame {
      position: relative;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid rgba(207, 238, 232, 0.25);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6),
        0 0 0 3px rgba(46, 143, 116, 0.1);
      transition: all 0.3s ease;
      img {
        width: 100%;
        display: block;
        filter: brightness(0.9) contrast(1.05) saturate(0.8);
        transition: transform 0.5s ease, filter 0.5s ease;
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 60%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.06),
          transparent
        );
        transform: skewX(-20deg);
        transition: left 0.6s;
      }
    }
    &:hover .img-frame {
      border-color: rgba(46, 143, 116, 0.6);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.7),
        0 0 0 3px rgba(46, 143, 116, 0.2);
      &::after {
        left: 120%;
      }
      img {
        transform: scale(1.03);
        filter: brightness(0.95) contrast(1.1) saturate(1);
      }
    }
  }
}

/* 特殊文本样式 */
.sword-quote {
  font-family: var(--font-special);
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: 2px;
  color: var(--blade-silver);
  text-shadow: 0 0 12px rgba(207, 238, 232, 0.4);
  border-left: 3px solid var(--bamboo-green);
  padding-left: 16px;
  margin-top: 6px;
  transition: border-color 0.3s, text-shadow 0.3s;
  &:hover {
    border-left-color: var(--blade-silver);
    text-shadow: 0 0 20px rgba(207, 238, 232, 0.8);
  }
}

.bamboo-essence {
  font-family: var(--font-special);
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--moon-light);
  background: linear-gradient(
    135deg,
    rgba(46, 143, 116, 0.1) 0%,
    transparent 40%
  );
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px dashed rgba(207, 238, 232, 0.2);
  transition: background 0.3s, border-color 0.3s;
  &:hover {
    background: rgba(46, 143, 116, 0.15);
    border-color: rgba(207, 238, 232, 0.4);
  }
}

.tofu-wisdom {
  font-family: var(--font-special);
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--blade-silver);
  text-shadow: 0 0 10px rgba(46, 143, 116, 0.4);
  text-align: right;
  font-style: italic;
}

/* ========== 通缉令 ========== */
.wanted-slim-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 20px;
}
.wanted-slim-item {
  display: flex;
  gap: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(207, 238, 232, 0.08);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
}
.ws-thumb {
  position: relative;
  width: 180px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  .seal {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #b91c1c;
    color: #fff;
    font-weight: bold;
    padding: 4px 12px;
    border-radius: 50%;
    transform: rotate(-15deg);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
  }
  .staple {
    position: absolute;
    width: 20px;
    height: 4px;
    background: #aaa;
    border-radius: 2px;
  }
  .staple-top {
    top: -4px;
    left: 20px;
    transform: rotate(-10deg);
  }
  .staple-bottom {
    bottom: -4px;
    right: 20px;
    transform: rotate(8deg);
  }
}
.ws-name {
  color: var(--blade-silver);
  margin: 0 0 8px;
}

/* ========== 时间线 ========== */
.timeline .tl-wrap {
  position: relative;
  padding: 10px 0 10px 80px;
}
.vl {
  position: absolute;
  left: 60px;
  top: 20px;
  bottom: 20px;
  width: 2px;
  background: linear-gradient(to bottom, var(--bamboo-green), transparent);
}
.tl-item {
  margin-bottom: 24px;
}
.tl-card {
  background: rgba(6, 16, 18, 0.4);
  border-radius: 10px;
  padding: 16px;
  border-left: 4px solid var(--bamboo-green);
}
.tl-title {
  color: var(--blade-silver);
  margin: 0 0 8px;
}

/* ========== 故事卡片（仇远纪事） ========== */
.stories-card {
  // 重写基础卡片的顶部光带位置和样式
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
      var(--blade-silver),
      transparent
    );
    opacity: 0.2;
    animation: shimmerLine 5s ease-in-out infinite;
    pointer-events: none;
  }

  .card-head {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 24px;
    position: relative;
    z-index: 2;

    .card-title {
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: 5px;
      background: linear-gradient(180deg, #ffffff, var(--blade-silver));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 16px rgba(46, 143, 116, 0.35);
      margin: 0;
    }
    .title-underline {
      display: block;
      width: 50px;
      height: 2px;
      background: var(--bamboo-green);
      margin-top: 10px;
      border-radius: 1px;
      box-shadow: 0 0 8px var(--bamboo-green);
      transition: width 0.4s ease;
    }
    &:hover .title-underline {
      width: 100px;
    }
  }

  .card-body {
    position: relative;
    z-index: 2;
    min-height: 180px;
  }

  .story {
    .story-head {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--blade-silver);
      margin: 0 0 16px;
      letter-spacing: 2px;
      padding-left: 14px;
      border-left: 3px solid var(--bamboo-green);
      transition: border-color 0.3s;
      &:hover {
        border-left-color: var(--blade-silver);
      }
    }
    .story-content {
      font-size: 1.05rem;
      line-height: 1.9;
      color: var(--text-primary);
      text-align: justify;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      white-space: pre-wrap;
      word-break: break-word;
    }
  }

  .card-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 28px;
    padding-top: 18px;
    border-top: 1px dashed rgba(207, 238, 232, 0.15);
    position: relative;
    z-index: 2;
  }

  .nav-btn {
    background: transparent;
    border: 1px solid rgba(207, 238, 232, 0.25);
    color: var(--blade-silver);
    font-size: 2rem;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    .btn-arrow {
      position: relative;
      z-index: 2;
      transition: transform 0.3s;
    }
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle at center,
        rgba(46, 143, 116, 0.3),
        transparent
      );
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover {
      border-color: var(--bamboo-green);
      color: #fff;
      box-shadow: 0 0 15px rgba(46, 143, 116, 0.4);
      &::after {
        opacity: 1;
      }
    }
    &:active {
      transform: scale(0.95);
    }
  }

  .pager {
    color: var(--moon-light);
    font-size: 1.1rem;
    letter-spacing: 2px;
    display: flex;
    align-items: baseline;
    gap: 4px;
    .pager-current {
      font-weight: 700;
      font-size: 1.4rem;
      color: var(--blade-silver);
      text-shadow: 0 0 8px rgba(46, 143, 116, 0.5);
    }
    .pager-sep {
      opacity: 0.5;
    }
    .pager-total {
      opacity: 0.7;
    }
  }

  // 背景光点
  .bg-ambient {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(60px);
    opacity: 0.08;
    transition: opacity 0.5s;
  }
  .ambient-1 {
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, var(--bamboo-green), transparent 70%);
    top: -40px;
    right: -30px;
  }
  .ambient-2 {
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, var(--blade-silver), transparent 70%);
    bottom: -40px;
    left: -30px;
  }
  &:hover .bg-ambient {
    opacity: 0.15;
  }
}

/* 故事切换动画 */
.story-fade-enter-active,
.story-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.story-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.story-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ========== 浮动小人 ========== */
.floating-chibis {
  position: fixed;
  inset: 0;
  z-index: 99;
  pointer-events: none;
  .chibi-img {
    position: absolute;
    width: 80px;
    pointer-events: auto;
  }
}

/* ========== 关键帧动画合并 ========== */
@keyframes moonBreathe {
  from {
    opacity: 0.35;
    transform: scale(1);
  }
  to {
    opacity: 0.8;
    transform: scale(1.15);
  }
}
@keyframes fireflyFloat {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.25;
  }
  25% {
    transform: translate(35px, -70px) scale(1.6);
    opacity: 0.85;
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
@keyframes swordSweep {
  0% {
    transform: translateX(-25%) rotate(-12deg);
    opacity: 0;
  }
  35% {
    opacity: 0.9;
  }
  65% {
    opacity: 0.7;
  }
  100% {
    transform: translateX(45%) rotate(-12deg);
    opacity: 0;
  }
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
@keyframes rainFall {
  0% {
    transform: translateY(-2%);
  }
  100% {
    transform: translateY(2%);
  }
}
@keyframes mistRise {
  0%,
  100% {
    opacity: 0.35;
    transform: translateY(0) scale(1);
  }
  50% {
    opacity: 0.6;
    transform: translateY(-8px) scale(1.02);
  }
}
@keyframes shimmerLine {
  0%,
  100% {
    opacity: 0.15;
  }
  50% {
    opacity: 0.35;
  }
}
@keyframes floatSlow {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(10px, -10px) scale(1.1);
  }
}

/* ========== 响应式整合 ========== */
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
  }
  .avatar-card {
    width: 80%;
  }
  .two-col {
    flex-direction: column;
  }
  .timeline .tl-wrap {
    padding-left: 20px;
  }
  .vl {
    display: none;
  }
  .wanted-slim-item {
    flex-direction: column;
  }

  // 卡片内边距与字号调整
  .card {
    padding: 20px 18px;
  }
  .card-head h2 {
    font-size: 1.5rem;
    letter-spacing: 2px;
  }
  .report-section .report-title {
    font-size: 1.2rem;
  }
  .report-content {
    font-size: 0.95rem;
  }

  // 故事卡片
  .stories-card {
    padding: 20px 18px;
    .card-head .card-title {
      font-size: 1.6rem;
      letter-spacing: 3px;
    }
    .story .story-head {
      font-size: 1.3rem;
    }
    .nav-btn {
      width: 38px;
      height: 38px;
      font-size: 1.6rem;
    }
  }
}
</style>
