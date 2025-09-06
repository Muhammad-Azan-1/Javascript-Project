"use strict";
let listItems = document.querySelectorAll('li');
let ul = document.querySelector('ul');
listItems.forEach((items) => {
    let color = items.innerText.trim().toLocaleLowerCase();
    items.style.color = color;
});
ul === null || ul === void 0 ? void 0 : ul.addEventListener('click', (e) => {
    let element = e.target;
    let color = element.innerText.trim().toLocaleLowerCase();
    document.body.style.backgroundColor = color;
});
