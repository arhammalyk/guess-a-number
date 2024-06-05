let container = document.querySelector(".container");
let randomNumber = 0;
let guessLeft = 0;
container.addEventListener("click", (e) => {
  e.preventDefault();
  // on click play
  if (e.target.classList.contains("play")) {
    startGame();
  }
  // on click submit
  else if (e.target.classList.contains("submitGuess")) {
    let form = document.querySelector(".form");
    let data = formDataAPI(form);
    if (data) {
      if (data.number == randomNumber) {
        generatePopupHTML(true);
      } else {
        guessLeft -= 1;
        updateHTML(guessLeft);
        if (guessLeft === 0) {
          generatePopupHTML(false);
        }
      }
    }
  }
  // on click to home
  else if (e.target.classList.contains("toHome")) {
    toHome();
  }
  // on click play again
  else if (e.target.classList.contains("playAgain")) {
    toHome();
    startGame();
  }
});

// return input form data
function formDataAPI(form) {
  let formData = new FormData(form);
  const values = [...formData.values()];
  if (values[0].length < 1) {
    alert("Cannot be empty");
    return;
  }
  const formObject = Object.fromEntries(formData);
  return formObject;
}

// on buttom click play render input form
function updateHTML(guessLeft) {
  let dynamic = document.querySelector(".dynamicDiv");
  dynamic.innerHTML = "";

  let form = document.createElement("form");
  form.classList.add("form");

  let inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  let div1 = document.createElement("div");
  let div2 = document.createElement("div");

  let label = document.createElement("label");
  label.textContent = "Guess a number between 1 to 10";
  label.style.color = "white";
  label.setAttribute("for", "number");

  let input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("name", "number");
  input.setAttribute("id", "number");

  let button = document.createElement("button");
  button.classList.add("btn", "submitGuess");
  button.setAttribute("type", "button");
  button.textContent = "Guess";

  let chances = document.createElement("p");
  chances.classList.add("chances");
  chances.textContent = `${guessLeft} guess left!`;

  dynamic.appendChild(form);
  form.appendChild(inputContainer);
  inputContainer.appendChild(div1);
  div1.appendChild(div2);
  div2.appendChild(label);
  div2.appendChild(input);
  div2.appendChild(button);
  div2.appendChild(chances);

  return form;
}

// generate just a random number
function generateRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

// if user guessed it right or out of guesses this pop up will appears with a message win or loss
function generatePopupHTML(condition) {
  let mainContainer = document.querySelector(".popUpDiv");
  mainContainer.innerHTML = "";

  let div = document.createElement("div");
  let p = document.createElement("p");
  if (condition) {
    p.textContent = "you guessed it right :D";
  } else {
    p.textContent = `Failed to guess :( correct answer was ${randomNumber}`;
  }

  let playAgain = document.createElement("button");
  playAgain.textContent = "Play Again";
  playAgain.classList.add("btn", "playAgain");

  let homeBtn = document.createElement("button");
  homeBtn.textContent = "Home";
  homeBtn.classList.add("btn", "toHome");

  div.appendChild(p);
  div.appendChild(playAgain);
  div.appendChild(homeBtn);
  mainContainer.appendChild(div);

  return mainContainer;
}

// on click to home button clear all dynamically created html
function toHome() {
  let mainContainer = document.querySelector(".popUpDiv");
  mainContainer.innerHTML = "";
  let dynamic = document.querySelector(".dynamicDiv");
  dynamic.innerHTML = "";
}

// on button click play again restart game
function startGame() {
  guessLeft = 3;
  updateHTML(guessLeft);
  randomNumber = generateRandomNumber();
}
