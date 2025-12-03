import { outer } from '@/core/outer.js';

let initialized = false;
let lastHealthValue = 100;

const updateHealthBars = () => {
  const doc = outer.document;

  // === HP Display ===
  const healthContainer = doc.querySelector("#ui-health-container");
  if (healthContainer) {
    const bar = healthContainer.querySelector("#ui-health-actual");
    if (bar) {
      const currentHealth = Math.round(parseFloat(bar.style.width) || 0);

      let percentageText = healthContainer.querySelector(".surplus-health-text");

      if (!percentageText) {
        percentageText = doc.createElement("span");
        percentageText.classList.add("surplus-health-text");
        Object.assign(percentageText.style, {
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
          textShadow: "2px 2px 3px #000, -1px -1px 2px #000",
          zIndex: "10",
          pointerEvents: "none",
        });
        healthContainer.style.position = "relative";
        healthContainer.appendChild(percentageText);
      }

      percentageText.textContent = `${currentHealth}%`;
      lastHealthValue = currentHealth;
    }
  }

  // === Boost/Adrénaline Display ===
  const boostCounter = doc.querySelector("#ui-boost-counter");
  if (boostCounter) {
    const boostBars = boostCounter.querySelectorAll(".ui-boost-base .ui-bar-inner");
    let totalBoost = 0;
    const weights = [25, 25, 40, 10];

    boostBars.forEach((bar, index) => {
      const width = parseFloat(bar.style.width);
      if (!isNaN(width)) {
        totalBoost += width * (weights[index] / 100);
      }
    });

    const averageBoost = Math.round(totalBoost);

    let boostDisplay = boostCounter.querySelector(".surplus-boost-display");

    if (!boostDisplay) {
      boostDisplay = doc.createElement("div");
      boostDisplay.classList.add("surplus-boost-display");
      Object.assign(boostDisplay.style, {
        position: "absolute",
        left: "0",
        top: "-22px",
        color: "#fff",
        backgroundColor: "rgba(180, 40, 40, 0.85)",
        padding: "3px 8px",
        borderRadius: "4px",
        fontFamily: "Arial, sans-serif",
        fontSize: "12px",
        fontWeight: "bold",
        zIndex: "10",
        pointerEvents: "none",
      });
      boostCounter.style.position = "relative";
      boostCounter.appendChild(boostDisplay);
    }

    boostDisplay.textContent = `AD: ${averageBoost}%`;
    boostDisplay.style.display = averageBoost > 0 ? "block" : "none";
  }
};

const init = () => {
  if (initialized) return;
  initialized = true;

  const checkReady = setInterval(() => {
    const doc = outer.document;
    const healthBar = doc.querySelector("#ui-health-actual");
    if (healthBar) {
      clearInterval(checkReady);
      setInterval(updateHealthBars, 100);
      console.log('🟢 HealthDisplay initialized');
    }
  }, 500);
};

export default init;