const express = require('express')
const app = express()
app.use(express.json())

// const app = createServer((request, respones) => {
//   Response.writeHead(200, {'Content-Type':'aplication/json'});
//   Response.end(JSON.stringify(notes));  
// })


let notes = [
    {
        "id": 1,
        "content": "Hacer los foros de Saul",
        "date": "2023-05-30T17:30:31.098Z",
        "important": true
    },
    {
        "id": 2,
        "content": "Respirar 24/7",
        "date": "2023-05-30T18:39:34.091Z",
        "important": false
    },
    {
        "id": 3,
        "content": "No discutir con los maestros",
        "date": "2023-05-30T19:20:14.298Z",
        "important": true
    }
]


app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})
app.get('/api/notes', (request, response) => {
  response.json(notes);
})
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id)
  if(note){
    response.json(note)
  } else{
    response.status(404).end()
  }
})
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body;

  if (!note||!note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId +1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important:false,
    date: new Date().toISOString()
  }
  notes = [...notes, newNote]
  response.status(201).json(newNote)
})
app.post('/api/notes', (request, response) => {
  const note = request.body
  console.log(note)
  response.json(note)
})

const PORT = 4000;

app.listen(PORT, () => {
  console.log()
})