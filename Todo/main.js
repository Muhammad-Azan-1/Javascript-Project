"use strict";
let mainDiv = document.querySelector(".container");
let btn = document.querySelector(".btn");
let btn2 = document.querySelector("#btn2");
let input = document.querySelector("input");
let ul = document.querySelector(".list-container");
let p = document.querySelector("p");
let todo_div = document.querySelector("todo");
let curentEditinLi = null;
let crossBtn = null;
let timeoutId = null;
let todo = [];
//! time logic if user enter empty or click to delete item without select then this will run
function show(n, val) {
    if (val == "empty") {
        // for if user add empty item
        if (n == -1) {
            p.classList.add("hide");
            return -1;
        }
        p.innerHTML = `Please enter a value first ${n}`;
        p.classList.remove("hide");
        timeoutId = setTimeout(() => {
            // this settimeout will run after every 1 sec and after each sec it call show(n-1) once n = -1 the function stops
            return show(n - 1, "empty");
        }, 1000);
    }
    else if (val == "edit") {
        // for if user add  item 2 items at a time
        if (n == -1) {
            p.classList.add("hide");
            return -1;
        }
        p.innerHTML = `Please Edit the value first ${n}`;
        p.classList.remove("hide");
        timeoutId = setTimeout(() => {
            return show(n - 1, "edit");
        }, 1000);
    }
    else if (val == "delete") {
        // for if user delete  item
        if (n == -1) {
            p.classList.add("hide");
            return -1;
        }
        p.innerHTML = `Please first select an item ${n}`;
        p.classList.remove("hide");
        timeoutId = setTimeout(() => {
            return show(n - 1, "delete");
        }, 1000);
    }
}
//! for add todo
function addTodo() {
    let uniqueId = crypto.randomUUID();
    if (input.value.trim() !== "") {
        const todo_item = ({ item: input.value, id: uniqueId });
        todo.push(todo_item);
        sessionStorage.setItem("todo", JSON.stringify(todo));
        createTodoItem(todo_item);
    }
    else {
        if (timeoutId) {
            clearTimeout(timeoutId);
            p.classList.add("hide");
        }
        show(10, "empty");
    }
    input.value = "";
}
function createTodoItem(todos) {
    console.log("todo from UI function", todos);
    let li = document.createElement("li");
    let crossIcon = document.createElement("span");
    let editIcon = document.createElement("span");
    li.setAttribute("id", todos.id);
    editIcon.setAttribute("class", "span2");
    li.innerText = todos.item;
    crossIcon.innerHTML = "	\u{1F5D1}";
    editIcon.innerHTML = "\u270F\uFE0F";
    ul.appendChild(li);
    li.appendChild(crossIcon);
    li.appendChild(editIcon);
    //! logic for deleting todo and checked todo if user click
    li.addEventListener("click", (e) => {
        if (e.target == li) {
            li.classList.toggle("checked");
            // if delete item is checked
        }
        else if (e.target == crossIcon &&
            li.getAttribute("class") == "checked") {
            //! deleting same item in local storage
            let new_array = todo.filter((obj) => li.getAttribute("id") != obj.id); // filter out all items which satisfy the condition and return all them as a new array 
            todo = new_array; // assign new array to todo
            sessionStorage.setItem("todo", JSON.stringify(todo));
            crossIcon.parentElement?.remove();
            if (timeoutId) {
                clearTimeout(timeoutId);
                p.classList.add("hide");
            }
            editIcon.classList.add("hide");
            //if delete item is not checked
        }
        else if (e.target == crossIcon &&
            li.getAttribute("class") !== "checked") {
            if (timeoutId) {
                clearTimeout(timeoutId);
                p.classList.add("hide");
            }
            show(10, "delete");
            //edit
        }
        else if (e.target == editIcon) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            p.classList.add("hide");
            // hide prev warning if there
            console.log(curentEditinLi, "current");
            if (curentEditinLi == null) {
                curentEditinLi = li;
                crossBtn = crossIcon;
                editTodo();
            }
            else {
                show(10, "edit");
            }
        }
    });
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    p.classList.add("hide"); // if user add values then remove prev warnings
}
//! for edit todo
function editTodo() {
    // console.log("targeted", editBtn);
    // console.log("current li", curentEditinLi?.getAttribute("id"));
    // console.log("li", curentEditinLi!.firstChild?.nodeValue);
    if (curentEditinLi.firstChild?.nodeValue) {
        input.value = curentEditinLi.firstChild.nodeValue;
        curentEditinLi.firstChild.nodeValue = "";
        crossBtn?.classList.add("hide");
        btn.classList.add("hide");
        btn2.classList.remove("hide");
    }
}
//! to save the edit todo
btn2.addEventListener("click", (e) => {
    if (input.value.trim() != "") {
        //! editing same item in local storage
        let new_array = todo.forEach((obj) => {
            if (obj.id == curentEditinLi?.getAttribute("id")) {
                obj.item = input.value;
            }
        });
        sessionStorage.setItem("todo", JSON.stringify(todo));
        curentEditinLi.firstChild.nodeValue = input.value;
        crossBtn.classList.remove("hide");
        btn.classList.remove("hide");
        btn2.classList.add("hide");
        input.value = "";
        if (timeoutId) {
            clearTimeout(timeoutId);
            p.classList.add("hide");
        }
        curentEditinLi = null;
    }
    else {
        if (timeoutId) {
            clearTimeout(timeoutId);
            p.classList.add("hide");
        }
        show(10, "empty");
    }
});
function load_Todo__on_Resfresh() {
    let storedTodo = sessionStorage.getItem('todo');
    let todos_from_session_storage = storedTodo ? JSON.parse(storedTodo) : [];
    console.log(todos_from_session_storage, "from session storage");
    todo = [...todos_from_session_storage]; //?  on refersh let todo: Custom[] = [] varaible on top become empty so thats why we assign it all the values in session storage to todo variable
    if (todos_from_session_storage) {
        todos_from_session_storage.forEach(createTodoItem); // each individual item. from this todos_from_session_storage passs to the createTodoItem fnction
    }
}
load_Todo__on_Resfresh();
