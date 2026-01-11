// ===========================
// PASSWORD LOGIC + MUSIC
// ===========================
const enterBtn = document.getElementById("enterBtn");
const passwordInput = document.getElementById("passwordInput");
const passwordScreen = document.getElementById("password-screen");
const content = document.getElementById("content");
const errorText = document.getElementById("error");
const bgMusic = document.getElementById("bgMusic");

const correctPassword = "i love Karl"; // <-- Set your password here
const clues = [
  "Clue 1: Someone pogi 😉",
  "Clue 2: Think of someone you lab or hindi edi waw🌹",
  "Clue 3: I ___ ___? 😘",
  "Clue 4: I love? 💖",
  "Clue 5: DI moko love?? 💌"
];


let musicStarted = false;

enterBtn.addEventListener("click", () => {
  const input = passwordInput.value.trim().toLowerCase();

  if (input === correctPassword.toLowerCase()) {
    passwordScreen.style.display = "none";
    content.style.display = "block";

    // 🎵 Play music ONLY ONCE after correct password
    if (!musicStarted && bgMusic) {
      bgMusic.volume = 0.5;
      bgMusic.loop = true;
      bgMusic.play().catch(() => {});
      musicStarted = true;
    }
  } else {
    errorText.textContent =
      attempts < clues.length ? clues[attempts] : "Hmm… still not correct 💖";
    attempts++;
    passwordInput.value = "";
  }
});



// ===========================
// FLOATING EMOJIS
// ===========================
const emojiContainerMain = document.getElementById("floating-emojis-main");
const emojis = ["💖","🌹","🍫","🧸","🍬","🍭","🍩","🍪","🌸"];

function createFloatingEmoji() {
  if (emojiContainerMain.querySelectorAll(".emoji").length > 20) return;

  const emoji = document.createElement("div");
  emoji.classList.add("emoji","floating");
  emoji.textContent = emojis[Math.floor(Math.random()*emojis.length)];
  emoji.style.left = Math.random()*100 + "vw";
  emoji.style.animationDuration = 10 + Math.random()*5 + "s";

  emojiContainerMain.appendChild(emoji);
  setTimeout(() => emoji.remove(), 15000);
}
setInterval(createFloatingEmoji, 1500);

// ===========================
// ENVELOPE CLICK → HEART EXPLOSION
// ===========================
const envelope = document.getElementById("envelope");
if(envelope){
  const letter = envelope.querySelector(".hiddenLetter");
  const message = envelope.querySelector(".envelopeMessage");
  const explosionZone = envelope.querySelector(".explosionZone");

  envelope.addEventListener("click", () => {
    const envelopeEmoji = envelope.querySelector(".envelopeEmoji");
    if (!envelopeEmoji || envelopeEmoji.style.display === "none") return;

    envelopeEmoji.style.animation = "explode 0.5s forwards";
    if(message) message.style.display = "none";

    setTimeout(() => {
      envelopeEmoji.style.display = "none";
      if(letter){
        letter.style.display = "block";
        letter.style.animation = "popLetter 0.6s ease forwards";
      }

      const containerRect = emojiContainerMain.getBoundingClientRect();
      const zoneRect = explosionZone.getBoundingClientRect();

      for(let i=0; i<10; i++){
        const heart = document.createElement("div");
        heart.textContent = "💖";
        heart.className = "emoji explosion";

        const angle = Math.random()*2*Math.PI;
        const radius = Math.random()*(zoneRect.width/2);

        heart.style.left = (zoneRect.left-containerRect.left + zoneRect.width/2 + radius*Math.cos(angle)) + "px";
        heart.style.top = (zoneRect.top-containerRect.top + zoneRect.height/2 + radius*Math.sin(angle)) + "px";

        heart.style.setProperty("--dx", `${(Math.random()-0.5)*200}px`);
        heart.style.setProperty("--dy", `${-100-Math.random()*100}px`);
        heart.style.animationDuration = 2 + Math.random()*2 + "s";

        emojiContainerMain.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
      }
    }, 500);
  });
}

// ===========================
// FLOWER BOUQUET CLICK → EXPLOSION + MESSAGE
// ===========================
const boque = document.getElementById("boque");
if(boque){
  const flowerBoque = boque.querySelector(".flowerBoque");
  const loveMessage = document.createElement("div");
  loveMessage.className = "boqueText";
  loveMessage.textContent = "I ❤️ YOU!";
  loveMessage.style.display = "none";
  boque.appendChild(loveMessage);

  let boqueOpened = false;

  boque.addEventListener("click", () => {
    if(boqueOpened) return;
    boqueOpened = true;

    // Shake
    flowerBoque.style.transition = "transform 0.15s ease-in-out";
    flowerBoque.style.transform = "rotate(-20deg) scale(1.2)";
    setTimeout(() => flowerBoque.style.transform = "rotate(20deg) scale(1.2)", 150);
    setTimeout(() => flowerBoque.style.transform = "scale(0)", 300);

    // Explosion
    const flowers = ["🌹","🌷","🌸","🌻","💐","🌺"];
    const sparkles = ["✨","💖"];
    const totalParticles = 30;

    const boqueRect = flowerBoque.getBoundingClientRect();
    const containerRect = emojiContainerMain.getBoundingClientRect();

    for(let i=0; i<totalParticles; i++){
      const particle = document.createElement("div");
      particle.textContent = Math.random() < 0.75 
        ? flowers[Math.floor(Math.random()*flowers.length)]
        : sparkles[Math.floor(Math.random()*sparkles.length)];
      particle.className = "emoji explosion";

      const angle = Math.random()*2*Math.PI;
      const distance = 100 + Math.random()*150;

      particle.style.left = boqueRect.left - containerRect.left + boqueRect.width/2 + "px";
      particle.style.top = boqueRect.top - containerRect.top + boqueRect.height/2 + "px";

      particle.style.setProperty("--dx", Math.cos(angle)*distance + "px");
      particle.style.setProperty("--dy", Math.sin(angle)*distance + "px");
      particle.style.animationDuration = 1.5 + Math.random()*1.5 + "s";

      emojiContainerMain.appendChild(particle);
      setTimeout(() => particle.remove(), 4000);
    }

    // Love message animation
    setTimeout(() => {
      loveMessage.style.display = "block";
      loveMessage.style.opacity = "0";
      loveMessage.style.transform = "translateY(20px) scale(0.8)";
      loveMessage.style.transition = "all 1s ease";
      requestAnimationFrame(() => {
        loveMessage.style.opacity = "1";
        loveMessage.style.transform = "translateY(0) scale(1)";
      });
    }, 700);
  });
}

// ===========================
// GIFT BOX CLICK → REVEAL MEMORIES
// ===========================
const giftBox = document.getElementById("giftBox");
const memoryContainer = document.getElementById("memoryContainer");

if(giftBox && memoryContainer){
  giftBox.addEventListener("click", () => {
    giftBox.style.transform = "scale(0)";
    setTimeout(() => {
      giftBox.style.display = "none";
      memoryContainer.style.display = "flex";
    }, 300);
  });
}

// ===========================
// MEMORY CARD FLIP
// ===========================
document.querySelectorAll(".memoryCard").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});


