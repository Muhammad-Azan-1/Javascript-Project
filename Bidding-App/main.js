let diceBox = document.querySelector(".dice");
let diceAllFaces = document.querySelectorAll(".dice .face");
let diceBoxFace1 = document.querySelector("#face1");
let diceBoxFace2 = document.querySelector("#face2");
let diceBoxFace3 = document.querySelector("#face3");
let diceBoxFace4 = document.querySelector("#face4");
let diceBoxFace5 = document.querySelector("#face5");
let diceBoxFace6 = document.querySelector("#face6");
let btn = document.querySelector(".btn1");
let btn2 = document.querySelector(".btn2");
let ammountInput = document.querySelector(".bet-amoun");
let numberInput = document.querySelector(".bet-num");
console.log(ammountInput, numberInput, 'vals');
let userAmount = document.querySelector(".amount");
let userAmountBox = document.querySelector(".userAmountBox");
let warning = document.querySelector(".warning");
let enterAmountWarning = document.querySelector(".message");
let totalAmount = document.querySelector(".totalAmount");
let userData = [];
console.log("userData array", userData);
let diceFaces = [
    diceBoxFace1,
    diceBoxFace2,
    diceBoxFace3,
    diceBoxFace4,
    diceBoxFace5,
    diceBoxFace6, // dice faces
];
function unHideDiceFace(compVal, userNum) {
    console.log("DIce showing function running");
    const face = diceFaces[compVal - 1]; // find the diceFace from the array make it vissible
    face.style.display = "inline-block";
    if (compVal == userNum) {
        warning.innerHTML = "<p>Congratulations You Won it !</p>";
        warning.style.fontFamily = "Playwrite PL , sans-serif";
        warning.style.color = "#04e762";
        warning.style.display = "inline-block";
        //? if user wins we will update the values of the current array and then add that updated current array into the session storage
        userData[0].userAmoun = userData[0].userAmoun + userData[0].betAmoun;
        userAmount.value = String(userData[0].userAmoun);
        totalAmount.innerText = `Total Amount : ${userData[0].userAmoun} rs`;
        sessionStorage.setItem("userData", JSON.stringify(userData));
        console.log("adding values to the session storage ");
    }
    else {
        warning.innerHTML = "<p> You lose it :(</p>";
        warning.style.fontFamily = "Playwrite PL , sans-serif";
        warning.style.display = "inline-block";
        warning.style.color = "#FF0000";
        //? if user loss we  again will update the values of the current array and then add that updated current array into the session storage
        userData[0].userAmoun = userData[0].userAmoun - userData[0].betAmoun;
        userAmount.value = String(userData[0].userAmoun);
        totalAmount.innerText = `Total Amount : ${userData[0].userAmoun} rs`;
        sessionStorage.setItem("userData", JSON.stringify(userData));
        console.log("removing values from the session storage ");
    }
}
function runDice() {
    console.log("mai function working");
    const betAmount = ammountInput.value;
    const betNumber = numberInput.value;
    const userEnteredAmoun = userAmount.value;
    //? adding data in array later on this data will be added in session storage
    if (userData.length == 0) {
        userData.push({ betAmoun: Number(betAmount), betNum: Number(betNumber), userAmoun: Number(userEnteredAmoun) });
        console.log("adding values to the  main array ");
    }
    else {
        userData[0].betAmoun = Number(betAmount);
        userData[0].betNum = Number(betNumber);
        userData[0].userAmoun = Number(userEnteredAmoun); // Optional: only if user re-credits
        console.log("updating the same main array for when user click send time ");
    }
    //? 1 if user not enter any initall amount
    if (userAmount.value.trim() == "") {
        enterAmountWarning.classList.remove("hide");
        totalAmount.classList.add("hide");
        console.log('working');
        return;
    }
    else {
        enterAmountWarning.classList.add("hide");
        userAmountBox.classList.add("hide");
        totalAmount.classList.remove("hide");
        console.log('else working');
        totalAmount.innerText = `Total Amount : ${userData[0].userAmoun} rs`;
    }
    //? 2 if bet ammount and bet number input fields are empty
    if (betAmount.trim() == "" || betNumber.trim() == "") {
        return showWarning("Both fields are required");
    } /// if bothe input fields were empty
    //? 3 if bet ammount is  less then 1 
    if (Number(betAmount) < 1) {
        return showWarning("Bet Ammount should be a postive number and must be greater then 0");
    } // if value is greater then user balance then code not run or less then 1
    //? 4 if bet ammount is greater then Total amount (the amount user entered intially as a credit)
    if (userEnteredAmoun.trim() == '0') {
        return showWarning("Insufficient balance please credit first !");
    }
    else if (Number(betAmount) > Number(userEnteredAmoun)) {
        return showWarning("Insufficient balance !");
    }
    //? 5 bet number should be in range 1 - 6
    if ((Number(betNumber) > 6 || Number(betNumber) < 1)) {
        return showWarning("Enter a number in range  1 - 6");
    } // if user do not  enter a number in range 1 - 6 then code willtrun
    warning.style.display = "none";
    let compVal = Math.floor(Math.random() * 6 + 1); // game number computer generated
    hideAll(); // to hide all dice faces initially
    // add new
    diceBox.classList.add("animation-dice-roll");
    // this event will only trigger when then animation finish on dicebox
    diceBox.addEventListener("animationend", () => {
        unHideDiceFace(compVal, Number(numberInput.value)); // sending user number and computer number
        diceBox.classList.remove("animation-dice-roll");
    }, { once: true });
}
function showWarning(message) {
    if (message == 'Insufficient balance please credit first !') {
        btn2.classList.remove('hide');
    }
    warning.innerHTML = `<p>${message}</p>`;
    warning.style.display = "inline-block";
    warning.style.fontFamily = 'Roboto';
}
function hideAll() {
    diceAllFaces.forEach((items) => {
        items.style.display = 'none';
    });
}
function ShowInput() {
    totalAmount.classList.add("hide");
    userAmountBox.classList.remove("hide");
    btn2.classList.add('hide');
}
btn.addEventListener("click", runDice);
btn2.addEventListener("click", ShowInput);
console.log(userData, 'userdata');
//! this funtion only runs when 
function loadSessionStorageOnRefresh() {
    let data = sessionStorage.getItem('userData');
    let storedItem = data ? JSON.parse(data) : [];
    console.log(storedItem, 'session storage data');
    if (storedItem && storedItem.length > 0) {
        userData = [...storedItem];
    }
    userAmount.value = String(userData[0].userAmoun);
    ammountInput.value = String(userData[0].betNum);
    numberInput.value = String(userData[0].betNum);
    if (userAmount.value != '0') {
        enterAmountWarning.classList.add("hide");
        userAmountBox.classList.add("hide");
        totalAmount.classList.remove("hide");
        console.log('else working');
        // totalAmount.innerText = `Total Amount : ${userAmount.value} rs`;
        totalAmount.innerText = `Total Amount : ${userData[0].userAmoun} rs`;
    }
    else {
        enterAmountWarning.classList.remove("hide");
        totalAmount.classList.add("hide");
        userAmount.value = '';
    }
}
console.log(userData, 'userData before function load');
loadSessionStorageOnRefresh();
console.log(userData, 'userData after function load');
export {};
//! note 
//? If you set the same key in sessionStorage more than once:
// sessionStorage.setItem("userData", "first");
// sessionStorage.setItem("userData", "second");
//? ➡️ The first value gets overwritten, and only "second" remains stored under the key "userData".
