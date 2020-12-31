const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const LOG_EVENT_PLAYER_ATTACK = "ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_HEAL_PLAYER = "HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";
// CONST LOG_EVENT_WINNER

let dataLog = [];
const givenValue = prompt("Maximum life of the chalengers", "100");
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
  writetoLog(
    LOG_EVENT_MONSTER_ATTACK,
    Math.round(healthloss),
    currPlayerlife,
    currMonsterlife
  );
  if (currPlayerlife <= 0 && bonusLife) {
    bonusLife = false;
    removeBonusLife();
    currPlayerlife += healthloss;
    setPlayerHealth(currPlayerlife);
    alert("Bonus Life has been used");
  }
  let gameOvervalue;
  if (currMonsterlife <= 0 && currPlayerlife > 0) {
    alert("You Won!");
    gameOvervalue = "PLAYER_WON";
  } else if (currPlayerlife <= 0 && currMonsterlife > 0) {
    alert("You Lose.");
    gameOvervalue = "MONSTER_WON";
  } else if (currMonsterlife <= 0 && currPlayerlife <= 0) {
    alert("The Match is Draw.");
    gameOvervalue = "DRAW_MATCH";
  }
  if (currMonsterlife <= 0 || currPlayerlife <= 0) {
    writetoLog(
      LOG_EVENT_GAME_OVER,
      gameOvervalue,
      currPlayerlife,
      currMonsterlife
    );
    reset();
  }
}
function attackMonster(mode) {
  let maxdamage;
  if (mode === LOG_EVENT_PLAYER_ATTACK) {
    maxdamage = ATTACK_VALUE;
  } else if (mode === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    maxdamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxdamage);
  currMonsterlife -= damage;
  writetoLog(mode, Math.round(damage), currPlayerlife, currMonsterlife);
  endRound();
}
function attackHandler() {
  attackMonster(LOG_EVENT_PLAYER_ATTACK);
}
function strongAttackHandler() {
  attackMonster(LOG_EVENT_PLAYER_STRONG_ATTACK);
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
  writetoLog(
    LOG_EVENT_HEAL_PLAYER,
    Math.round(healValue),
    currPlayerlife,
    currPlayerlife
  );
  endRound();
}
function writetoLog(event, value, currPlayerlife, currMonsterlife) {
  let logEvent = {
    event: event,
    value: value,
    FinalplayerLife: Math.round(currPlayerlife),
    FinalmonsterLife: Math.round(currMonsterlife),
  };
  if (
    event === LOG_EVENT_PLAYER_ATTACK ||
    event === LOG_EVENT_PLAYER_STRONG_ATTACK
  ) {
    logEvent.target = "Monster";
  } else if (event === LOG_EVENT_MONSTER_ATTACK) {
    logEvent.target = "Player";
  } else if (event === LOG_EVENT_HEAL_PLAYER) {
    logEvent.target = "Player";
  }
  dataLog.push(logEvent);
}

function logHandler() {
  console.log(dataLog);
}
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
logBtn.addEventListener("click", logHandler);
