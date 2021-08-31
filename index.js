// const http = require("http");

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

const { request } = require("express");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" })
//   response.end("Hello")
// });

app.get("/", (request, response) => {
  response.send("hola");
});

app.get("/api/notes", (request, response) => {
  // console.log(request);
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);

  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);

  notes = notes.filter((note) => note.id === id);

  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const note = request.body;

  const ids = notes.map((note) => note.id);

  const maxId = Math.max(...ids);

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== "undefined" ? note.important : false,
    date: new Date().toISOString,
  };

  notes = [...notes, newNote];
  // notes=notes.concat(newNote)

  response.json(newNote);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  //Se le dice que cuando se termine de levantar imprima por ser asincrono
});

//  Express permite el manejo de rutas de una manera mas simple y permite los middlewars

//Sematica 2.0.7    7 === parche arraglar un problema   2 === version 0 === nuevas funciones
