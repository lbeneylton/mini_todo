const API_URL = "https://backend-u62c.onrender.com/";

async function loadTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  const tasks = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t.title;
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value;

  await fetch(`${API_URL}/tasks?title=${title}`, {
    method: "POST"
  });

  input.value = "";
  loadTasks();
}

loadTasks();
