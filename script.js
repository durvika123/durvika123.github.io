const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const heartField = $("#heartField");
const confetti = $("#confetti");
const envelope = $("#envelope");
const beginBtn = $("#beginBtn");
const tapZone = $("#tapZone");
const meterFill = $("#meterFill");
const meterText = $("#meterText");
const gameReveal = $("#gameReveal");
const surpriseBtn = $("#surpriseBtn");
const modal = $("#modal");
const closeModal = $("#closeModal");
const modalBackdrop = $("#modalBackdrop");
const moreLoveBtn = $("#moreLoveBtn");
const secretBtn = $("#secretBtn");
const secretToast = $("#secretToast");
const noteBubble = $("#noteBubble");
const likeBtn = $("#likeBtn");
const likeReaction = $("#likeReaction");
const choiceMessage = $("#choiceMessage");

let love = 0;
let audioContext = null;

function chime(freq = 520, duration = 0.12, type = "sine") {
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.06, audioContext.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
    osc.connect(gain); gain.connect(audioContext.destination);
    osc.start(); osc.stop(audioContext.currentTime + duration + 0.02);
  } catch {}
}

function scrollToSection(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
}

beginBtn.addEventListener("click", () => {
  chime();
  scrollToSection(".like-section");
});

$("#heroHeart").addEventListener("click", () => {
  chime(650);
  burstHearts(12);
  confettiBurst(20);
});

$("#heroHeart").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    burstHearts(10);
  }
});

likeBtn.addEventListener("click", () => {
  chime(630, .12);
  burstHearts(20);
  likeReaction.textContent = "Well… now you're both in trouble. ♡";
  likeBtn.innerHTML = "Hearts successfully exchanged ♥";
  likeBtn.disabled = true;
  confettiBurst(35);
});

envelope.addEventListener("click", () => {
  const opened = envelope.classList.toggle("open");
  chime(opened ? 620 : 420, opened ? .16 : .10);
  burstHearts(opened ? 18 : 5);
});

$$(".choice-heart").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".choice-heart").forEach((b) => b.classList.remove("selected"));
    button.classList.add("selected");
    choiceMessage.textContent = button.dataset.message;
    choiceMessage.style.transform = "scale(1.03)";
    choiceMessage.style.background = "#fff0f6";
    chime(520, .08);
    burstHearts(5);
    setTimeout(() => {
      choiceMessage.style.transform = "";
      choiceMessage.style.background = "";
    }, 320);
  });
});

function updateMeter() {
  love += Math.floor(Math.random() * 8) + 5;
  love = Math.min(love, 112);
  const visible = Math.min(love, 100);
  meterFill.style.width = `${visible}%`;
  meterText.textContent = love > 100 ? "∞%" : `${love}%`;

  if (love >= 100) {
    gameReveal.classList.add("show");
    confettiBurst(85);
    burstHearts(26);
    chime(780, .18);
  } else {
    burstHearts(3);
    chime(560, .07);
  }
}
tapZone.addEventListener("click", updateMeter);
tapZone.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    updateMeter();
  }
});

$$(".polaroid").forEach((card) => {
  card.addEventListener("click", () => {
    noteBubble.textContent = card.dataset.note;
    noteBubble.style.transform = "scale(1.03)";
    noteBubble.style.background = "#fff1f6";
    chime(480, .09);
    setTimeout(() => {
      noteBubble.style.transform = "";
      noteBubble.style.background = "";
    }, 280);
  });
});

function openModal() {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
  confettiBurst(120);
  burstHearts(35);
  chime(660, .13);
  setTimeout(() => chime(820, .16), 80);
}
function closeTheModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
}
surpriseBtn.addEventListener("click", openModal);
closeModal.addEventListener("click", closeTheModal);
modalBackdrop.addEventListener("click", closeTheModal);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeTheModal(); });

moreLoveBtn.addEventListener("click", () => {
  burstHearts(65);
  confettiBurst(70);
  chime(720, .13);
  setTimeout(() => chime(910, .13), 90);
});

secretBtn.addEventListener("click", () => {
  secretToast.classList.add("show");
  burstHearts(15);
  chime(600, .10);
  clearTimeout(window.secretTimer);
  window.secretTimer = setTimeout(() => secretToast.classList.remove("show"), 4300);
});

function burstHearts(count = 10) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "float-heart";
    el.textContent = Math.random() > .2 ? "♥" : "♡";
    el.style.left = `${45 + Math.random() * 10}%`;
    el.style.fontSize = `${12 + Math.random() * 24}px`;
    el.style.setProperty("--drift", `${-180 + Math.random() * 360}px`);
    el.style.animationDuration = `${2.6 + Math.random() * 2.2}s`;
    el.style.animationDelay = `${Math.random() * .28}s`;
    el.style.color = Math.random() > .5 ? "#ef6f9d" : "#df5d8e";
    heartField.appendChild(el);
    setTimeout(() => el.remove(), 5200);
  }
}

function confettiBurst(count = 90) {
  const symbols = ["♡", "♥", "✦", "✧"];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "confetti-piece";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.width = `${6 + Math.random() * 8}px`;
    el.style.height = `${8 + Math.random() * 10}px`;
    el.style.fontSize = `${10 + Math.random() * 10}px`;
    el.style.color = Math.random() > .5 ? "#df5d8e" : "#b783d1";
    el.style.setProperty("--dx", `${-260 + Math.random() * 520}px`);
    el.style.setProperty("--rot", `${-360 + Math.random() * 720}deg`);
    el.style.animationDelay = `${Math.random() * .25}s`;
    confetti.appendChild(el);
    setTimeout(() => el.remove(), 2200);
  }
}

$$(".tilt").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${y * -6}deg) rotateY(${x * 7}deg) translateY(-3px)`;
  });
  card.addEventListener("mouseleave", () => { card.style.transform = ""; });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

$$("section:not(.hero), footer").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});

let typed = "";
document.addEventListener("keydown", (e) => {
  if (e.key.length !== 1) return;
  typed = (typed + e.key.toLowerCase()).slice(-4);
  if (typed === "love") {
    typed = "";
    burstHearts(35);
    confettiBurst(45);
    secretToast.classList.add("show");
    secretToast.querySelector("p").textContent = "You found the secret code. I love you. Obviously. ♡";
    setTimeout(() => secretToast.classList.remove("show"), 4500);
  }
});

setInterval(() => {
  if (document.visibilityState === "visible") burstHearts(1);
}, 1350);
