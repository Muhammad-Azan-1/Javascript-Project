"use strict";
let cardBox = document.querySelector(".cards");
let restartBtn = document.querySelector(".btn");
let cardsArray = [
    {
        name: "CSS",
        img: "./assests/css.png",
    },
    {
        name: "react",
        img: "./assests/react.png",
    },
    {
        name: "JS",
        img: "./assests/js.png",
    },
    {
        name: "Node",
        img: "./assests/node.png",
    },
    {
        name: "HTML",
        img: "./assests/html.png",
    },
    {
        name: "Next",
        img: "./assests/next.png",
    },
];
// 1 creating array with original + duplicate values
let duplicateArray = cardsArray.concat(cardsArray);
// 2 shufling array randomly
function shullfeArray(array) {
    console.log("function called");
    // array shuffled logic
    for (let i = array.length - 1; i > 0; i--) {
        // 11 - 1
        let j = Math.floor(Math.random() * (i + 1));
        let swapVal = array[j];
        array[j] = array[i];
        array[i] = swapVal;
    }
    return array;
}
let shuflledArr = shullfeArray(duplicateArray); // original duplicateArray is also changed
// 3 creating card for each value of array
shuflledArr.forEach((items) => {
    let card = document.createElement("div");
    card.className = "card";
    card.dataset.name = `${items.name}`;
    let frontCard = document.createElement("div");
    frontCard.classList.add("front-card");
    let backCard = document.createElement("div");
    backCard.classList.add("back-card");
    backCard.style.backgroundImage = `url(${items.img})`;
    card.append(frontCard, backCard);
    cardBox === null || cardBox === void 0 ? void 0 : cardBox.append(card);
});
// 4 logic for selecting cards
let count = 0;
let firstCard;
let secondCard;
cardBox === null || cardBox === void 0 ? void 0 : cardBox.addEventListener("click", (e) => {
    let targetEl = e.target;
    let parentEl = targetEl.parentNode;
    if (targetEl.className == "cards") {
        return false;
    }
    if (!parentEl.classList.contains("card-selected")) {
        count++;
        if (count < 3) {
            if (count == 1) {
                firstCard = parentEl.dataset.name;
                parentEl.classList.add("card-selected");
            }
            else {
                secondCard = parentEl.dataset.name;
                parentEl.classList.add("card-selected");
            }
            console.log(firstCard, secondCard);
            console.log(parentEl.className);
            if (firstCard && secondCard) {
                if (firstCard == secondCard) {
                    setTimeout(() => {
                        console.log("running if statement");
                        match();
                        reset();
                    }, 1000);
                }
                else {
                    setTimeout(() => {
                        console.log("running else statement");
                        reset();
                    }, 1000);
                }
            }
        }
    }
});
// 5 matching cards
function match() {
    console.log("Match function is called");
    let selectedCards = document.querySelectorAll(".card-selected");
    selectedCards.forEach((items) => {
        console.log(items);
        items.classList.add("card-match", "disable");
    });
}
// 6 reset game
function reset() {
    console.log("reset function running");
    count = 0;
    firstCard = "";
    secondCard = "";
    let selectedCards = document.querySelectorAll(".card-selected");
    selectedCards.forEach((items) => {
        console.log(items, "items");
        items.classList.remove("card-selected");
    });
}
// 7 restart game
restartBtn === null || restartBtn === void 0 ? void 0 : restartBtn.addEventListener("click", () => {
    count = 0;
    firstCard = "";
    secondCard = "";
    //  shuflledArr = shullfeArray(duplicateArray);
    // let allElementNodes = cardBox?.children;
    // if (allElementNodes) {
    //   let arrayOfElements = Array.from(allElementNodes); // html collection into array
    //   for (let div of arrayOfElements) {
    //     div.classList.remove("disable", "card-selected", "card-match");
    //   }
    // }
    shuflledArr = shullfeArray(duplicateArray);
    cardBox.innerHTML = '';
    shuflledArr.forEach((items) => {
        let card = document.createElement("div");
        card.className = "card";
        card.dataset.name = `${items.name}`;
        let frontCard = document.createElement("div");
        frontCard.classList.add("front-card");
        let backCard = document.createElement("div");
        backCard.classList.add("back-card");
        backCard.style.backgroundImage = `url(${items.img})`;
        card.append(frontCard, backCard);
        cardBox === null || cardBox === void 0 ? void 0 : cardBox.append(card);
    });
});
