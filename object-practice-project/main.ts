let btns_3 = document.getElementsByClassName("button-with-same-class"); //. btn 1 , 3 ,4
let btn2 = document.getElementsByClassName("button2");
let btn5 = document.querySelector(".button5");
let btn6 = document.querySelector(".button6")

let input_container = document.getElementsByClassName("input-box");
let input = document.querySelector(".form-control") as HTMLInputElement;

let name_input = document.querySelector(".Employee-Name")  as HTMLInputElement;
let id_input = document.querySelector(".Employee-Id") as HTMLInputElement;
let company_input = document.querySelector(".Employee-Company") as HTMLInputElement;
let input_container2 = document.getElementsByClassName("input-box2");

let show_employe_container = document.querySelector( ".show-employe") as HTMLDivElement;
// console.log(btn1 ,btn2 , btn3 , btn4 , "all buttons")

console.log(input_container[0]);
let employe_data: { id: number; name: string; company: string }[] = [
  {
    id: 1,
    name: "Azan",
    company: "ABC Company",
  },

  {
    id: 2,
    name: " Muhammad Azan",
    company: "XYZ Company",
  },

  {
    id: 3,
    name: "Ali",
    company: "BCD Company",
  },

  {
    id: 4,
    name: "Anus",
    company: "ABC Company",
  },
];

let btn_array = [...btns_3];

type modes = "get" | "delete" | "total" | "Add" | null;
let mode: modes = null;

// show input
btn_array.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = e.target as HTMLElement; // current button which has been targeted
    mode = target.getAttribute("data-mode") as modes; // getting its data-mode value based on that we do operation for delete and get employe
    console.log("mode", mode);
    if (mode == "get" || mode == "delete") {
      // bcz we only need to show input fields for deleting and getting employee

      if (mode == "get") {
        btn5!.innerHTML = "Get";
      } else {
        btn5!.innerHTML = "Delete";
      }

      input_container[0].classList.remove("hide");
      input_container2[0].classList.add("hide");
      show_employe_container?.classList.add("hide");

    } else if (mode == "total") {
        show_total()

    } else
       {


     show_employe_container?.classList.add("hide");
     input_container[0].classList.add("hide");
    input_container2[0].classList.remove("hide");


    btn6?.addEventListener('click' , (e)=>{

           if (
    name_input?.value.trim() != '' &&
    id_input?.value.trim() != '' &&
    company_input?.value.trim() != ''
  ) {
     let val =  employe_data.some((item)=> Number(id_input?.value) == item.id  )
     
     console.log(val , "val")


      if(!val){
        employe_data.push({ id: Number(id_input.value), name: name_input?.value, company: company_input.value})
         show_employe_container?.classList.remove("hide");
        show_employe_container.innerHTML = `
             <p> Employee with Id : ${(id_input?.value)} has been Added successfully</p>
             `;
      }else{

         show_employe_container?.classList.remove("hide");
        show_employe_container.innerHTML = `
             <p> Employee with Id : ${(id_input?.value)} already exists please select a different id </p>
             `;

      }
    }
    })
  


    }
  });
});



//? get Employee , delete employ
btn5?.addEventListener("click", (e) => {
  //? get Employee
  if (mode == "get") {
    console.log(btn5?.innerHTML);
    if (input.value.trim() != "") {
      let obj = employe_data.find((item) => Number(input.value) == item.id);
      if (obj) {
        show_employe_container?.classList.remove("hide");
        show_employe_container.innerHTML = `
             <div>
            <div class="employee-details">
              <h2>Employee Id :</h2>
              <h3>${obj.id}</h3>
            </div>

           <div class="employee-details">
             <h2>Employee Name :</h2>
             <h3>${obj.name}</h3>
           </div>


          <div class="employee-details">
            <h2>Employee Company :</h2>
             <h3>${obj.company}</h3>
          </div>
      </div>`;
      } else {
        show_employe_container?.classList.remove("hide");
        show_employe_container.innerHTML = `
                 <p> Employee with id ${Number(
                   input.value
                 )} not found please add a new one</p>`;
      }
    }
  }
  //? delete employee
  else if (mode == "delete") {
    btn5!.innerHTML = "Delete";
    if (input.value.trim() != "") {
      let objIndex: number = employe_data.findIndex(
        (item) => Number(input.value) == item.id
      );
      console.log(objIndex);
      if (objIndex != -1) {
        show_employe_container?.classList.remove("hide");
        show_employe_container.innerHTML = `
             <p> Employee with Id : ${employe_data[objIndex].id} has been deleted successfully</p>
             `;

        employe_data.splice(objIndex, 1);
        console.log(employe_data, "Employee data");
      } else {
        show_employe_container?.classList.remove("hide");
        show_employe_container.innerHTML = `
                 <p> Employee with id ${Number(
                   input.value
                 )} not found please add a new one</p>`;
      }
    }
  }
});



//? show all users
 function show_total(){
     input_container[0].classList.add("hide");
      input_container2[0].classList.add("hide");
      console.log(mode, "from else");
      show_employe_container?.classList.remove("hide");
      show_employe_container.innerHTML = `
             <p> Total Employees with In the company are ${employe_data.length}</p>
      
             `;
 }


 console.log(employe_data)