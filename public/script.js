const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");
const container1 = document.getElementById("container1");

let currentFilter = "all";

// Date display
let h1 = document.createElement("h1");
h1.textContent = "DATE: " + new Date().toLocaleDateString();
h1.style.paddingTop = "20px";
h1.style.color = "#070707";
h1.style.fontSize = "18px";
h1.style.fontFamily = "roboto";
if (container1) {
  container1.appendChild(h1);
}

// Load tasks with filtering
async function loadTodos(filter = currentFilter) {
  currentFilter = filter;

  try {
    const response = await fetch("/api/todos");
    const todos = await response.json();

    todoList.innerHTML = "";

    todos.forEach((todo) => {
      const isCompleted = Number(todo.completed) === 1;

      // Filter logic: match 1 / 0 from SQLite
      if (filter === "active" && isCompleted) {
        return;
      }
      if (filter === "completed" && !isCompleted) {
        return;
      }

      createTodoElement(todo);
    });
  } catch (error) {
    console.error("Failed to load todos:", error);
  }
}

// Render single task item
function createTodoElement(todo) {
  const li = document.createElement("li");
  li.className = "todo-item";

  const isCompleted = Number(todo.completed) === 1;

  li.innerHTML = `
    <span class="${isCompleted ? "completed" : ""}">
      ${todo.title}
    </span>
    <div>
      <button onclick="toggleTodo(${todo.id}, ${todo.completed})" style="background: none; border: none; padding: 0; cursor: pointer;">
        ${
          isCompleted
            ? '<i class="fa-solid fa-arrow-rotate-left">Undo</i>'
            : '<i class="fa-solid fa-check">Complete</i>'
        }
      </button>
      <i class="fa-solid fa-trash-can delete-button" onclick="deleteTodo(${todo.id})" style="cursor: pointer; margin-left: 10px;">Delete</i>
    </div>
  `;

  todoList.appendChild(li);
}

// Add a task
addButton.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

async function addTodo() {
  const title = todoInput.value.trim();
  if (title === "") {
    alert("Please enter a task");
    return;
  }

  await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title: title })
  });

  todoInput.value = "";
  loadTodos(currentFilter);
}

// Delete a task
async function deleteTodo(id) {
  await fetch(`/api/todos/${id}`, {
    method: "DELETE"
  });
  loadTodos(currentFilter);
}

// Toggle complete / undo
async function toggleTodo(id, completed) {
  const response = await fetch("/api/todos");
  const todos = await response.json();
  const todo = todos.find((t) => t.id === id);

  if (!todo) return;

  // Toggle between 1 and 0
  const updatedStatus = Number(completed) === 1 ? 0 : 1;

  await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: todo.title,
      completed: updatedStatus
    })
  });

  loadTodos(currentFilter);
}

loadTodos("all");