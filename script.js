// DOM elements
const playerNameInput1 = document.getElementById("play1");
const playerNameInput2 = document.getElementById("play2");
const guessInput = document.querySelector(".guess-input");

const score1 = document.querySelector(".score1");
const score2 = document.querySelector(".score2");

const guessLabel = document.querySelector(".guess-range");
const playerNameLabel1 = document.querySelector(".playerName1");
const playerNameLabel2 = document.querySelector(".playerName2");

const alert = document.querySelector(".alert");

const startBtn = document.querySelector(".nameSubmit");
const guessBtn = document.querySelector(".guess-submit");
const restartBtn = document.querySelector(".restart");

const infoSect = document.querySelector(".playerInfo");
const mainSect = document.querySelector("main");

// default valules
let scores, playerNames, activeplayer, guessNum, guessMin, guessMax;

// Functions
// Generate and display number range and guess number
const randomMin = () => Math.round(Math.random() * (12 - 1) + 1) + 1;
const randomMax = () => Math.round(Math.random() * (24 - 12) + 1) + 12;

const guessNumberGenerate = function (min, max) {
  guessLabel.textContent = `Guess from range (${min} - ${max})`;

  guessMin = min;
  guessMax = max;

  guessNum = Math.trunc(Math.random() * (max - min) + 1) + min;
  console.log(guessNum);
};
// generate a new min max
const generateMinMax = () => guessNumberGenerate(randomMin(), randomMax());

// start game
const startGame = function () {
  if (
    playerNameInput1.value &&
    playerNameInput2.value &&
    playerNameInput1.value !== playerNameInput2.value
  ) {
    // display playername
    playerNameLabel1.textContent = playerNameInput1.value;
    playerNameLabel2.textContent = playerNameInput2.value;

    // alert who starts first
    alert.textContent = `${playerNameInput1.value} starts first`;

    setTimeout(() => alert.classList.add("hidden"), 4350);

    // save player name
    playerNames = [playerNameInput1.value, playerNameInput2.value];

    // clear field input
    playerNameInput1.value = playerNameInput2.value = "";

    // remove info section
    infoSect.classList.add("fadeout");
    setTimeout(() => infoSect.classList.add("hidden"), 600);

    // put info section
    setTimeout(() => mainSect.classList.remove("hidden"), 650);
    setTimeout(() => mainSect.classList.add("fadein"), 650);

    // reset score and active player
    scores = [0, 0];
    activeplayer = 0;

    generateMinMax();
  } else {
    infoSect.classList.add("shake");
    setTimeout(() => {
      infoSect.classList.remove("shake");
    }, 1000);
  }
};

// updating scores
const updateScores = () => {
  score1.textContent = scores[0];
  score2.textContent = scores[1];
};

// swich to next player
const switchPlayer = () => {
  // Check for winner
  if (+scores[activeplayer] === 5) {
    alert.textContent = `${playerNames[activeplayer]} is the winner`;
    alert.classList.remove("hidden");

    // Remove scores
    score1.style.opacity = 0;
    score2.style.opacity = 0;

    restartBtn.classList.add("fadein");
    restartBtn.classList.remove("hidden");
  } else {
    activeplayer = activeplayer === 0 ? 1 : 0;

    alert.textContent = `It's ${playerNames[activeplayer]}'s turn`;

    alert.classList.remove("hidden");
    setTimeout(() => alert.classList.add("hidden"), 2000);
  }
};

// Check guess and add scores
const checkGuess = function () {
  // Function to clear input
  const clearFieldINput = () => {
    guessInput.blur();
    guessInput.value = "";
  };

  if (+guessInput.value < guessMin || +guessInput.value > guessMax) {
    console.log(guessMin);
    guessLabel.classList.add("pulsing");
    setTimeout(() => guessLabel.classList.remove("pulsing"), 3000);

    // Clear field input
    clearFieldINput();
  } else {
    if (+guessInput.value === guessNum) {
      scores[activeplayer] += 1;

      // Clear field input
      clearFieldINput();

      // Swith Player
      switchPlayer();

      // Update Scores
      updateScores();

      // Generate new min max
      generateMinMax();
    } else if (+guessInput.value !== guessNum) {
      // Swith Player
      switchPlayer();

      // Clear field input
      clearFieldINput();
    }
  }
};

// Restart the game
const restartGame = function () {
  // alert who starts first again
  alert.textContent = `${playerNames[0]} starts first`;

  setTimeout(() => alert.classList.add("hidden"), 3350);

  restartBtn.classList.add("hidden");

  // reset score and active player
  scores = [0, 0];
  activeplayer = 0;

  // update new score
  updateScores();

  // generate new min max
  generateMinMax();

  // Add the scores back
  score1.style.opacity = 100;
  score2.style.opacity = 100;
};
// Event listeners
startBtn.addEventListener("click", startGame);
guessBtn.addEventListener("click", function (e) {
  e.preventDefault();
  checkGuess();
});
restartBtn.addEventListener("click", restartGame);
