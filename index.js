const todoInput = document.getElementById("todoInput");
const todoBtn = document.getElementById("todoBtn");
const todoUl = document.getElementById("todoUl");

const todo_key = "todo_key";
let todoObj = [];

todoBtn.onclick = function todoInsert() {
  let todoInpValue = todoInput.value.trim();
  if (todoInpValue === "") {
    alert("you must enter something");
    return;
  }

  todoObj.push(todoInpValue);
  saveTodos();
  renderTodos();
  todoInput.value = "";
  todoInput.focus();
  console.log(todoObj);
  console.log(localStorage);
};

function saveTodos() {
  localStorage.setItem(todo_key, JSON.stringify(todoObj));
}
function loadTodos() {
  const raw = localStorage.getItem(todo_key);
  todoObj = raw ? JSON.parse(raw) : [];
}

loadTodos();
renderTodos();

function renderTodos() {
  let html = "";

  todoObj.forEach((el, index) => {
    html += `<li class="todoLi"> 
   <span>${el}</span>
       <button class="todoDeleteBtn" onclick="deleteItem(${index})">delete</button>
  </li>`;
  });
  todoUl.innerHTML = html;
}
function deleteItem(index) {
  todoObj.splice(index, 1);
  saveTodos();
  renderTodos();
}
