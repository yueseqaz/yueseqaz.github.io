// app.js (样式调整版 - 完整)

console.log("app.js: Script loaded (CDN v8 version - vocab match rule - styled - full)");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAne8BgU2Ae9XTlMwdIg7tBydlDksOz5Xg", // 替换为你的 API Key
  authDomain: "sakura-8952e.firebaseapp.com", // 替换为你的 Auth Domain
  databaseURL: "https://sakura-8952e-default-rtdb.asia-southeast1.firebasedatabase.app", // 替换为你的 Database URL
  projectId: "sakura-8952e", // 替换为你的 Project ID
  storageBucket: "sakura-8952e.firebasestorage.app", // 替换为你的 Storage Bucket
  messagingSenderId: "810437418245", // 替换为你的 Messaging Sender ID
  appId: "1:810437418245:web:3f15ea2f8232d23ae52b6c", // 替换为你的 App ID
  // measurementId: "G-YOUR_MEASUREMENT_ID" // 如果使用 Analytics，取消注释并替换
};

// Initialize Firebase
let app;
let db;

try {
  if (typeof firebase !== 'undefined' && typeof firebase.initializeApp === 'function') {
    app = firebase.initializeApp(firebaseConfig);
    db = firebase.database();
    console.log("app.js: Firebase initialized successfully (CDN v8 version).");
  } else {
    throw new Error("Firebase SDK (v8) not loaded or incorrect version. Check script tags in HTML.");
  }
} catch (error) {
  console.error("app.js: Firebase initialization failed (CDN v8 version):", error);
  alert("Firebase 初始化失败，请检查控制台错误信息！");
}

// 游戏逻辑变量
let timerIntervalId;
let startTime;
let groupName = "";
let flippedCards = [];
let allGameCardsData = [];

// 配对游戏卡片内容
const words = [
 { id: 1, term: "Requirement", definition: "需求 (用户期望)" },
  { id: 2, term: "Design", definition: "设计 (系统蓝图)" },
  { id: 3, term: "Implementation", definition: "实现 (编码)" },
  { id: 4, term: "Testing", definition: "测试 (验证质量)" },
  { id: 5, term: "Maintenance", definition: "维护 (持续改进)" },
  { id: 6, term: "Waterfall Model", definition: "瀑布模型 (线性开发)" },
  { id: 7, term: "Agile", definition: "敏捷开发 (迭代灵活)" },
  { id: 8, term: "Scrum", definition: "Scrum框架 (敏捷方法)" },
  { id: 9, term: "Version Control", definition: "版本控制 (如Git)" },
  { id: 10, term: "UML", definition: "统一建模语言" },
  { id: 11, term: "Refactoring", definition: "重构 (改进代码)" },
  { id: 12, term: "Debugging", definition: "调试 (修复错误)" },
  { id: 13, term: "Software Lifecycle", definition: "软件生命周期" },
  { id: 14, term: "Prototype", definition: "原型 (早期模型)" },
];

// 游戏开始
function startGame() {
  console.log("app.js: startGame() called");
  groupName = document.getElementById("groupName").value.trim();
  if (!groupName) {
    alert("请输入组名");
    return;
  }

  document.getElementById("timer").innerText = `⏱️ 用时：0.0 秒`;
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
  }
  flippedCards = [];
  allGameCardsData = [];

  startTime = Date.now();
  timerIntervalId = setInterval(updateTimer, 100);

  generateGameGrid();

  const startButton = document.getElementById("startGameButton");
  if (startButton) startButton.disabled = true;
  const groupNameInput = document.getElementById("groupName");
  if (groupNameInput) groupNameInput.disabled = true;
}

// 更新计时器
function updateTimer() {
  const elapsed = (Date.now() - startTime) / 1000;
  document.getElementById("timer").innerText = `⏱️ 用时：${elapsed.toFixed(1)} 秒`;
}

// 打乱数组顺序
function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// 生成配对卡片 (样式调整版)
function generateGameGrid() {
  console.log("app.js: generateGameGrid() called - initial text visible - styled");
  const gameGrid = document.getElementById("gameGrid");
  if (!gameGrid) {
    console.error("app.js: gameGrid element not found!");
    return;
  }
  gameGrid.innerHTML = "";
  allGameCardsData = [];

  words.forEach(wordEntry => {
    allGameCardsData.push({
      id: wordEntry.id,
      type: 'term',
      text: wordEntry.term,
      cardId: `card-${wordEntry.id}-term`
    });
    allGameCardsData.push({
      id: wordEntry.id,
      type: 'definition',
      text: wordEntry.definition,
      cardId: `card-${wordEntry.id}-definition`
    });
  });

  allGameCardsData = shuffle(allGameCardsData);

  allGameCardsData.forEach((cardData) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add(
      "card",
      "bg-white", "text-gray-700",
      "rounded-lg", "shadow-md",
      "p-3",
      "flex", "items-center", "justify-center", "text-center",
      "h-24", "sm:h-28", // 响应式高度
      "text-xs", "sm:text-sm", // 响应式字号
      "font-medium",
      "select-none", "cursor-pointer",
      "break-words",
      "leading-snug"
    );

    cardElement.dataset.originalId = cardData.id;
    cardElement.dataset.cardType = cardData.type;
    cardElement.dataset.cardId = cardData.cardId;

    cardElement.textContent = cardData.text;

    cardElement.onclick = () => handleCardClick(cardElement, cardData);
    gameGrid.appendChild(cardElement);
  });
  console.log("app.js: Game grid generated with styled cards.");
}

// 处理卡片点击事件 (样式调整版)
function handleCardClick(cardElement, cardData) {
  console.log("app.js: handleCardClick() for card:", cardData.cardId, `Type: ${cardData.type}`, `Text: ${cardData.text}`);

  if (cardElement.classList.contains("bg-green-500") ||
      flippedCards.find(fc => fc.element === cardElement) ||
      flippedCards.length === 2) {
    console.log("app.js: Card click ignored (matched, already selected, or 2 cards open).");
    return;
  }

  cardElement.classList.remove("bg-white", "text-gray-700");
  cardElement.classList.add("bg-yellow-400", "text-black");

  flippedCards.push({ element: cardElement, data: cardData });
  console.log("app.js: Selected cards:", flippedCards.map(f => `${f.data.cardId} (${f.data.type})`));

  if (flippedCards.length === 2) {
    const [firstFlipped, secondFlipped] = flippedCards;

    if (firstFlipped.data.id === secondFlipped.data.id &&
        firstFlipped.data.type !== secondFlipped.data.type) {
      console.log("app.js: Match found!", `(${firstFlipped.data.text} & ${secondFlipped.data.text})`);
      setTimeout(() => {
        firstFlipped.element.classList.remove("bg-yellow-400", "text-black");
        firstFlipped.element.classList.add("bg-green-500", "text-white", "pointer-events-none", "opacity-90");

        secondFlipped.element.classList.remove("bg-yellow-400", "text-black");
        secondFlipped.element.classList.add("bg-green-500", "text-white", "pointer-events-none", "opacity-90");

        flippedCards = [];
        checkGameOver();
      }, 300);
    } else {
      console.log("app.js: No match.");
      setTimeout(() => {
        firstFlipped.element.classList.remove("bg-yellow-400", "text-black");
        firstFlipped.element.classList.add("bg-white", "text-gray-700");

        secondFlipped.element.classList.remove("bg-yellow-400", "text-black");
        secondFlipped.element.classList.add("bg-white", "text-gray-700");
        
        flippedCards = [];
      }, 800);
    }
  }
}

// 检查游戏是否结束
function checkGameOver() {
  console.log("app.js: checkGameOver() called");
  const matchedCardsCount = document.querySelectorAll("#gameGrid .bg-green-500").length;
  console.log("app.js: Matched cards count:", matchedCardsCount, "Total cards:", allGameCardsData.length);

  if (allGameCardsData.length > 0 && matchedCardsCount === allGameCardsData.length) {
    clearInterval(timerIntervalId);
    const timeSpent = (Date.now() - startTime) / 1000;
    
    setTimeout(() => {
        alert(`恭喜 ${groupName}！游戏结束！\n用时：${timeSpent.toFixed(1)} 秒`);
        saveScore(groupName, timeSpent);

        const startButton = document.getElementById("startGameButton");
        if (startButton) startButton.disabled = false;
        const groupNameInput = document.getElementById("groupName");
        if (groupNameInput) groupNameInput.disabled = false;
    }, 100);
  }
}

// 存储分数到 Firebase
function saveScore(groupNameToSave, time) {
  if (!db) {
    console.error("app.js: Firebase Database not initialized (v8). Cannot save score.");
    alert("数据库连接失败，无法保存成绩。");
    return;
  }
  const sanitizedGroupName = groupNameToSave.replace(/[.#$[\]]/g, "_");
  // 每个组的成绩用 组名_时间戳 的方式保存，允许同一组有多次记录
  // 如果希望每个组只保留最新/最好成绩，可以只用 sanitizedGroupName 作为 key，但 set 会覆盖
  const scoreDBRef = db.ref('scores/' + sanitizedGroupName + '_' + Date.now()); 

  scoreDBRef.set({
    groupName: groupNameToSave, // 存储原始组名以便显示
    time: parseFloat(time.toFixed(1))
  }).then(() => {
    console.log("app.js: Score saved successfully to Firebase (v8).");
    loadRanking();
  }).catch((error) => {
    console.error("app.js: Failed to save score to Firebase (v8):", error);
    alert(`保存成绩失败: ${error.message}`);
  });
}

// 加载实时排名
function loadRanking() {
  if (!db) {
    console.error("app.js: Firebase Database not initialized (v8). Cannot load ranking.");
    const rankingElement = document.getElementById("rankingList");
    if (rankingElement) rankingElement.innerHTML = "<li>数据库连接失败，无法加载排名。</li>";
    return;
  }
  const rankingElement = document.getElementById("rankingList");
  if (!rankingElement) {
      console.error("app.js: rankingList element not found!");
      return;
  }
  rankingElement.innerHTML = "<li>正在加载排名...</li>";

  const scoresQuery = db.ref('scores').orderByChild('time').limitToFirst(10); // 只加载前10名

  scoresQuery.once('value').then((snapshot) => {
    rankingElement.innerHTML = ""; // 清空 "正在加载..."
    if (snapshot.exists()) {
      console.log("app.js: Ranking data received from Firebase (v8).");
      const scoresData = [];
      snapshot.forEach((childSnapshot) => {
        scoresData.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      
      // snapshot.forEach 对于 orderByChild 已经按顺序返回
      scoresData.forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `第 ${index + 1} 名: ${score.groupName} - ${score.time.toFixed(1)} 秒`;
        rankingElement.appendChild(listItem);
      });

      if (scoresData.length === 0) { // 理论上 snapshot.exists() 为 true 时不会到这里，但作为保险
         rankingElement.innerHTML = "<li>暂无排名数据</li>";
      }
    } else {
      console.log("app.js: No ranking data found in Firebase (v8).");
      rankingElement.innerHTML = "<li>暂无排名数据</li>";
    }
  }).catch((error) => {
    console.error("app.js: Failed to load ranking from Firebase (v8):", error);
    rankingElement.innerHTML = `<li>加载排名失败: ${error.message}</li>`;
  });
}

// --- 页面加载完成后执行 ---
document.addEventListener('DOMContentLoaded', () => {
  console.log("app.js: DOMContentLoaded event fired.");
  
  const startButton = document.getElementById("startGameButton");
  if(startButton) {
      startButton.addEventListener('click', startGame);
  }

  if (db) { // 确保 Firebase 初始化成功后再加载排名
    loadRanking();
  } else {
    console.warn("app.js: Firebase 'db' object not ready at DOMContentLoaded (v8), ranking not loaded yet.");
    const rankingElement = document.getElementById("rankingList");
    if (rankingElement) rankingElement.innerHTML = "<li>Firebase 初始化失败，无法加载排名。</li>";
  }

  const groupNameInput = document.getElementById("groupName");
  if (groupNameInput) {
    groupNameInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (startButton && !startButton.disabled) { // 确保按钮是可用的才触发
          startGame();
        }
      }
    });
  }
});