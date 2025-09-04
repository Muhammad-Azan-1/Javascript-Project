let btn = document.querySelector('.btn')
let resultBox = document.querySelector('.result')
let resultbmiBox = document.querySelector('.resultbmi')
let alertBox  =document.querySelector('.error')

resultBox.classList.add('hide')
resultBox.classList.add('hide')


   
btn.addEventListener('click', (e)=>{
    e.preventDefault()
     let height = document.querySelector('#height')
    let weight = document.querySelector('#weight')

    let height_in_meter = height.value / 100

    if(weight.value.trim() == '' || weight.value <= 0  || isNaN(weight.value) ||
    height.value.trim() == '' || height.value <= 0 || isNaN(height.value)  ){
            alertBox.classList.remove('hide')
              resultBox.classList.add('hide')
            alertBox.innerHTML = '<p>Please enter a valid number</p>'

    }else{

            const BMI = (weight.value) / (height_in_meter ** 2)
            resultBox.classList.remove('hide')
             alertBox.classList.add('hide')
            if(BMI < 18.5){
            resultbmiBox.innerText = `${BMI.toFixed(0)} Your are under weight`
            } else if (BMI > 18.5  &&  BMI<= 25){
                  resultbmiBox.innerText = `${BMI.toFixed(0)} Your are Normal weight`
            }else if (BMI > 25  &&  BMI<= 30){
                  resultbmiBox.innerText = `${BMI.toFixed(0)} Your are Over weight`
            }else{
                 resultbmiBox.innerText = `${BMI.toFixed(0)} Your are Obese`
            }
    }
})




