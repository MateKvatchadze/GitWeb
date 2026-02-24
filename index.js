const todoInput = document.getElementById("todoInput");
const todoBtn = document.getElementById("todoBtn");
const todoUl = document.getElementById("todoUl");

const todo_key = "todo_key"
const todoObj = []
todoBtn.onclick = function todoInsert(){
  let todoInpValue = todoInput.value.trim();
    if(todoInpValue===""){
       alert("you must enter something");
    return;
    };
    
    todoObj.push(todoInpValue);

  renderTodos();
todoInput.value = "";
todoInput.focus();
console.log(todoObj)
}


function renderTodos(){

 let html = "";

 todoObj.forEach((el, index) => {
 html+=
 `<li class="todoLi"> 
   <span>${el}</span>
       <button class="todoDeleteBtn" onclick="deleteItem(${index})">delete</button>
  </li>`;
  });
todoUl.innerHTML = html;
}
function deleteItem(index){
  todoObj.splice(index, 1);
  renderTodos();
}

// localStorage.setItem(todo_key, todoInpValue)