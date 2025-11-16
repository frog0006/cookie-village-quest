// updating the cookie variables
var cookies = 0;

var health = 100;
var cookiesEaten = 0;

const cookiesDisplay = document.getElementById("cookies");

function loadCookies() {
  if (localStorage.getItem("savedCookies")) {
    cookies = localStorage.getItem("savedCookies");
    cookies = parseInt(cookies);
  }
  if (localStorage.getItem("savedHealth")) {
    health = localStorage.getItem("savedHealth");
    health = parseInt(health);
  }
}

loadCookies();

function updateCookies() {
  cookies += 1;
  cookiesDisplay.textContent = cookies;
  renderAscii();
}

setInterval(updateCookies, 1000);

function saveCookies() {
  localStorage.setItem("savedCookies", cookies);
  localStorage.setItem("savedHealth", health);
}
setInterval(saveCookies, 500);

let cookiesChange = cookies;

// updating the health bar ASCII
function renderAscii() {
  fetch("ascii/health.txt")
    .then((res) => res.text())
    .then((text) => {
      let updated = text
        .replace("{{cookies}}", cookies)
        .replace("{{health}}", health);

      document.getElementById("healthAscii").textContent = updated;
    })
    .catch((err) => console.error("Failed to load ASCII:", err));
}

renderAscii();

function eatCookies() {
  if (cookies >= 10) {
    cookiesEaten = 10;
    let healthToGive = 2;
    health += healthToGive;
    cookiesDisplay.textContent = cookies;
    cookiesEaten = 0;
    cookies = cookies - 10;
  }
}

function villageBackground() {
  fetch("./ascii/village.html")
    .then((response) => response.text())
    .then((html) => {
      const container = document.getElementById("village-container");
      container.innerHTML = html; // render HTML, not plain text
    })
    .catch((err) => console.error("Failed to load village HTML:", err));
}

function goToTownHall() {
  window.location.href = "townhall.html";
  localStorage.setItem("savedCookies", cookies);
  localStorage.setItem("savedHealth", health);
}

function goToShop() {
  window.location.href = "shop.html";
}

function goToInventory() {
  window.location.href = "inventory.html";
}
function goToThirdHouse() {
  window.location.href = "thirdhouse.html";
}
