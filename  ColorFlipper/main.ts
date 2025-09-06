let listItems = document.querySelectorAll('li')
let ul = document.querySelector('ul')



listItems.forEach((items)=>{
 let color : string = items.innerText.trim().toLocaleLowerCase()
 items.style.color = color
})


ul?.addEventListener('click' , (e)=>{
    let element = e.target as HTMLUListElement
    let color = element.innerText.trim().toLocaleLowerCase()
    document.body.style.backgroundColor = color


    
})