// ===== Hamburger Menu =====
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list");

  if (hamburger && navList) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navList.classList.toggle("open");
    });

    // Close menu when a link is clicked
    navList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navList.classList.remove("open");
      });
    });
  }

  // ===== Header scroll effect =====
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  // ===== Back to top button =====
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("visible", window.scrollY > 400);
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ===== FAQ Chatbot =====
  const chatbotBtn = document.querySelector(".chatbot-btn");
  const chatbotLabel = document.querySelector(".chatbot-label");
  const chatbotWindow = document.getElementById("chatbot-window");
  const chatbotClose = document.querySelector(".chatbot-close");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotSend = document.getElementById("chatbot-send");

  const faqData = [
    {
      keywords: ["診療時間", "何時", "営業時間", "受付時間", "時間"],
      answer: "診療時間は以下の通りです。\n\n<b>平日</b>：9:00〜12:00 / 13:30〜17:00\n<b>土曜</b>：9:00〜12:00（午前のみ）\n\n※受付は終了30分前までにお越しください。"
    },
    {
      keywords: ["アクセス", "場所", "住所", "行き方", "どこ", "駐車場", "駐車", "バス"],
      answer: "〒050-0072 北海道室蘭市高砂町5丁目7番12号\n\n<b>バス</b>：道南バス「工大前」下車 徒歩約2分\n<b>駐車場</b>：4台（無料）\n\n詳しくは<a href='access.html' style='color:#769164;font-weight:600;'>アクセスページ</a>をご覧ください。"
    },
    {
      keywords: ["初診", "初めて", "はじめて", "持ち物", "必要なもの", "持っていく"],
      answer: "初診の方は以下をお持ちください。\n\n・健康保険証\n・お薬手帳（お持ちの方）\n・紹介状（お持ちの方）\n・各種医療証（該当する方）\n\n予約不要で直接ご来院いただけます。詳しくは<a href='first-visit.html' style='color:#769164;font-weight:600;'>はじめての方</a>をご覧ください。"
    },
    {
      keywords: ["予約", "予約制", "電話", "電話番号"],
      answer: "当院は<b>予約不要</b>です。直接ご来院ください。\n\nお問い合わせはお電話で：\n📞 <a href='tel:0143-44-1155' style='color:#769164;font-weight:600;'>0143-44-1155</a>"
    },
    {
      keywords: ["診療科目", "科目", "何科", "内科", "消化器"],
      answer: "診療科目は<b>内科</b>と<b>消化器内科</b>です。\n\n外来診療のみで、入院施設はありません。\n詳しくは<a href='ambulatory.html' style='color:#769164;font-weight:600;'>診療案内</a>をご覧ください。"
    },
    {
      keywords: ["休診", "休み", "お休み", "祝日", "日曜"],
      answer: "休診日は以下の通りです。\n\n・日曜日、祝日\n・第2・第4土曜日\n・年末年始、お盆\n\n最新情報は<a href='index.html' style='color:#769164;font-weight:600;'>お知らせ</a>をご確認ください。"
    },
    {
      keywords: ["院長", "先生", "医師", "ドクター"],
      answer: "院長のご紹介は<a href='about.html' style='color:#769164;font-weight:600;'>ごあいさつページ</a>をご覧ください。"
    },
    {
      keywords: ["外国語", "英語", "対応"],
      answer: "当院では外国語対応を行っております。また、視覚・聴覚障がいのある方への配慮も行っています。"
    }
  ];

  function findAnswer(text) {
    const normalized = text.toLowerCase().replace(/\s+/g, "");
    let bestMatch = null;
    let bestScore = 0;
    for (const faq of faqData) {
      let score = 0;
      for (const kw of faq.keywords) {
        if (normalized.includes(kw)) score++;
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = faq;
      }
    }
    if (bestMatch) return bestMatch.answer;
    return "申し訳ありません、お答えできる情報が見つかりませんでした。\n\nお電話でお問い合わせください。\n📞 <a href='tel:0143-44-1155' style='color:#769164;font-weight:600;'>0143-44-1155</a>";
  }

  function addMessage(html, sender) {
    const div = document.createElement("div");
    div.className = "chat-msg " + sender;
    const p = document.createElement("p");
    p.innerHTML = html.replace(/\n/g, "<br>");
    div.appendChild(p);
    chatbotMessages.appendChild(div);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function showTypingThenReply(text) {
    const typing = document.createElement("div");
    typing.className = "chat-msg bot chat-typing";
    typing.innerHTML = "<p>入力中...</p>";
    chatbotMessages.appendChild(typing);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    setTimeout(() => {
      typing.remove();
      addMessage(findAnswer(text), "bot");
    }, 600);
  }

  function handleUserInput(text) {
    if (!text.trim()) return;
    addMessage(text, "user");
    chatbotInput.value = "";
    showTypingThenReply(text);
  }

  if (chatbotBtn && chatbotWindow) {
    chatbotBtn.addEventListener("click", () => {
      chatbotWindow.classList.toggle("open");
      if (chatbotLabel) chatbotLabel.style.display = chatbotWindow.classList.contains("open") ? "none" : "";
      if (chatbotWindow.classList.contains("open")) chatbotInput.focus();
    });

    chatbotClose.addEventListener("click", () => {
      chatbotWindow.classList.remove("open");
      if (chatbotLabel) chatbotLabel.style.display = "";
    });

    chatbotSend.addEventListener("click", () => handleUserInput(chatbotInput.value));
    chatbotInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleUserInput(chatbotInput.value);
    });

    document.querySelectorAll("#chat-suggestions button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const q = btn.getAttribute("data-q");
        addMessage(btn.textContent, "user");
        showTypingThenReply(q);
      });
    });
  }

  // ===== Active nav link =====
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-list a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
});
