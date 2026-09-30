const express = require("express");
const db = require("./database/database");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));


// GET all todos
app.get("/api/todos", (request, response) => {
  db.all("SELECT * FROM todos", [], (error, rows) => {
    if (error) {
      return response.status(500).json({ error: error.message });
    }
    response.json(rows);
  });
});

// POST a new todo
app.post("/api/todos", (request, response) => {
  const { title } = request.body;
  if (!title || title.trim() === "") {
    return response.status(400).json({ error: "Task title is required" });
  }

  const sql = "INSERT INTO todos (title) VALUES (?)";
  db.run(sql, [title], function (error) {
    if (error) {
      return response.status(500).json({ error: error.message });
    }
    response.json({
      id: this.lastID,
      title: title,
      completed: 0
    });
  });
});

// PUT update a todo
app.put("/api/todos/:id", (request, response) => {
  const { id } = request.params;
  const { title, completed } = request.body;
  const sql = "UPDATE todos SET title = ?, completed = ? WHERE id = ?";

  db.run(sql, [title, completed ? 1 : 0, id], function (error) {
    if (error) {
      return response.status(500).json({ error: error.message });
    }
    response.json({ message: "Todo updated successfully" });
  });
});

// DELETE a todo
app.delete("/api/todos/:id", (request, response) => {
  const { id } = request.params;
  db.run("DELETE FROM todos WHERE id = ?", [id], function (error) {
    if (error) {
      return response.status(500).json({ error: error.message });
    }
    response.json({ message: "Todo deleted successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});