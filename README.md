# Full-Stack Todo Application

A lightweight task management web application built with JavaScript, Node.js, Express, and an SQLite database.
It supports full CRUD operations to add, view, toggle completion status, and delete tasks dynamically.
Features real-time client-side status filtering across All, Active, and Completed task states.
Run `npm install` and start the local server with `node server.js` to view it at `http://localhost:3000`.
Designed with an intuitive, responsive interface for fast daily productivity tracking.

Architecture
        TO-DO APP
           |
 +---------+--------+
 |                  |
 FRONTEND         BACKEND
 HTML/CSS/JS   Node.js + Express
 |                  |
 |     REST API     |
 +----------------->+
                    |
                    v
                SQLite DB
                    |
                    v
                todos.db


Final folder structure
todo-app/
|
|-- node_modules/
|
|-- public/
| |-- index.html
| |-- style.css
| `-- script.js
|
|-- database/
| `-- database.js
|
|-- server.js
|-- package.json
`-- package-lock.json
