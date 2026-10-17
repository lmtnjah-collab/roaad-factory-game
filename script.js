const app = document.getElementById("app");
const guide = document.getElementById("guide");
const guideText = document.getElementById("guideText");
const guideBubble = document.getElementById("guideBubble");
const guideToggle = document.getElementById("guideToggle");
const mascotButton = document.getElementById("mascotButton");
const mascotMouth = document.getElementById("mascotMouth");

const topBar = document.getElementById("topBar");
const progressTrack = document.getElementById("progressTrack");
const progressSteps = Array.from(document.querySelectorAll(".progress-step"));

const startScreen = document.getElementById("startScreen");
const challengeScreen = document.getElementById("challengeScreen");
const resultScreen = document.getElementById("resultScreen");
const finalScreen = document.getElementById("finalScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const challengeCounter = document.getElementById("challengeCounter");
const balanceValue = document.getElementById("balanceValue");
const challengeTag = document.getElementById("challengeTag");
const challengeTitle = document.getElementById("challengeTitle");
const challengeDescription = document.getElementById("challengeDescription");
const choicesContainer = document.getElementById("choicesContainer");

const sceneIcon = document.getElementById("sceneIcon");
const sceneTitle = document.getElementById("sceneTitle");
const sceneHint = document.getElementById("sceneHint");
const challengeSceneCard = document.getElementById("challengeSceneCard");
const sceneCaption = document.getElementById("sceneCaption");
const sceneFocus = document.getElementById("sceneFocus");

const resultStatus = document.getElementById("resultStatus");
const resultMessage = document.getElementById("resultMessage");
const resultIcon = document.getElementById("resultIcon");
const impactChip = document.getElementById("impactChip");
const spentValue = document.getElementById("spentValue");
const remainingValue = document.getElementById("remainingValue");
const resultCelebration = document.getElementById("resultCelebration");

const finalTitle = document.getElementById("finalTitle");
const finalSummary = document.getElementById("finalSummary");
const goodCountEl = document.getElementById("goodCount");
const mediumCountEl = document.getElementById("mediumCount");
const finalBalanceEl = document.getElementById("finalBalance");

const scenes = {
  employees: {
    caption: "طاقم التغليف ناقص، والصناديق تنتظر على خط الإنتاج.",
    focus: "راقبي الموظفين وخط التغليف قبل اختيار الحل.",
    markup: `
      <div class="scene-base scene-employees">
        <div class="scene-label">قسم التغليف</div>
        <div class="shift-board"><strong>تنبيه فوري</strong> عاملان غائبان قبل موعد التسليم.</div>
        <div class="warning-ring"></div>
        <div class="worker w1"></div>
        <div class="worker w2"></div>
        <div class="missing-slot"></div>
        <div class="helper-worker"></div>
        <div class="temp-worker"></div>
        <div class="team-arrow">إعادة توزيع ذكية</div>
        <div class="cost-tag">تكلفة أعلى</div>
        <div class="box b1"></div>
        <div class="box b2"></div>
        <div class="conveyor"></div>
      </div>
    `,
  },
  quality: {
    caption: "ألواح زجاج مرفوضة تحتاج تحليل السبب الحقيقي قبل زيادة الخسائر.",
    focus: "راقبي نقاط الرفض وعدسة الفحص لتفهمي مصدر المشكلة.",
    markup: `
      <div class="scene-base scene-quality">
        <div class="scene-label">قسم الجودة</div>
        <div class="training-badge">تدريب الموظفين ✅</div>
        <div class="manual-badge">فحص يدوي مكثف 🔍</div>
        <div class="glass-board g1"></div>
        <div class="glass-board g2"></div>
        <div class="glass-board g3"></div>
        <div class="reject-dot d1"></div>
        <div class="reject-dot d2"></div>
        <div class="reject-dot d3"></div>
        <div class="scan-line"></div>
        <div class="lens"></div>
      </div>
    `,
  },
  contract: {
    caption: "فرصة عقد مغرية، لكن الحفاظ على الاحتياطي النقدي لا يقل أهمية.",
    focus: "راقبي الاحتياطي النقدي وتأثير القرار على السيولة.",
    markup: `
      <div class="scene-base scene-contract">
        <div class="scene-label">الإدارة المالية</div>
        <div class="paper"></div>
        <div class="reserve-meter">
          <strong>الاحتياطي النقدي</strong>
          <div class="reserve-track"><div class="reserve-fill"></div></div>
        </div>
        <div class="coin c1"></div>
        <div class="coin c2"></div>
        <div class="shield"></div>
        <div class="pause-chip">حفاظ على السيولة</div>
        <div class="deal-chip">التزام مالي مباشر</div>
      </div>
    `,
  },
};

const challenges = [
  {
    tag: "تنبيه من قسم الإنتاج",
    title: "نقص مفاجئ في الموظفين",
    description: "قبل موعد تجهيز شحنة زجاج بيوم واحد، تغيّب موظفان من قسم التغليف. عليك اختيار أفضل طريقة لتعويض النقص دون الإضرار بسير العمل.",
    sceneClass: "app-scene-challenge1",
    sceneKey: "employees",
    sceneIcon: "👥",
    sceneTitle: "موقف تشغيلي",
    sceneHint: "وازني بين السرعة والتكلفة",
    guideHint: "يا ساتر! عندنا نقص مفاجئ قبل تسليم الشحنة. هل نحلها داخليًا أم ندفع أكثر لبديل أسرع؟",
    options: [
      {
        title: "إعادة توزيع الموظفين",
        cost: 800,
        text: "حل داخلي سريع بأقل تكلفة، مع زيادة مؤقتة في ضغط العمل بالقسم الآخر.",
        level: "good",
        sceneAction: "stage-redistribute",
        resultTitle: "إدارة مالية جيدة جدًا!",
        resultMessage: "نجحت في تعويض النقص بأقل تكلفة مع الاستفادة من الموارد البشرية المتاحة.",
        resultIcon: "👏",
        impactLabel: "قرار متزن وذكي",
      },
      {
        title: "الاستعانة بعمالة مؤقتة",
        cost: 2000,
        text: "تعويض النقص دون التأثير على الأقسام الأخرى، لكن بتكلفة أعلى.",
        level: "medium",
        sceneAction: "stage-tempStaff",
        resultTitle: "إدارة مالية متوسطة.",
        resultMessage: "عالجت نقص الموظفين دون الضغط على الأقسام الأخرى، لكنك أنفقت مبلغًا أكبر رغم توفر بديل داخلي مناسب.",
        resultIcon: "💸",
        impactLabel: "حل سريع لكن أعلى تكلفة",
      },
    ],
  },
  {
    tag: "تنبيه من قسم الجودة",
    title: "تكلفة الجودة",
    description: "ارتفعت نسبة الألواح الزجاجية المرفوضة من 3% إلى 7% خلال الأسبوع الماضي. تشير المراجعة الأولية إلى أخطاء متكررة في إجراءات الفحص اليدوي.",
    sceneClass: "app-scene-challenge2",
    sceneKey: "quality",
    sceneIcon: "🔍",
    sceneTitle: "تحسين الجودة",
    sceneHint: "اختاري حلاً يعالج السبب الحقيقي",
    guideHint: "نسبة الرفض ارتفعت. الحل الأرخص الآن ليس دائمًا الأفضل لاحقًا... فكري في جذور المشكلة.",
    options: [
      {
        title: "تدريب موظفي الفحص والجودة",
        cost: 2200,
        text: "استثمار في معالجة السبب المحتمل للمشكلة وتقليل الأخطاء مستقبلًا.",
        level: "good",
        sceneAction: "stage-training",
        resultTitle: "إدارة مالية جيدة جدًا!",
        resultMessage: "استثمرت في معالجة السبب المحتمل للمشكلة، مما يساعد على تقليل الأخطاء المتكررة والخسائر مستقبلًا.",
        resultIcon: "✅",
        impactLabel: "استثمار يعالج الجذر",
      },
      {
        title: "تكثيف الفحص اليدوي فقط",
        cost: 1200,
        text: "حل أسرع وأقل تكلفة الآن، لكنه لا يعالج سبب المشكلة بالكامل.",
        level: "medium",
        sceneAction: "stage-manualOnly",
        resultTitle: "إدارة مالية متوسطة.",
        resultMessage: "ساعدت في اكتشاف الألواح غير المطابقة، لكن السبب الأساسي للأخطاء قد يستمر مما يعني احتمالية تكاليف إضافية مستقبلًا.",
        resultIcon: "🔎",
        impactLabel: "تحكم مؤقت بالمشكلة",
      },
    ],
  },
  {
    tag: "تنبيه من الإدارة المالية",
    title: "العقد المغري",
    description: "وصل عرض لتوريد دفعة إضافية من الزجاج بقيمة 9,000 ريال، لكن تنفيذ العقد يتطلب دفع 4,000 ريال الآن، بينما سيقوم العميل بالسداد بعد 30 يومًا. كما أوصى المسؤول المالي بالحفاظ على احتياطي نقدي لا يقل عن 2,000 ريال للطوارئ.",
    sceneClass: "app-scene-challenge3",
    sceneKey: "contract",
    sceneIcon: "💰",
    sceneTitle: "قرار مالي",
    sceneHint: "حافظي على السيولة قبل التوسع",
    guideHint: "العقد يبدو مغريًا، لكن لا تنسي الاحتياطي النقدي. الربح المستقبلي لا يفيد إذا ضاقت السيولة الآن.",
    options: [
      {
        title: "قبول العقد الآن",
        cost: 4000,
        text: "فرصة لتحقيق عائد مستقبلي، لكنها قد تضغط السيولة الحالية بشكل كبير.",
        level: "medium",
        sceneAction: "stage-acceptDeal",
        resultTitle: "إدارة مالية متوسطة.",
        resultMessage: "قد يحقق العقد ربحًا مستقبلًا، لكن السيولة المتاحة انخفضت قبل تحصيل الإيرادات، مما قد يضعف قدرة المصنع على مواجهة الطوارئ.",
        resultIcon: "⚠️",
        impactLabel: "ربح محتمل مقابل ضغط نقدي",
      },
      {
        title: "تأجيل قبول العقد",
        cost: 0,
        text: "المحافظة على السيولة الحالية وتفادي ضغط مالي إضافي على التشغيل.",
        level: "good",
        sceneAction: "stage-delayDeal",
        resultTitle: "إدارة مالية جيدة جدًا!",
        resultMessage: "أعطيت الأولوية لاستقرار المصنع واحتياجاته التشغيلية بدل الالتزام بعقد جديد قبل التأكد من توفر السيولة الكافية.",
        resultIcon: "🛡️",
        impactLabel: "حفاظ ممتاز على السيولة",
      },
    ],
  },
];

let currentChallengeIndex = 0;
let balance = 10000;
let goodCount = 0;
let mediumCount = 0;
let lastGuideMessage = "";
let typingTimer;

function formatCurrency(value) {
  return `${Number(value).toLocaleString("en-US")} ر.س`;
}

function animateCurrency(element, from, to, duration = 650) {
  const start = performance.now();
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.round(from + (to - from) * progress);
    element.textContent = formatCurrency(value);
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function setMascotMood(mood) {
  if (!mascotMouth) return;
  const mouthShapes = {
    happy: "M76 103 Q90 119 104 103",
    worried: "M76 112 Q90 99 104 112",
    celebrate: "M76 101 Q90 123 104 101",
  };
  mascotMouth.setAttribute("d", mouthShapes[mood] || mouthShapes.happy);
}

function typeGuideMessage(message) {
  clearInterval(typingTimer);
  guideText.textContent = "";
  let i = 0;
  typingTimer = setInterval(() => {
    guideText.textContent = message.slice(0, i + 1);
    i += 1;
    if (i >= message.length) clearInterval(typingTimer);
  }, 16);
}

function say(message, mood = "happy", typing = true) {
  lastGuideMessage = message;
  guide.classList.remove("is-talking", "mood-happy", "mood-worried", "mood-celebrate");
  void guide.offsetWidth;
  guide.classList.add("is-talking", `mood-${mood}`);
  setMascotMood(mood);
  guideBubble.classList.remove("closed");
  if (typing) typeGuideMessage(message);
  else guideText.textContent = message;
}

guideToggle.addEventListener("click", () => guideBubble.classList.add("closed"));
mascotButton.addEventListener("click", () => {
  if (guideBubble.classList.contains("closed")) guideBubble.classList.remove("closed");
  say(lastGuideMessage || "أنا هنا إذا احتجتِ تلميحًا أو تذكيرًا بالمهمة.", "happy");
});

function setScene(sceneClass) {
  app.className = `app ${sceneClass}`;
}

function showScreen(screen) {
  [startScreen, challengeScreen, resultScreen, finalScreen].forEach((s) => s.classList.remove("active"));
  screen.classList.add("active");
  window.scrollTo({ top: 0, behavior: "instant" });
}

function updateTopBar() {
  challengeCounter.textContent = `${currentChallengeIndex + 1} / ${challenges.length}`;
  balanceValue.textContent = formatCurrency(balance);
}

function updateProgress(completed = false) {
  progressSteps.forEach((step, index) => {
    step.classList.toggle("done", completed || index < currentChallengeIndex);
    step.classList.toggle("current", !completed && index === currentChallengeIndex);
  });
}

function renderChallengeScene(sceneKey) {
  const scene = scenes[sceneKey];
  challengeSceneCard.className = "challenge-scene-card";
  challengeSceneCard.innerHTML = scene.markup;
  sceneCaption.textContent = scene.caption;
  sceneFocus.textContent = scene.focus;
}

function renderChallenge() {
  const challenge = challenges[currentChallengeIndex];

  challengeTag.textContent = challenge.tag;
  challengeTitle.textContent = challenge.title;
  challengeDescription.textContent = challenge.description;
  sceneIcon.textContent = challenge.sceneIcon;
  sceneTitle.textContent = challenge.sceneTitle;
  sceneHint.textContent = challenge.sceneHint;
  renderChallengeScene(challenge.sceneKey);

  choicesContainer.innerHTML = "";
  challenge.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.innerHTML = `
      <span class="choice-title">${option.title}</span>
      <span class="choice-cost">التكلفة: ${formatCurrency(option.cost)}</span>
      <span class="choice-text">${option.text}</span>
    `;
    button.addEventListener("click", () => chooseOption(option, button));
    choicesContainer.appendChild(button);
  });

  setScene(challenge.sceneClass);
  topBar.classList.remove("hidden");
  progressTrack.classList.remove("hidden");
  updateTopBar();
  updateProgress(false);
  showScreen(challengeScreen);
  say(challenge.guideHint, "worried");
}

function playSceneOutcome(option) {
  challengeSceneCard.classList.remove(
    "stage-redistribute",
    "stage-tempStaff",
    "stage-training",
    "stage-manualOnly",
    "stage-acceptDeal",
    "stage-delayDeal"
  );
  challengeSceneCard.classList.add(option.sceneAction);
}

function chooseOption(option, clickedButton) {
  const prevBalance = balance;
  const nextBalance = balance - option.cost;

  const allButtons = Array.from(document.querySelectorAll(".choice-btn"));
  allButtons.forEach((btn) => {
    btn.disabled = true;
    btn.classList.toggle("selected", btn === clickedButton);
    btn.classList.toggle("dimmed", btn !== clickedButton);
  });

  playSceneOutcome(option);
  sceneFocus.textContent = option.level === "good" ? "شوفي كيف تغير المشهد بعد القرار المتزن." : "القرار حل المشكلة، لكنه ترك أثرًا أعلى على الموارد.";

  say(
    option.level === "good"
      ? "أحسنتِ! هذا القرار يبدو متزنًا جدًا... دعيني أحسب أثره على الميزانية ✨"
      : "اختيار معقول. دعينا نرى الآن كيف أثّر هذا القرار على المصنع 👀",
    option.level === "good" ? "celebrate" : "happy"
  );

  setTimeout(() => {
    balance = nextBalance;
    if (option.level === "good") goodCount += 1;
    else mediumCount += 1;

    resultStatus.textContent = option.resultTitle;
    resultMessage.textContent = option.resultMessage;
    resultIcon.textContent = option.resultIcon;
    impactChip.textContent = option.impactLabel;
    spentValue.textContent = formatCurrency(option.cost);
    resultCelebration.textContent = option.level === "good" ? "✨ ⭐ ✨" : "🔎 💡 🔎";

    showScreen(resultScreen);
    animateCurrency(balanceValue, prevBalance, balance, 750);
    animateCurrency(remainingValue, prevBalance, balance, 750);

    say(
      option.level === "good"
        ? "ممتاز! حافظتِ على التوازن بين موارد المصنع وتكاليفه 👏"
        : "القرار نجح في التعامل مع المشكلة، لكن هناك مساحة لقرار أقوى لاحقًا. نكمل؟",
      option.level === "good" ? "celebrate" : "happy"
    );
  }, 1050);
}

function showFinalScreen() {
  setScene("app-scene-final");
  showScreen(finalScreen);
  topBar.classList.add("hidden");
  progressTrack.classList.add("hidden");
  updateProgress(true);

  goodCountEl.textContent = goodCount;
  mediumCountEl.textContent = mediumCount;
  finalBalanceEl.textContent = formatCurrency(balance);

  if (goodCount === 3) {
    finalTitle.textContent = "خبير في إدارة الموارد!";
    finalSummary.textContent = "أحسنت! تمكنت من الموازنة بين احتياجات التشغيل والحفاظ على استقرار الميزانية باتخاذ قرارات ذكية في جميع التحديات.";
  } else if (goodCount === 2) {
    finalTitle.textContent = "لديك حس إداري جيد";
    finalSummary.textContent = "اتخذت قرارات جيدة في معظم المواقف، وكان لديك وعي واضح بأهمية التوازن بين الموارد البشرية والمالية.";
  } else {
    finalTitle.textContent = "بداية جيدة وتحتاج إلى تطوير";
    finalSummary.textContent = "قراراتك ساعدت المصنع على الاستمرار، لكن الإدارة المالية تحتاج إلى دقة أكبر لتحقيق أفضل توازن ممكن.";
  }

  say("وصلنا للنهاية! 🎉 شكرًا لأنك ساعدتِ مصنع أفق الزجاج في اجتياز التحديات الثلاثة.", "celebrate");
}

function goNext() {
  currentChallengeIndex += 1;
  if (currentChallengeIndex < challenges.length) renderChallenge();
  else showFinalScreen();
}

function resetGame() {
  currentChallengeIndex = 0;
  balance = 10000;
  goodCount = 0;
  mediumCount = 0;

  setScene("app-scene-intro");
  topBar.classList.add("hidden");
  progressTrack.classList.add("hidden");
  balanceValue.textContent = formatCurrency(balance);
  showScreen(startScreen);
  say("أهلًا بك في مصنع أفق الزجاج! أنا ترسو ⚙️، وسأكون معك خطوة بخطوة. هل أنتِ جاهزة لإنقاذ الميزانية؟", "happy");
}

startBtn.addEventListener("click", renderChallenge);
nextBtn.addEventListener("click", goNext);
restartBtn.addEventListener("click", resetGame);

resetGame();
