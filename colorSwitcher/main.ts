

let colorBox = document.querySelector('.colorbox') as HTMLDivElement;
let body = document.querySelector('body') as HTMLBodyElement
  let childs  =  [...colorBox.children ]


  childs.forEach((item)=>{
        item.addEventListener('click' , (e)=>{
            const target = e.target as HTMLElement; 
     if(target.className == 'box1'){
    body.style.backgroundColor = 'blue'
   }else if(target.className == 'box2'){
     body.style.backgroundColor = 'red'
   }else if(target.className == 'box3'){
     body.style.backgroundColor = 'green'
   }else if(target.className == 'box4'){
     body.style.backgroundColor = 'grey'
   }else if(target.className == 'box5'){
     body.style.backgroundColor = 'purple'
   }else{

   }
        })
    })

