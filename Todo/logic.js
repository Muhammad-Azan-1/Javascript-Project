
let date = new Date()
// console.log(date.getUTCSeconds())
// console.log(date)

// let sec = date.getUTCSeconds()


// if(){
//     console.log("hi")
// }


// while(sec < 10){
// console.log("hi")
// } 


function myfunc(n) {
       if(n == 0){
        return 0
    }
     console.log(n)
    setTimeout(()=>{
    return myfunc(n-1)
    },1000)
   
    
}

myfunc(10)


// setTimeout(() => {
//         console.log("hello")
// }, 5000);

// let val = setInterval(()=>{
//     console.log("hello js")
// },1000)

// // console.log(val)

// let al2 = setImmediate(()=>{
//     console.log("hello js 5")
// },5000)


// se