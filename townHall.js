var cookies = localStorage.getItem("savedCookies");
const screen = document.getElementById("screen");

let level = 1;
let maxLevel = 5;
let playerX = 10;
let playerHealth = Number(localStorage.getItem("savedHealth"));

function spawnCockroaches() {
  return [
    { x: 60, health: 20 + level, killedByPlayer: false },
    { x: 80, health: 25 + level * 2, killedByPlayer: false },
    { x: 100, health: 30 + level * 3, killedByPlayer: false },
  ];
}

let cockroach = spawnCockroaches();
let gameOver = false;

screen.addEventListener("click", function () {
  if (gameOver) return;

  cockroach.forEach((e) => {
    if (e.health > 0 && Math.abs(e.x - playerX) <= 15) {
      e.health -= 7;
      if (localStorage.getItem("equippedWeapon") == "spoon") {
        e.health -= 5;
      }
      if (localStorage.getItem("equippedWeapon") == "spatula") {
        e.health -= 10;
      }
      if (localStorage.getItem("equippedWeapon") == "rollingPin") {
        e.health -= 15;
      }
      if (e.health <= 0) e.killedByPlayer = true;
    }
  });
});

let cookiesEarned = 100 + Math.random() * 50;

function saveCookies() {
  localStorage.setItem("savedCookies", cookies + Math.floor(cookiesEarned));
}

function animate() {
  if (gameOver) {
    screen.textContent =
      (playerHealth > 0
        ? " YOU WON! +" + Math.floor(cookiesEarned) + " cookies "
        : " YOU LOST ") +
      "\n\nFinal Level Reached: " +
      (playerHealth > 0 ? maxLevel : level);

    return;
  }

  let healthLine = "";
  let spriteLine = "";

  cockroach.forEach((e) => {
    if (e.health > 0) {
      healthLine += " ".repeat(e.x) + e.health + "  ";
      spriteLine += " ".repeat(e.x) + ">ᴑ<" + "  ";
    } else {
      healthLine += "";
      spriteLine += "";
    }
  });

  let playerLine = " ".repeat(playerX) + "(*0*))";

  screen.textContent =
    healthLine +
    "\n" +
    spriteLine +
    "\n\nPlayer:\n" +
    playerLine +
    "\n\nPlayer Health: " +
    playerHealth +
    "\nLevel: " +
    level;
}

function update() {
  if (gameOver) return;

  cockroach.forEach((e) => {
    if (e.health > 0) {
      e.x -= 1;

      if (e.x <= playerX) {
        playerHealth -= 10 * level;
        e.killedByPlayer = false;
        e.health = 0;
      }
    }
  });

  if (playerHealth <= 0) {
    gameOver = true;
    animate();
    return;
  }

  const allDead = cockroach.every((e) => e.health <= 0);

  if (allDead) {
    const allKilled = cockroach.every((e) => e.killedByPlayer);

    if (allKilled) {
      level++;

      if (level > maxLevel) {
        gameOver = true;
        animate();
        return;
      }
    }

    cockroach = spawnCockroaches();
  }

  animate();
}

setInterval(update, 100);

function goToVillage() {
  window.location.href = "index.html";
}
