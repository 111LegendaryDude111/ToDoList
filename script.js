window.onload = function(){


   let toDoList = [];
   // if( localStorage.getItem('todo') != undefined &&  localStorage.getItem('todo'))
   if( localStorage.getItem('todo') != undefined ){
      toDoList = JSON.parse(localStorage.getItem('todo'));
      out();
      console.log(typeof localStorage.getItem('todo'));
   }
   document.getElementById('add').onclick = function(){
      let d = document.getElementById('in').value;
      document.getElementById("in").value = "";
      let temp = {};
      temp.todo = d;
      temp.check = false;
      temp.background = '';
      let i = toDoList.length;
      toDoList[i] = temp;
      console.log(toDoList);
      out();
      checkCheckboxes();
      localStorage.setItem('todo', JSON.stringify(toDoList));
   };

function checkCheckboxes() {
   let checkboxes = document.querySelectorAll('input[type=checkbox]');

   for (let i = 0; i < checkboxes.length; i++) {
       checkboxes[i].onchange = function () {
           toDoList = JSON.parse(localStorage.getItem('todo'));
           toDoList[i].check = this.checked;
         //   this.style.color = 'green';
         //   console.log(document.querySelectorAll(`label[for=input-${i}]`)[0].style.color = 'green');
         document.querySelectorAll(`label[for=input-${i}]`)[0].style.background = 'green';
         toDoList[i]["background"] = 'green';
         console.log(toDoList[i]);
           localStorage.setItem('todo', JSON.stringify(toDoList));
       };
   }
}
   function out() {
      let out = '';
      for ( let key in toDoList){
         if( toDoList[key].check === true){
            out += '<input id="input-'+ key + '" class="inputCheck" type="checkbox" checked> <label style="background:'+ toDoList[key].background+'" for="input-'+ key + '" > '+ toDoList[key].todo +'</label>';
         }else {
            out += '<input id="input-'+ key + '" class="inputCheck" type="checkbox"> <label style="background:'+ toDoList[key].background+'" for="input-'+ key + '" > '+ toDoList[key].todo +' </label>';
         }
         // out += toDoList[key].todo + '<br>';
         out +=  '<br>';
      }
      
      document.getElementById('out').innerHTML = out;

   }
};

document.getElementById('clear').onclick = function(){
   localStorage.removeItem('todo');
   location.reload();
};