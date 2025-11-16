const UPGRADE_COST = 100;
const SPEED_INCREASE = 0.25;
const originalUpdateCookies = updateCookies;

var cookieMultiplier =
  parseFloat(localStorage.getItem("cookieMultiplier")) || 1;

updateCookies = function () {
  if (typeof cookies !== "undefined") {
    const baseGain = 1;
    const gain = baseGain * cookieMultiplier;
    cookies += gain;
    cookiesDisplay.textContent = Math.floor(cookies);
    if (typeof renderAscii === "function") renderAscii();
    if (typeof saveCookies === "function") saveCookies();
  }
};

function speedUpgrade() {
  if (cookies < UPGRADE_COST) {
    alert("Not enough cookies!");
    return;
  }
}

cookies -= UPGRADE_COST;
cookieMultiplier += SPEED_INCREASE;
cookiesDisplay.textContent = Math.floor(cookies);

if (typeof saveCookies === "function") saveCookies();
saveMultiplier();

const multiplierDisplay = document.getElementById("multiplier-count");
if (multiplierDisplay) {
  multiplierDisplay.textContent = cookieMultiplier.toFixed(2) + "x";
}
alert(
  `Upgraded cookie production (Yes they spawn from thin air!) Speed is now ${cookieMultiplier.toFixed(
    2
  )}x`
);

function saveMultiplier() {
  localStorage.setItem("cookieMultiplier", cookieMultiplier);
}

document.addEventListener("DOMContentLoaded", () => {
  const multiplierDisplay = document.getElementById("multiplier-count");
  if (multiplierDisplay) {
    multiplierDisplay.textContent = cookieMultiplier.toFixed(2) + "x";
  }
});
