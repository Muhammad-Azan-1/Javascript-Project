"use strict";
let random = Math.floor(Math.random() * 100 + 1);
let submitField = document.querySelector(".submitfield");
let guessRecord = document.querySelector(".guessRecord");
let resultBox = document.querySelector(".resultBox");
let restartBtn = document.querySelector(".restartGame-btn");
let prevGuess = document.querySelector(".prevGuess");
let remaningGuess = document.querySelector(".remaningGuess");
let allPrevGuesses = [];
let noOfGuesses = 0;
let remaninGuesses;
let message;
let showRestartBtn = false;
let playGame = true;
if (playGame) {
    submitField.addEventListener("click", (e) => {
        e.preventDefault();
        let userInput = document.querySelector(".guessfield");
        console.log(userInput);
        let userValue = userInput.value;
        if (userValue.trim() != "") {
            console.log("send user input to validation function");
            validateGuess(Number(userValue));
            userInput.value = "";
        }
        else {
            resultBox === null || resultBox === void 0 ? void 0 : resultBox.classList.remove("hide");
            resultBox.innerHTML = `<h2>Please Enter a value first</h2>`;
        }
    });
}
function validateGuess(Guess) {
    if (Guess < 1) {
        resultBox === null || resultBox === void 0 ? void 0 : resultBox.classList.remove("hide");
        resultBox.innerHTML = `<h2>Please Guess a number greater then 0</h2>`;
    }
    else if (Guess > 100) {
        resultBox === null || resultBox === void 0 ? void 0 : resultBox.classList.remove("hide");
        resultBox.innerHTML = `<h2>Please Guess a number less then 100</h2>`;
    }
    else {
        if (noOfGuesses < 10) {
            noOfGuesses++;
            allPrevGuesses.push(Guess);
            resultBox === null || resultBox === void 0 ? void 0 : resultBox.classList.add("hide");
            matchGuess(Guess);
            trackGuess();
            sessionStorage.setItem("allPrevGuesses", JSON.stringify(allPrevGuesses));
            sessionStorage.setItem("noOfGuesses", JSON.stringify(noOfGuesses));
        }
        else {
            resultBox === null || resultBox === void 0 ? void 0 : resultBox.classList.remove("hide");
            message = `<h3>Game over, You will never be able to win the random number was ${random}  </h3>`;
            resultBox.innerHTML = message;
            sessionStorage.setItem("message", JSON.stringify(message));
            restartBtn.classList.remove("hide");
            submitField.disabled = true;
        }
    }
}
function matchGuess(guessNo) {
    if (guessNo < random) {
        resultBox === null || resultBox === void 0 ? void 0 : resultBox.classList.remove("hide");
        message = `<h2>Your Guess is to low</h2>`;
        resultBox.innerHTML = message;
    }
    else if (guessNo > random) {
        resultBox === null || resultBox === void 0 ? void 0 : resultBox.classList.remove("hide");
        message = `<h2>Your Guess is to high</h2>`;
        resultBox.innerHTML = message;
    }
    else if (random == guessNo) {
        resultBox === null || resultBox === void 0 ? void 0 : resultBox.classList.remove("hide");
        message = `<h2>Congratulations You Won !</h2>`;
        resultBox.innerHTML = message;
        submitField.disabled = true;
        showRestartBtn = true;
        if (showRestartBtn) {
            restartBtn.classList.remove("hide");
            sessionStorage.setItem('btn', JSON.stringify(showRestartBtn));
            submitField.disabled = true;
        }
    }
    sessionStorage.setItem("message", JSON.stringify(message));
}
function trackGuess() {
    prevGuess.textContent = "";
    prevGuess.textContent = allPrevGuesses.join(", ");
    remaninGuesses = 10 - noOfGuesses;
    remaningGuess.textContent = `${remaninGuesses}`;
    sessionStorage.setItem("remaningGuesses", JSON.stringify(remaninGuesses));
}
restartBtn.addEventListener("click", (e) => {
    prevGuess.textContent = "0";
    remaningGuess.textContent = `${10}`;
    random = Math.floor(Math.random() * 100 + 1);
    noOfGuesses = 0;
    allPrevGuesses = [];
    submitField.disabled = false;
    restartBtn.classList.add("hide");
    resultBox === null || resultBox === void 0 ? void 0 : resultBox.classList.add("hide");
    let userInput = document.querySelector(".guessfield");
    userInput.value = "";
    sessionStorage.removeItem('allPrevGuesses');
    sessionStorage.removeItem('noOfGuesses');
    sessionStorage.removeItem('remaningGuesses');
    sessionStorage.removeItem('message');
    sessionStorage.removeItem('btn');
});
function loadData() {
    let savedAllPrevGuess = sessionStorage.getItem('allPrevGuesses');
    let savedNoOfGuess = sessionStorage.getItem('noOfGuesses');
    let savedReamningGuess = sessionStorage.getItem('remaningGuesses');
    let savedMessage = sessionStorage.getItem('message');
    let btn = sessionStorage.getItem('btn');
    if (savedAllPrevGuess) {
        allPrevGuesses = [...JSON.parse(savedAllPrevGuess)];
    }
    if (savedNoOfGuess) {
        noOfGuesses = JSON.parse(savedNoOfGuess);
    }
    if (savedReamningGuess) {
        remaninGuesses = JSON.parse(savedReamningGuess);
    }
    if (savedMessage) {
        message = JSON.parse(savedMessage);
        resultBox === null || resultBox === void 0 ? void 0 : resultBox.classList.remove("hide");
        resultBox.innerHTML = message;
    }
    if (btn) {
        showRestartBtn = JSON.parse(btn);
        restartBtn.classList.remove("hide");
        submitField.disabled = true;
    }
    if (allPrevGuesses.length > 0 || noOfGuesses > 0) {
        trackGuess();
    }
}
loadData();
