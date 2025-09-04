let welcomeDiv = document.querySelector('.welcome') as HTMLDivElement
let incBtn = document.querySelector('.incrementBtn')
let dcrBtn = document.querySelector('.dcrementBtn')
let result = document.querySelector('.count') as HTMLDivElement
let restBtn  = document.querySelector('.rest-btn') as HTMLDivElement




let tagNames : string[] = []
let count  : number  = 0 ;



welcomeDiv.addEventListener('animationend' , (e)=>{
    let el = e.target as HTMLElement
    tagNames.push(el.tagName)
    console.log(tagNames)
    
    if(tagNames.length == 4 && tagNames.pop() == 'P'){
        welcomeDiv.classList.add('hide')
    }
})


function increment(){
    if(count >= 0){
    count++
    console.log("count increment" , count)
    result.innerText = `${count}`
    sessionStorage.setItem('count' , JSON.stringify(count))
    console.log("working Incr")
    }
        
}


function decrement(){
    if(count > 0){
    count--
    console.log("count decrement" , count)
    result.innerText = `${count}`
    sessionStorage.setItem('count' , JSON.stringify(count))
    console.log("working Decr")
    }
    
}


function reset(){
    if(count >= 0){
    count = 0
    console.log("count reset" , count)
    result.innerText = `${count}`
    sessionStorage.setItem('count' , JSON.stringify(count))
    console.log("working reset")
    }
    
}


incBtn?.addEventListener('click' , increment)
dcrBtn?.addEventListener('click' , decrement)
restBtn?.addEventListener('click' , reset)


function onRefresh(){
   let value  =  sessionStorage.getItem('count')
   if (value){
    count = JSON.parse(value)
    result.innerText = `${count}`


   }
}


onRefresh()
