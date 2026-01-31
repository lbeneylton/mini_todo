const API_URL = "https://backend-u62c.onrender.com"; // sem barra no final

async function loadTasks() {
  try {
    const res = await fetch(`${API_URL}/tasks`);

    if (!res.ok) {
      console.error("Erro ao buscar tasks:", res.status);
      return;
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Resposta não é um array:", data);
      return;
    }

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    data.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.title;
      list.appendChild(li);
    });

  } catch (err) {
    console.error("Erro de conexão com a API:", err);
  }
}

async function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();

  if (!title) return;

  try {
    const res = await fetch(
      `${API_URL}/tasks?title=${encodeURIComponent(title)}`,
      { method: "POST" }
    );

    if (!res.ok) {
      console.error("Erro ao criar task:", res.status);
      return;
    }

    input.value = "";
    loadTasks();

  } catch (err) {
    console.error("Erro ao enviar task:", err);
  }
}

// carrega automaticamente ao abrir a página
loadTasks();
