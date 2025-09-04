"use strict";
let welcomeDiv = document.querySelector('.welcome');
let incBtn = document.querySelector('.incrementBtn');
let dcrBtn = document.querySelector('.dcrementBtn');
let result = document.querySelector('.count');
let restBtn = document.querySelector('.rest-btn');
let tagNames = [];
let count = 0;
welcomeDiv.addEventListener('animationend', (e) => {
    let el = e.target;
    tagNames.push(el.tagName);
    console.log(tagNames);
    if (tagNames.length == 4 && tagNames.pop() == 'P') {
        welcomeDiv.classList.add('hide');
    }
});
function increment() {
    if (count >= 0) {
        count++;
        console.log("count increment", count);
        result.innerText = `${count}`;
        sessionStorage.setItem('count', JSON.stringify(count));
        console.log("working Incr");
        dcrBtn === null || dcrBtn === void 0 ? void 0 : dcrBtn.classList.remove('hide');
    }
}
function decrement() {
    if (count > 0) {
        count--;
        console.log("count decrement", count);
        result.innerText = `${count}`;
        sessionStorage.setItem('count', JSON.stringify(count));
        console.log("working Decr");
    }
}
function reset() {
    if (count >= 0) {
        count = 0;
        console.log("count reset", count);
        result.innerText = `${count}`;
        sessionStorage.setItem('count', JSON.stringify(count));
        console.log("working reset");
        dcrBtn === null || dcrBtn === void 0 ? void 0 : dcrBtn.classList.add('hide');
    }
}
incBtn === null || incBtn === void 0 ? void 0 : incBtn.addEventListener('click', increment);
dcrBtn === null || dcrBtn === void 0 ? void 0 : dcrBtn.addEventListener('click', decrement);
restBtn === null || restBtn === void 0 ? void 0 : restBtn.addEventListener('click', reset);
function onRefresh() {
    let value = sessionStorage.getItem('count');
    if (value) {
        count = JSON.parse(value);
        result.innerText = `${count}`;
    }
}
onRefresh();
