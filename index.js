const todoInput = document.getElementById("todoInput");
const todoBtn = document.getElementById("todoBtn");
const todoUl = document.getElementById("todoUl");
const todo_key = "todo_key";
let todoObj = [];
let draggedId = null;

let currentFilter  = "all"


todoUl.addEventListener("drop", function (e) {
  e.preventDefault();

  const targetLi = e.target.closest("li");
  if (!targetLi) return;

  const targetId = targetLi.dataset.id;

  if (draggedId === targetId) return;

  const fromIndex = todoObj.findIndex((t) => t.id === draggedId);
  const toIndex = todoObj.findIndex((t) => t.id === targetId);

  if (fromIndex === -1 || toIndex === -1) return;

  const [movedItem] = todoObj.splice(fromIndex, 1);
  todoObj.splice(toIndex, 0, movedItem);

  saveTodos();
  renderTodos();
});

todoUl.addEventListener("dragstart", function (e) {
  const handle = e.target.closest(".dragHandle");
  if (!handle) {
    e.preventDefault();
    return;
  }

  const li = handle.closest("li");
  if (!li) return;

  draggedId = li.dataset.id;
});

todoUl.addEventListener("dragover", function (e) {
  e.preventDefault();
});

todoUl.addEventListener("click", function (e) {
  const btn = e.target.closest(".todoDeleteBtn");
  if (!btn) return;
  const li = btn.closest("li");
  if (!li) return;

  const id = li.dataset.id;

  const index = todoObj.findIndex((t) => t.id === id);
  if (index === -1) return;

  todoObj.splice(index, 1);
  lStorageSave();
});


   todoUl.addEventListener("change", function(e){
      const chekbox = e.target.closest(".todoCheckBox");
      if(!chekbox) return;

      const li = chekbox.closest("li");
      if(!li) return;

      const id = li.dataset.id

      const todo = todoObj.find((t) => t.id === id);
      if(!todo) return;

      todo.done = chekbox.checked;  
      saveTodos();
      renderTodos();
      })


todoBtn.onclick = function todoInsert() {
  let todoInpValue = todoInput.value.trim();
  if (todoInpValue === "") {
    alert("you must enter something");
    return;
  }
  const todo = {
    id: crypto.randomUUID(),
    text: todoInpValue,
    done: false
  };
  todoObj.push(todo);
  lStorageSave();
  todoInput.value = "";
  todoInput.focus();
};

function lStorageSave() {
  saveTodos();
  renderTodos();
}
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

  todoObj.forEach((el) => {
    const checked = el.done ? "checked" : "";
    const completed = el.done ? "completed" : "";
    html += `
    <li data-id="${el.id}" class="${completed}">
      <span class="dragHandle"  draggable="true">⋮⋮</span>  
        <input type="checkbox" class="todoCheckBox" ${checked}>
      <span class="todoText">${el.text}</span>
    <button class="todoDeleteBtn">Delete</button>
    </li>`;
  });
  todoUl.innerHTML = html;
}
