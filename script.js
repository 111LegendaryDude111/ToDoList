
window.addEventListener('DOMContentLoaded',()=> {
   let targetArray;
   if (localStorage.getItem('list')){
     targetArray = JSON.parse(localStorage.getItem('list'));
   }else{
    targetArray = [];
   }
   let btn = document.querySelector('#add'),
      out = document.querySelector('#out');


   btn.addEventListener('click', (e,i = 0) => {
      let targets = document.querySelector('#in').value;
      let temp = {};
      temp.text = targets;
      document.querySelector('#in').value = '';
      targetArray.push(temp);
      localStorage.setItem('list', JSON.stringify(targetArray));
      createEl();

   });

//добавления элементов на страницу
   function createEl(){
      let tempList = JSON.parse(localStorage.getItem('list'));
      if (tempList){
         out.innerHTML = '';
            for (let i = 0; i < tempList.length;i++){
               let div = document.createElement('div');
               div.classList.add('div-target')
               let input = document.createElement('input');
               input.setAttribute('type','checkbox');
               input.classList.add('checkbox');
               let img = document.createElement('img');
               img.src = 'close.png';
               img.classList.add('close');
               div.innerHTML += tempList[i].text;
               div.prepend(input);
               div.append(img);
               out.append(div);
            }
      }else{
         console.log('Hello,mate!');
      }

      
      let divs = document.querySelectorAll('.div-target');
      divs.forEach(item => {
         for (let i = 0; i < tempList.length;i++){
            if (item.innerText === tempList[i].text && tempList[i].state ){
               item.classList.add('check');
               item.childNodes[0].checked = 'checked';
            }

            }
      });
      inputEvent();
      closeBtn();
}
createEl();

  //добавления события на инпуты
   function inputEvent(){
      let inputs = document.querySelectorAll('.checkbox');
      let tempList = JSON.parse(localStorage.getItem('list'));

         inputs.forEach(input => input.addEventListener('change', (e)=>{
            let target = e.target;
            let parent = target.parentNode;
            
            if (parent.classList.contains('check')){
                  parent.classList.remove('check');
                  let j = tempList.findIndex(el => el.text === parent.innerText);
                  delete tempList[j].state;
            }else{
               parent.classList.add('check');
               let i = tempList.findIndex(el => el.text === parent.innerText);
               tempList[i].state = 'done';
            }
            localStorage.setItem('list', JSON.stringify(tempList));
         }));
   }

   //добавление события на картинки выдр удаления задачи
   function closeBtn(){
      let btn = document.querySelectorAll('.close');
      let tempList = JSON.parse(localStorage.getItem('list'));
      


      btn.forEach(btn => btn.addEventListener('click', (e) => {
         let target = e.target;
         let parent = target.parentNode;
         parent.style.display ='none';
         let i = tempList.findIndex(el => el.text === parent.innerText);
         delete tempList[i];
         tempList = tempList.filter(el => typeof(el) !== 'undefined');
         localStorage.setItem('list', JSON.stringify(tempList));
      }));
   }

//конпка очистки

   let clearBtn = document.querySelector('#clear');
   clearBtn.addEventListener('click', ()=>{
      localStorage.clear();
      location.reload();
   });

   let fjBtn = document.querySelector('#fj');
   fjBtn.addEventListener('click', () => {
      if (fjBtn.classList.contains('yellow')){
         document.body.style.backgroundColor = 'pink';
         fjBtn.classList.add('pink');
         fjBtn.classList.remove('yellow');
      }else if (fjBtn.classList.contains('pink')) {
         document.body.style.backgroundColor = 'yellow';
         fjBtn.classList.remove('pink');
         fjBtn.classList.add('yellow');
      }
   });
});