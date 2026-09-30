const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/todos.db", (error) => {
 if (error) {
 console.log("Database connection failed");
 } else {
 console.log("Connected to SQLite database");
 }
});
db.run(`
 CREATE TABLE IF NOT EXISTS todos (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT NOT NULL,
 completed INTEGER DEFAULT 0
 )
`);
module.exports = db;