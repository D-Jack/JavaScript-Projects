const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const givenValue=prompt('Maximum life of the chalengers', '100');
let maxLife = parseInt(givenValue);
if (isNaN(maxLife) || maxLife <= 0) {
  maxLife = 100;
}
let currMonsterlife = maxLife;
let currPlayerlife = maxLife;
let bonusLife = true;
adjustHealthBars(maxLife);

function reset() {
  currMonsterlife = maxLife;
  currPlayerlife = maxLife;
  resetGame(maxLife);
}
function endRound() {
  const healthloss = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currPlayerlife -= healthloss;
  if (currPlayerlife <= 0 && bonusLife) {
    bonusLife = false;
    removeBonusLife();
    currPlayerlife += healthloss;
    setPlayerHealth(currPlayerlife);
    alert("Bonus Life has been used");
  }
  if (currMonsterlife <= 0 && currPlayerlife > 0) {
    alert("You Won!");
  } else if (currPlayerlife <= 0 && currMonsterlife > 0) {
    alert("You Lose.");
  } else if (currMonsterlife <= 0 && currPlayerlife <= 0) {
    alert("The Match is Draw.");
  }
  if (currMonsterlife <= 0 || currPlayerlife <= 0) {
    reset();
  }
}
function attackMonster(mode) {
  let maxdamage;
  if (mode === "ATTACK") {
    maxdamage = ATTACK_VALUE;
  } else if (mode === "STRONG_ATTACK") {
    maxdamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxdamage);
  currMonsterlife -= damage;
  endRound();
}
function attackHandler() {
  attackMonster("ATTACK");
}
function strongAttackHandler() {
  attackMonster("STRONG_ATTACK");
}
function healHandler() {
  let healValue;
  if (currPlayerlife >= maxLife - HEAL_VALUE) {
    alert("you can't have health more than MaxHealth.");
    healValue = maxLife - currPlayerlife;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currPlayerlife += healValue;
  endRound();
}
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
