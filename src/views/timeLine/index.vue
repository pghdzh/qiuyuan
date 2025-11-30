<template>
  <div class="megumi-page" aria-live="polite">
    <main class="container" ref="mainContainer">
      <!-- HERO 区域 -->
      <header class="hero" role="banner">
        <div class="left-col">
          <button class="avatar-card">
            <picture class="avatar-wrap">
              <img
                src="@/assets/images1/qiuyuan-slty (17).webp"
                class="avatar"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div class="avatar-meta">
              <span class="avatar-badge">共鸣能力：藏锋于竹</span>
            </div>
          </button>
        </div>
        <div class="right-col" ref="metaCard">
          <div class="hero-panel">
            <h1 class="name">
              仇远
              <span class="jp">（前明庭镇抚司千户，双眼失明的独行剑客）</span>
            </h1>
            <p class="subtitle">布衣之侠不求冠绝江湖、高居庙堂，但求手中之剑百折不摧，挥之有道。</p>
            <p class="lead">
              少时仇人无算，长时办差拿人，谁料蒙冤下狱，如今浪迹天涯。
            </p>
          </div>
        </div>
      </header>

      <!-- 内容卡片区 -->
      <section id="personality" class="card personality">
        <div class="card-head">
          <h2>核心机制</h2>
        </div>
        <ul class="traits">
          <li>
            仇远施放普攻第三段、闪避反击时，获取【挑灯问剑】。【挑灯问剑】达到200/400/600点时，仇远分别解锁普攻答剑·质黑相青/【竹照】状态/【淋漓醉墨】状态。
          </li>
          <li>
            【淋漓醉墨】状态下，仇远无法获得【挑灯问剑】，但可以消耗【挑灯问剑】施放技能造成更多伤害。
          </li>

          <li style="font-weight: bold">输出流程：</li>
          <li>基础流程：Q-E-R-AA-Z</li>
          <li>
            技能缩写：普攻 = A，重击 = Z，共鸣技能 = E，共鸣解放 = R，声骸 = Q
          </li>
        </ul>
      </section>

      <section id="resonance-status" class="card overview">
        <div class="card-head">
          <h2>共鸣状况</h2>
        </div>
        <div class="two-col">
          <div class="text-block">
            <p>
              「明庭谛天鉴监正杂录——书信编」<br />
              东园兄台钧鉴，前日镇抚司转三法司并华胥研究院行文谛天鉴，弟便立刻责成重州州监协办，清点重州共鸣者名录，现已查明此人和重州岁主鸣式并无关联。<br />
              据谛天鉴查，此人共鸣史距今十五年有余，即所谓“成竹于胸，裁竹为锋”，虽双眼不能视物，却有“心镜”，能透过心中具象化的“竹林”感知到外界的事物，勘破对手的心境和破绽，甚至能将“心镜”外化成虚景，不容小觑。<br />
              另外，他的剑术似乎更源自于他自身的技艺而非来自于共鸣能力，能很明显地感觉到，他无时无刻不在克制着自己的共鸣能力。据他自己说，那随身的竹壶中装着一种能够催动他“心镜”和共鸣力的药液，据说是重州一位江湖郎中所配，只在必要时才会饮用。关于此事，兄可另行转交研究院解析其成分。<br />
              至于此人详细的测试数据，兄可静候研究院报告……<br />
              ——东园注：正式报告登记明白就好，一切都以谛天鉴的意思为准……哎，老林他还是这么说话文绉绉的。
            </p>
          </div>
        </div>
      </section>

      <!-- 新增三大主题区域 -->
      <section id="food" class="card special-section">
        <div class="card-head">
          <h2>杯中物</h2>
        </div>
        <div class="content two-col">
          <div class="img-area">
            <img src="./img/item1.png" loading="lazy" decoding="async" />
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
      </section>
      <section id="shattered-crystal" class="card special-section">
        <div class="card-head">
          <h2>铁中剑</h2>
        </div>
        <div class="content two-col">
          <div class="img-area">
            <img src="./img/item2.png" loading="lazy" decoding="async" />
          </div>
          <div class="text-block">
            <p>
              仇远平日佩戴的明庭镇抚司信物，按理他早就应该褪下这身公服，信物也应被没收。只是似乎因为有人在明庭暗中帮了他一把，最终让他留下了这一切。
            </p>
            <p>“……我将剑交到你们手中，百官各州，凡见此物，如同见我。”</p>
          </div>
        </div>
      </section>

      <section id="cyclic-clock" class="card special-section">
        <div class="card-head">
          <h2>竹中声</h2>
        </div>
        <div class="content two-col">
          <div class="img-area">
            <img src="./img/item3.png" loading="lazy" decoding="async" />
          </div>
          <div class="text-block">
            <p>他对于这个世界的第一印象，不是眼看的，而是听到的。</p>

            <p>
              他听到父母的无奈，听到重州山林中无数毛竹的空洞，听到刀和剑，听到师父的血，听到仇人的怒号。
            </p>
            <p>
              后来，他听到光亮，听到明庭里数不清的明争暗斗，听到贪官墨吏的告饶，听到一场阴谋，听到另一种仇恨和希望。
            </p>
            <p>
              他看不到，但他一切都听得清楚。因为有许多声音，在他听到时，它就已经在那里了。如同剑生于铁，玉生于石，音生于竹。
            </p>
          </div>
        </div>
      </section>

      <section id="collective-album" class="card special-section">
        <div class="card-head">
          <h2>重州麻辣豆腐</h2>
        </div>
        <div class="content two-col">
          <div class="img-area">
            <img src="./img/food.png" loading="lazy" decoding="async" />
          </div>
          <div class="text-block">
            <p>
              过去当差时，仇远和他的弟兄们日夜兼程，风餐露宿，没什么机会吃顿好饭，即便是到了外地的馆子住下，也要因为防备而亲自下厨做饭。而出身于重州的仇远早年间也恰恰懂得几个小菜，鲜香麻辣，最是解馋下饭，讲究的就是畅快。
            </p>
            <p>“好好吃饭，好好活着。</p>
          </div>
        </div>
      </section>
      <!-- 通缉卡（左图、右描述；无按钮） -->
      <section id="wanted-slim" class="card wanted-slim-board">
        <div class="card-head">
          <h2>通缉令（简洁）</h2>
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
                残星会的会监之一。 外号“黑羊”。<br />

                非常疯狂，享受混乱与破坏，以他人的痛苦为乐。<br />

                曾在瑝珑跟踪并试探主角（漂泊者），后在今州的「瑝览类书」事件中被主角和今汐联手击败，被关押在今州大牢一年多，后越狱被仇远追杀中。
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
                夜归的前任将军。<br />
                仇远曾接到追杀还是伍长的哥舒临的命令，但仇远经过调查认为其并非恶徒心善放走了他。<br>
                后在“弯刀之役”中，于北落野与强敌无相燹主决战。为了给军队创造机会，他留下死守的命令，自己以烈火焚躯的方式与敌人同归于尽，最终下落不明。
                因那道导致夜归死伤惨重的军令，在瑝珑的历史上被视为罪人。（以上内容均为各处整合现关于哥舒临的谜团还很多）
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
          <h2 id="timeline-heading">共鸣链详解</h2>
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
              :aria-label="``"
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
        <div class="card" role="region" aria-labelledby="stories-title">
          <header class="card-head">
            <h2 id="stories-title" class="card-title">仇远纪事</h2>
          </header>

          <main class="card-body">
            <transition name="fade-slide" mode="out-in">
              <article
                :key="items[current].id"
                :id="`panel-${items[current].id}`"
                class="story"
                role="tabpanel"
                :aria-labelledby="`tab-${items[current].id}`"
              >
                <h3 class="story-head">{{ items[current].title }}</h3>
                <div
                  class="story-content"
                  v-html="items[current].content"
                ></div>
              </article>
            </transition>
          </main>

          <footer class="card-foot">
            <button class="nav-btn" @click="prev" aria-label="上一则故事">
              ‹
            </button>
            <div class="pager">{{ current + 1 }} / {{ items.length }}</div>
            <button class="nav-btn" @click="next" aria-label="下一则故事">
              ›
            </button>
          </footer>
        </div>
      </section>
    </main>
    <div class="floating-chibis">
      <img
        v-for="(pet, i) in chibiList"
        :key="i"
        :src="pet.src"
        :style="{ top: pet.top + 'px', left: pet.left + 'px' }"
        class="chibi-img"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const timeline = ref([
  {
    title: "如剑不动，相由心生",
    desc: ` 答剑·弦歌不辍、答剑·割股之心、答剑·忠烈死节免疫打断。
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

const reducedMotion =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

function select(index) {
  current.value = index;
  // 将焦点移回当前 tab（便于无障碍与键盘导航）
  const id = `tab-${items[index].id}`;
  const el = document.getElementById(id);
  if (el) el.focus();
}
const storyRef = ref<HTMLElement | null>(null);

function prev() {
  current.value = (current.value - 1 + items.length) % items.length;
  select(current.value);
  storyRef.value.scrollIntoView({ behavior: "smooth", block: "start" });
}

function next() {
  current.value = (current.value + 1) % items.length;
  select(current.value);
  storyRef.value.scrollIntoView({ behavior: "smooth", block: "start" });
}
interface Chibi {
  src: string;
  top: number;
  left: number;
}

const chibiList = ref<Chibi[]>([]);
onMounted(async () => {
  if (!reducedMotion) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".avatar-card", {
      duration: 0.8,
      y: 18,
      opacity: 0,
      scale: 0.99,
    }).from(
      ".right-col > .hero-panel .name",
      { duration: 0.9, x: 24, opacity: 0 },
      "-=0.45"
    );

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

    gsap.to(".avatar-card", {
      scale: 1.007,
      duration: 2.8,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  } else {
    document.documentElement.classList.add("reduced-motion");
  }

  // 1. 基础配置信息
  const total = 6;
  let pickCount = 3; // 每次抽取 3 张
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isMobile = window.innerWidth <= 768;
  // 如果已知单张小人图片的宽高，可避免超出边界；
  // 假设小人图片宽 100px、高 100px，按需替换：
  const imgWidth = 100;
  const imgHeight = 100;

  // 2. Fisher–Yates 洗牌函数
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // 3. 随机选出 3 个编号
  if (isMobile) {
    pickCount = 1;
  }
  const nums = shuffle(Array.from({ length: total }, (_, k) => k + 1));
  const picks = nums.slice(0, pickCount);

  // 4. 生成随机位置并填充 chibiList
  chibiList.value = []; // 先清空
  picks.forEach((i) => {
    chibiList.value.push({
      src: `/QImages/1 (${i}).png`,
      left: Math.random() * (vw - imgWidth), // 保证不超出左右边界
      top: Math.random() * (vh - imgHeight), // 保证不超出上下边界
    });
  });

  // 2. 等 img 渲染到 DOM
  await nextTick();

  // 3. 给每个小人绑定 GSAP 动画
  const imgs = document.querySelectorAll<HTMLImageElement>(".chibi-img");
  imgs.forEach((img, index) => {
    const padding = 200; // 边缘预留空间
    // ✅ 初始出场动画（闪现）
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

    // ✅ 鼠标靠近闪避
    img.addEventListener("mouseenter", () => {
      gsap.killTweensOf(img);

      gsap.to(img, {
        x: "+=" + ((Math.random() - 0.5) * 400).toFixed(0),
        y: "+=" + ((Math.random() - 0.5) * 400).toFixed(0),
        duration: 1.2,
        ease: "back.out(2)",
        onComplete: () => {
          // 闪避完成后，再重新启用动画
          animate(img);
        },
      });
    });

    const animate = (img: HTMLImageElement) => {
      let { x, y } = img.getBoundingClientRect();
      let deltaX = (Math.random() - 0.5) * 200;
      let deltaY = (Math.random() - 0.5) * 200;

      // 预测一下偏移后的位置
      let nextX = x + deltaX;
      let nextY = y + deltaY;

      // 校正：防漂出左、右、上、下边界
      if (nextX < padding) deltaX = padding - x;
      if (nextX + img.width > window.innerWidth - padding)
        deltaX = window.innerWidth - padding - (x + img.width);
      if (nextY < padding) deltaY = padding - y;
      if (nextY + img.height > window.innerHeight - padding)
        deltaY = window.innerHeight - padding - (y + img.height);

      gsap.to(img, {
        x: `+=${deltaX.toFixed(0)}`,
        y: `+=${deltaY.toFixed(0)}`,
        rotation: `+=${((Math.random() - 0.5) * 60).toFixed(0)}`,
        duration: 2 + Math.random() * 2,
        ease: "power1.inOut",
        onComplete: () => animate(img),
      });
    };
    animate(img);
  });
});
</script>

<style scoped lang="scss">
/* 仇远风格 —— 紫蓝海感（水母/幻海） + 毒药/治愈双重高光 */
$bg-deep: #060e12; // 深海夜色底
$deep-2: #0a1416; // 次深底用于渐变
$accent-1: #2e8f74; // 暗紫主光（冷雅）
$accent-2: #cfeee8; // 冷海蓝高光（湿光感）

$text-main: #e8f6f4;
$card-bg: rgba(6, 8, 12, 0.46);
$card-border: rgba(184, 107, 224, 0.06);
$soft-shadow: rgba(0, 0, 0, 0.6);
$inner-glow: rgba(184, 107, 224, 0.03);
/* 固定浮动小 chibi 层（保留） */
.floating-chibis {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  .chibi-img {
    position: absolute;
    width: 80px;
    user-select: none;
    transform-origin: center center;
    pointer-events: auto;
    z-index: 10;
  }
}

.megumi-page {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, $bg-deep 0%, $deep-2 72%);
  font-family: "Noto Sans SC", system-ui, -apple-system, "Segoe UI", Roboto,
    Arial;
  color: $text-main;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: clamp(20px, 4vw, 80px);
  box-sizing: border-box;
  padding-top: 60px;

  &.reduced-motion * {
    transition: none !important;
    animation: none !important;
  }

  .container {
    position: relative;
    z-index: 10;
    max-width: 1100px;
    margin: 0 auto;
    padding: clamp(12px, 2vw, 40px);
  }
}

/* ========== HERO 区域（整体暗化 + 血玫点光） ========== */
.hero {
  position: relative;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 28px;
  align-items: start;
  padding: 12px;
  margin-bottom: 12px;

  /* 乐谱画布 —— 在 hero 背后增加五线谱移动感 */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image: repeating-linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.02) 0px,
      rgba(255, 255, 255, 0.02) 1px,
      transparent 1px,
      transparent 16px
    );
    opacity: 0.06;
    mix-blend-mode: overlay;
    transform: translateY(-4%);
    animation: staff-drift 16s linear infinite;
  }

  .left-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 6;
  }

  .avatar-card {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.01),
      rgba(184, 107, 224, 0.01)
    );
    border-radius: 16px;
    padding: 12px;
    display: grid;
    justify-items: center;
    gap: 8px;
    border: 1px solid $card-border;
    box-shadow: 0 14px 44px $soft-shadow, inset 0 1px 0 $inner-glow;
    cursor: pointer;
    transition: transform 0.28s ease, box-shadow 0.28s ease;
    width: 100%;
  }

  .avatar-wrap {
    width: 100%;
    display: block;
  }

  .avatar {
    width: 100%;
    height: auto;
    border-radius: 12px;
    display: block;
    box-shadow: 0 12px 34px rgba(0, 0, 0, 0.5), 0 0 18px rgba($accent-1, 0.03);
    transition: transform 0.5s ease, filter 0.5s ease;
    background-color: rgba(0, 0, 0, 0.04);
    filter: saturate(0.8) contrast(0.95) brightness(0.92);
  }

  .avatar-card:hover .avatar {
    transform: translateY(-4px) scale(1.02);
    filter: saturate(0.7) contrast(0.9) brightness(0.9);
  }

  .avatar-meta {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .avatar-badge {
    font-size: 0.9rem;
    color: $text-main;
    background: rgba(0, 0, 0, 0.18);
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba($accent-2, 0.05);
    font-weight: 600;
  }

  .right-col {
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 6;
  }

  .hero-panel {
    position: relative;
    z-index: 6;
    padding: 20px;
    border-radius: 14px;
    background: $card-bg;
    backdrop-filter: blur(8px) saturate(0.9);
    border: 1px solid $card-border;
    box-shadow: 0 12px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 $inner-glow;
  }

  .name {
    font-size: clamp(1.8rem, 3vw, 2.8rem);
    margin: 0;
    font-weight: 900;
    letter-spacing: 1px;
    line-height: 1;
    display: inline-block;
    /* 标题改为 暗紫 → 血玫 渐变 */
    background: linear-gradient(90deg, $accent-1 0%, $accent-2 70%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    -webkit-text-stroke: 0.2px rgba(0, 0, 0, 0.22);
    text-shadow: 0 10px 36px rgba(0, 0, 0, 0.65);
    position: relative;
  }

  .jp {
    font-size: 0.95rem;
    color: $accent-1;
    margin-left: 8px;
    font-weight: 400;
  }

  .subtitle {
    margin: 6px 0 0;
    font-size: 1.1rem;
    color: $accent-1;
    font-weight: 600;
    line-height: 1.4;
  }

  .lead {
    margin: 10px 0 0;
    color: $text-main;
    opacity: 0.96;
    line-height: 1.7;
    max-width: 72ch;
  }
}

/* ========== 通用卡片（更暗、更锐利的边与血色提示） ========== */
.card {
  margin-top: 24px;
  background: rgba(6, 6, 8, 0.5);
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  color: $text-main;
  border: 1px solid $card-border;
  transition: transform 0.28s ease, box-shadow 0.28s ease;

  &:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.7);
  }

  h2 {
    margin: 0 0 12px 0;
    font-size: 1.3rem;
    color: $accent-2;
  }

  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
}

/* personality 列表样式（暗紫细线） */
.personality .traits li {
  padding: 12px 0;
  border-bottom: 1px dashed rgba($accent-1, 0.06);
  font-size: 1rem;
  color: rgba($text-main, 0.92);
}

/* overview 双栏布局（保持） */
.overview .two-col {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.overview .text-block {
  flex: 1 1 40%;
  min-width: 240px;
  line-height: 1.6;
  color: rgba($text-main, 0.96);
}

/* special-section：加入音符漂浮和暗紫边框 */
.special-section {
  position: relative;
  overflow: hidden;

  .content {
    display: flex;
    gap: 24px;
    align-items: center;
    margin-top: 16px;
  }

  .img-area {
    flex: 0 0 200px;

    img {
      width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 14px 44px rgba(0, 0, 0, 0.6), 0 0 12px rgba($accent-1, 0.02);
      border: 1px solid rgba($accent-1, 0.03);
    }
  }

  .text-block {
    flex: 1;
    line-height: 1.6;
    color: rgba($text-main, 0.95);
  }
}

/* ll-stories — 暗底 + 微血色分割线 */
.ll-stories {
  .card {
    width: min(1200px, 100%);
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6),
      inset 0 1px 0 rgba($accent-1, 0.02);
    color: $text-main;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: linear-gradient(
      180deg,
      rgba(8, 10, 12, 0.12),
      rgba(8, 6, 10, 0.06)
    );
  }

  .card-head {
    padding: 14px 16px;
    border-bottom: 1px solid rgba($accent-2, 0.03);
    display: flex;
    flex-direction: column;
    gap: 12px;

    .card-title {
      font-size: 24px;
      font-weight: 700;
      color: $accent-1;
      letter-spacing: 0.6px;
    }
  }

  .card-body {
    padding: 18px 16px;
    min-height: 160px;
    position: relative;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(8, 8, 10, 0.02));
  }

  .story {
    color: rgba($text-main, 0.96);

    .story-head {
      font-size: 18px;
      color: $accent-2;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .story-content {
      line-height: 1.7;
      color: rgba($text-main, 0.92);
      white-space: pre-wrap;
    }
  }

  .card-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 14px;
    border-top: 1px solid rgba($accent-1, 0.02);
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.02),
      rgba(0, 0, 0, 0.04)
    );

    .nav-btn {
      background: transparent;
      border: 1px solid rgba($accent-1, 0.06);
      color: $accent-2;
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 180ms ease;
      &:hover {
        background: rgba($accent-2, 0.04);
      }
    }

    .pager {
      color: rgba($text-main, 0.72);
      font-size: 13px;
      font-weight: 600;
    }
  }

  /* 切换动画保留，但更暗 */
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 320ms cubic-bezier(0.2, 0.9, 0.2, 1);
  }

  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(6px);
  }

  .fade-slide-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-6px);
  }
}
.wanted-slim-board {
  margin-top: 20px;
  padding: 12px;
  border-radius: 12px;
  background: linear-gradient(
    180deg,
    rgba(8, 10, 12, 0.48),
    rgba(6, 6, 8, 0.36)
  );
  border: 1px solid rgba(255, 255, 255, 0.02);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.55);
  color: $text-main;

  .card-head {
    margin-bottom: 8px;
  }

  .wanted-slim-list {
    list-style: none;
    margin: 0;
    padding: 6px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .wanted-slim-item {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    padding: 12px;
    border-radius: 10px;
    background: linear-gradient(
      180deg,
      rgba(6, 8, 10, 0.02),
      rgba(6, 6, 8, 0.01)
    );
    border: 1px solid rgba(255, 255, 255, 0.01);
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    position: relative;
    overflow: visible;

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.62), inset 0 0 22px;
    }

    /* 左侧缩略图区（带通缉装饰） */
    .ws-thumb {
      flex: 0 0 220px;
      width: 220px;
      height: 300px;
      margin: 0;
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.02),
        rgba(0, 0, 0, 0.06)
      );
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.02);

      img {
        display: block;
        width: 220px;
        height: 300px;
        object-fit: cover;
        transition: transform 0.32s ease, filter 0.32s ease;
        filter: saturate(0.9) contrast(0.95);
      }
      &:hover img {
        transform: scale(1.03);
      }

      /* 纸张边缘：轻微旧纸 + 撕裂感（纯 CSS） */
      &::before {
        content: "";
        position: absolute;
        inset: 6px;
        border-radius: 6px;
        pointer-events: none;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.06));
        box-shadow: inset 0 0 18px rgba(0, 0, 0, 0.45);
        mix-blend-mode: multiply;
      }

      /* 右下角燃烧/污渍效果（装饰） */
      &::after {
        content: "";
        position: absolute;
        right: -22px;
        bottom: -22px;
        width: 120px;
        height: 120px;
        pointer-events: none;
        background: radial-gradient(
          circle at 30% 30%,
          rgba(40, 20, 10, 0.08),
          transparent 35%
        );
        transform: rotate(-18deg);
        opacity: 0.9;
      }

      /* 红色印章（“通缉”） */
      .seal {
        position: absolute;
        left: 10px;
        top: 12px;
        z-index: 6;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 86px;
        height: 86px;
        border-radius: 50%;
        background: linear-gradient(
          180deg,
          rgba(200, 20, 20, 0.98),
          rgba(160, 12, 12, 0.95)
        );
        color: #fff;
        font-weight: 900;
        font-size: 18px;
        transform: rotate(-18deg);
        box-shadow: 0 8px 18px rgba(160, 10, 10, 0.28);
        text-shadow: 0 2px 6px rgba(0, 0, 0, 0.45);
        border: 2px solid rgba(255, 255, 255, 0.06);
        letter-spacing: 1px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        pointer-events: none;
        opacity: 0.95;
      }

      /* 订书钉 / 钉痕（用小矩形模拟） */
      .staple {
        position: absolute;
        width: 22px;
        height: 6px;
        background: linear-gradient(
          90deg,
          rgba(200, 200, 200, 0.98),
          rgba(140, 140, 140, 0.9)
        );
        border-radius: 2px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.45);
        transform: rotate(-18deg);
        z-index: 7;
      }
      .staple-top {
        left: 18px;
        top: -8px;
        transform: rotate(-8deg);
      }
      .staple-bottom {
        right: 18px;
        bottom: -8px;
        transform: rotate(6deg);
      }
    } /* .ws-thumb end */

    /* 右侧描述区 */
    .ws-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .ws-name {
        margin: 0;
        font-size: 1.15rem;
        color: $accent-2;
        font-weight: 700;
      }

      .ws-brief {
        margin: 0;
        color: rgba($text-main, 0.92);
        line-height: 1.5;
        font-size: 0.98rem;
      }
    } /* .ws-info end */
  }
} /* .wanted-slim-item end */

/* timeline（暗紫竖线 + 微光） */
.timeline {
  position: relative;

  .tl-wrap {
    position: relative;
    padding: 24px 12px 12px 96px;
  }

  .vl {
    position: absolute;
    left: 80px;
    top: 32px;
    bottom: 20px;
    width: 4px;
    border-radius: 6px;
    background: linear-gradient(
      180deg,
      rgba($accent-2, 0.12),
      rgba($accent-1, 0.1)
    );
    box-shadow: 0 6px 18px rgba($accent-1, 0.06),
      inset 0 0 10px rgba($accent-1, 0.02);
    opacity: 0.95;
  }

  .tl-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .tl-item {
    position: relative;
    display: flex;
    gap: 18px;
    align-items: flex-start;
    margin: 20px 0;
    transition: transform 0.28s ease, box-shadow 0.28s ease;
  }

  .tl-card {
    background: rgba(8, 6, 10, 0.36);
    border-radius: 12px;
    padding: 16px 20px;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.55);
    width: calc(100% - 130px);
    border-left: 4px solid transparent;
    transition: transform 0.28s ease, box-shadow 0.28s ease,
      border-color 0.28s ease;
    position: relative;
    z-index: 2;
  }

  .tl-item:hover .tl-card,
  .tl-item:focus-within .tl-card {
    transform: translateY(-8px);
    box-shadow: 0 24px 72px rgba(0, 0, 0, 0.6);
    border-left-color: rgba($accent-2, 0.18);
  }

  .tl-title {
    margin: 0 0 6px 0;
    font-size: 1.1rem;
    color: $accent-1;
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  .tl-desc {
    margin: 0;
    color: rgba($text-main, 0.92);
    white-space: pre-wrap;
  }
}

/* 浮动音符（可在模板中渲染若干 .floating-note） */
.floating-note {
  position: absolute;
  font-size: 14px;
  color: $accent-2;
  opacity: 0.95;
  transform-origin: center;
  animation: note-float 4.6s ease-in-out infinite;
  filter: drop-shadow(0 6px 18px rgba($accent-2, 0.06));
}

/* 动画关键帧 */
@keyframes staff-drift {
  0% {
    transform: translateY(-4%);
    opacity: 0.9;
  }
  50% {
    transform: translateY(6%);
    opacity: 0.95;
  }
  100% {
    transform: translateY(-4%);
    opacity: 0.9;
  }
}

@keyframes note-float {
  0% {
    transform: translateY(0) rotate(-6deg) scale(0.95);
    opacity: 0.85;
  }
  50% {
    transform: translateY(-12px) rotate(3deg) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(0) rotate(-6deg) scale(0.95);
    opacity: 0.85;
  }
}

/* 响应式：小屏适配（保留原逻辑，仅小幅调整文字色调与阴影） */
@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 8px;
  }

  .avatar-card {
    width: 140px;
    padding: 8px;
  }

  .hero-panel {
    padding: 14px;
  }

  .name {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .lead {
    font-size: 0.95rem;
  }

  .card {
    padding: 18px;
    border-radius: 12px;
  }

  .overview .two-col {
    flex-direction: column;
  }

  .special-section .content {
    flex-direction: column;
  }

  .ll-stories {
    .card {
      border-radius: 10px;
    }

    .card-head {
      padding: 12px 12px;
    }

    .card-body {
      padding: 14px 12px;
      min-height: 180px;
    }

    .card-foot {
      padding: 8px 12px;
    }
  }

  .timeline {
    overflow: visible;
  }

  .timeline .tl-wrap {
    padding-left: 14px !important;
    padding-right: 14px;
    min-height: 0;
  }

  .timeline .vl {
    display: none !important;
  }

  .timeline .tl-list {
    overflow: visible;
  }

  .timeline .tl-item {
    display: block !important;
    margin: 14px 0 !important;
    width: 100%;
  }

  .timeline .tl-card {
    width: 100% !important;
    padding: 14px !important;
    border-left: 0 !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
    transform: none !important;
  }

  .wanted-slim-list {
    grid-template-columns: 1fr;
  }
  .wanted-slim-item {
    flex-direction: column;
    align-items: stretch;
  }
  .ws-thumb {
    width: 100%;
    height: auto;
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
  .ws-info {
    padding-top: 8px;
  }
  .ws-thumb .seal {
    left: 12px;
    top: 10px;
    transform: rotate(-12deg);
    width: 64px;
    height: 64px;
    font-size: 14px;
  }
}
</style>
