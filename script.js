let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;

const displayMessage = (message) => {
  document.getElementById("message").textContent = message;
};
const displayNumber = (number) => {
  document.querySelector(".number").textContent = number;
};
const displayScore = (score) => {
  document.querySelector(".score").textContent = score;
};

//Speech Recognition
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recog = new SpeechRecognition();

//Check result
const onResult = (e) => {
  const msg = +e.results[0][0].transcript;
  console.log(msg);

  const guess = document.querySelector(".guess");
  guess.innerHTML = `${msg}`;

  if (Number.isNaN(msg)) {
    displayMessage("No Number! Say again!");
    guess.innerHTML = "";
  } else if (msg > 20 || msg < 1) {
    displayMessage("Number must be between 1 and 20");
  } else if (msg === secretNumber) {
    displayMessage("You are correct!");
    displayNumber(secretNumber);
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    //Set highscore
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  } else if (msg !== secretNumber) {
    if (score > 1) {
      displayMessage(msg > secretNumber ? "Too high!" : "Too low!");
      score--;
      displayScore(score);
    } else {
      displayMessage("You lost the game :<");
      displayScore(0);
    }
  }
};

//Start recognition
recog.start();
recog.addEventListener("result", onResult);
recog.addEventListener("end", () => recog.start());

//Play again
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  displayMessage("Start guessing...");
  displayScore(score);
  displayNumber("?");

  document.querySelector(".guess").innerHTML = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";

  recog.start();
  recog.addEventListener("result", onResult);
  recog.addEventListener("end", () => recog.start());
});
