const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WINS = "PLAYER_WINS";
const RESULTS_CONMPUTER_WINS = "COMPUTER_WINS";
let gameStatus = false;

function getRandomChoice() {
  let randomValue = Math.random();
  if (randomValue < 1 / 3) {
    randomValue = ROCK;
  } else if (randomValue < 2 / 3) {
    randomValue = PAPER;
  } else if (randomValue === 1) {
    randomValue = ROCK;
  } else {
    randomValue = SCISSORS;
  }
  return randomValue;
}

const startGameBtn = document.getElementById("start-game-btn");
let defaultValue;

const getPlayerchoice = function () {
  const selection = prompt(
    "What you like to choose Rock,Paper or Scissors.",
    ""
  ).toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid choice !!\n system has select ${defaultValue} for you in Random.`);
    return; //default  selection here
  }
  return selection;
};

const getComputerchoice = function () {
  const Computerchoice = getRandomChoice();
  return Computerchoice;
};

const getWinner = function (cChoice, pChoice = defaultValue) {
  if (pChoice === cChoice) {
    return RESULT_DRAW;
  } else if (
    (cChoice === ROCK && cChoice === PAPER) ||
    (cChoice === PAPER && pChoice === SCISSORS) ||
    (cChoice === SCISSORS && pChoice === ROCK)
  ) {
    return RESULT_PLAYER_WINS;
  } else {
    return RESULTS_CONMPUTER_WINS;
  }
};

startGameBtn.addEventListener("click", function () {
  if (gameStatus) {
    return;
  }
  gameStatus = true;
  defaultValue = getRandomChoice();
  console.log("Game is starting...");
  const Playerchoice = getPlayerchoice();
  const Computerchoice = getComputerchoice();
  const Winner = getWinner(Computerchoice);
  let message = `you picked ${Playerchoice || defaultValue},Computer picked ${Computerchoice},therefore you `;
  if (Winner === RESULT_DRAW) {
    message += "had a draw.";
  } else if (Winner === RESULT_PLAYER_WINS) {
    message += "won.";
  } else {
    message += "lost.";
  }
  console.log(message);
  gameStatus = false;
});
