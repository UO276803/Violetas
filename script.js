const screens = {
  welcome: document.getElementById("welcome"),
  builder: document.getElementById("builder"),
  final: document.getElementById("final")
};

let flowerCount = 5;
let wrapping = "natural";

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("startBtn").addEventListener("click", () => showScreen("builder"));

document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".choice").forEach(choice => choice.classList.remove("selected"));
    button.classList.add("selected");
    flowerCount = Number(button.dataset.count);
    updatePreviewFlowers();
  });
});

function updatePreviewFlowers() {
  const flowers = document.querySelectorAll(".mini-flower");
  flowers.forEach((flower, index) => {
    flower.style.opacity = index < Math.min(flowerCount, flowers.length) ? "1" : "0";
    flower.style.transform = index < Math.min(flowerCount, flowers.length) ? "scale(1)" : "scale(.3)";
  });
}

document.getElementById("nextBtn").addEventListener("click", () => {
  document.getElementById("flowerOptions").classList.add("hidden");
  document.getElementById("paperOptions").classList.remove("hidden");
  document.getElementById("stepNumber").textContent = "02";
});

document.getElementById("backBtn").addEventListener("click", () => {
  document.getElementById("paperOptions").classList.add("hidden");
  document.getElementById("flowerOptions").classList.remove("hidden");
  document.getElementById("stepNumber").textContent = "01";
});

document.querySelectorAll(".wrap-choice").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".wrap-choice").forEach(choice => choice.classList.remove("selected"));
    button.classList.add("selected");
    wrapping = button.dataset.wrap;
    updateWrapping();
  });
});

function updateWrapping() {
  const colors = {
    natural: ["#ddc9b3", "#9876a5"],
    lilac: ["#d9c9df", "#80618f"],
    cream: ["#eee5d5", "#a78d70"]
  };
  const [paper, ribbon] = colors[wrapping];
  document.querySelector(".wrap-paper").style.background = paper;
  document.querySelector(".wrap-ribbon").style.borderColor = ribbon;
}

function createConfetti() {
  const container = document.getElementById("confetti");
  container.innerHTML = "";
  for (let i = 0; i < 34; i++) {
    const piece = document.createElement("i");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 3}s`;
    piece.style.animationDuration = `${3 + Math.random() * 3}s`;
    container.appendChild(piece);
  }
}

document.getElementById("finishBtn").addEventListener("click", () => {
  const flowers = document.querySelectorAll(".big-flower");
  flowers.forEach((flower, index) => {
    flower.style.display = index < flowerCount ? "block" : "none";
  });

  const paperColors = {
    natural: ["#ddc9b3", "#9473a2"],
    lilac: ["#d9c9df", "#80618f"],
    cream: ["#eee5d5", "#a78d70"]
  };
  const [paper, ribbon] = paperColors[wrapping];
  document.querySelector(".final-paper").style.background = paper;
  document.querySelector(".final-bow").style.borderColor = ribbon;
  document.querySelector(".final-bow").style.setProperty("--bow-color", ribbon);
  createConfetti();
  showScreen("final");
});

document.getElementById("restartBtn").addEventListener("click", () => {
  document.getElementById("flowerOptions").classList.remove("hidden");
  document.getElementById("paperOptions").classList.add("hidden");
  document.getElementById("stepNumber").textContent = "01";
  document.querySelectorAll(".choice").forEach(choice => {
    choice.classList.toggle("selected", Number(choice.dataset.count) === 5);
  });
  document.querySelectorAll(".wrap-choice").forEach(choice => {
    choice.classList.toggle("selected", choice.dataset.wrap === "natural");
  });
  flowerCount = 5;
  wrapping = "natural";
  updatePreviewFlowers();
  updateWrapping();
  showScreen("welcome");
});

updatePreviewFlowers();
