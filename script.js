window.onload = function(){


   let toDoList = [];
   if( localStorage.getItem('todo') != undefined){
      toDoList = JSON.parse(localStorage.getItem('todo'));
      out();
   }


   document.getElementById('add').onclick = function(){
      let d = document.getElementById('in').value;
      document.getElementById("in").value = "";
      let temp = {};
      temp.todo = d;
      temp.check = false;
      let i = toDoList.length;
      toDoList[i] = temp;
      console.log(toDoList);
      out();
      localStorage.setItem('todo', JSON.stringify(toDoList));
   }

   function out() {
      let out = '';
      for ( let key in toDoList){
         if( toDoList[key].check === true){
            out += '<input type="checkbox" checked>';
         }else {
            out += '<input type="checkbox">';
         }
         out += toDoList[key].todo + '<br>';
      }
      document.getElementById('out').innerHTML = out;
   }
};

