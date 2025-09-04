"use strict";
let mainDiv = document.querySelector(".main");
let startBtn = document.getElementById("start");
let endBtn = document.getElementById("end");
let body = document.body;
let p = document.createElement("p");
//* method 1
// function ColorHex() {
//     let redHex : string = Math.floor(Math.random() * ( 255)).toString(16).padStart(2 , "0")
//     let greenHex : string = Math.floor(Math.random() * ( 255)).toString(16).padStart(2 , "0")
//     let blueHex : string = Math.floor(Math.random() * ( 255)).toString(16).padStart(2 , "0")
//     let hex : string = `#${redHex}${greenHex}${blueHex}`
//     return hex
// }
// console.log(ColorHex())
//* method 2
function ColorHex() {
    let hexValues = "0123456789abcdef";
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
        hexColor += hexValues[Math.floor(Math.random() * 16)];
    }
    return hexColor;
}
function showMsg(val) {
    p.style.marginTop = "10px";
    p.style.fontWeight = "bold";
    mainDiv.append(p);
    p.innerText = val;
    setTimeout(() => {
        p.remove();
    }, 3000);
}
let interValId;
function showBg() {
    if (!interValId) {
        showMsg("Started");
        mainDiv.append(p);
        interValId = setInterval(() => {
            body.style.backgroundColor = ColorHex();
        }, 1000);
    }
}
startBtn === null || startBtn === void 0 ? void 0 : startBtn.addEventListener("click", showBg);
endBtn === null || endBtn === void 0 ? void 0 : endBtn.addEventListener("click", (e) => {
    showMsg("Ended");
    p.innerText = "Ended";
    interValId != null ? clearInterval(interValId) : (interValId = null);
});
