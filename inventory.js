let weapons = JSON.parse(localStorage.getItem("ownedWeapons")) || {
  spoon: { owned: false, price: 67 },
  spatula: { owned: false, price: 200 },
  rollingPin: { owned: false, price: 500 },
};

let equipped = null;

window.onload = function () {
  let saved = localStorage.getItem("equippedWeapon");
  if (saved) {
    equipped = saved;
    document.getElementById("equippedDisplay").textContent =
      "Equipped: " + equipped;
  } else {
    document.getElementById("equippedDisplay").textContent = "Equipped: None";
  }
};

function equipWeapon(weaponName) {
  // If they never bought it
  if (!weapons[weaponName].owned) {
    alert("You don't own this weapon yet!");
    return;
  }

  equipped = weaponName;
  localStorage.setItem("equippedWeapon", equipped);

  document.getElementById("equippedDisplay").textContent =
    "Equipped: " + equipped;

  alert("You equipped: " + equipped);
}
