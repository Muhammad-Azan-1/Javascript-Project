let box = document.querySelector('.box')

    

setInterval(()=>{
let date = new Date()
let time = date.toLocaleTimeString()
    box.innerHTML = `<p>${time}</p>`
},1000)