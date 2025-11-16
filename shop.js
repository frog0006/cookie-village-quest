// Load cookies? I think
var cookies = parseInt(localStorage.getItem("savedCookies")) || 0;
const cookiesDisplay = document.getElementById("cookies");
cookiesDisplay.textContent = cookies;

let weapons = JSON.parse(localStorage.getItem("ownedWeapons")) || {
  spoon: { owned: false, price: 67 },
  spatula: { owned: false, price: 200 },
  rollingPin: { owned: false, price: 500 },
};

function buyWeapon(type) {
  const w = weapons[type];
  if (!w) return alert("Weapon not found.");
  if (w.owned) return alert("You already own this!");
  if (cookies < w.price) return alert("Not enough cookies!");

  cookies -= w.price;
  w.owned = true;
  cookiesDisplay.textContent = cookies; // update visible text
  saveCurrentCookies();

  cookiesDisplay.textContent = cookies;

  saveWeapons();
  saveCurrentCookies();
  updateShopDisplay(type);

  alert(`You bought the ${type}!`);
}

function saveWeapons() {
  localStorage.setItem("ownedWeapons", JSON.stringify(weapons));
}

function saveCurrentCookies() {
  localStorage.setItem("savedCookies", cookies);
}

function updateShopDisplay(type) {
  const btn = document.getElementById(`${type}-purchase`);
  if (btn) {
    btn.textContent = "    OWNED    ";
    btn.disabled = true;
    btn.classList.add("owned");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  for (const key in weapons) {
    if (weapons[key].owned) {
      updateShopDisplay(key);
    }
  }
});

function goToVillage() {
  window.location.href = "index.html";
}
