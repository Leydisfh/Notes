// Esta es una libreria que tenemos que instalar -> npm install express
// Asi debe de quedar el package.json "scripts": {
// "start": "node index.js",
//"dev": "nodemon index.js",
const express = require('express')
const port = process.env.PORT || 4000;
const cors = require('cors')

const app = express()

//Middleware
app.use(cors()) // Para que se pueda hacer peticiones desde otro servidor
app.use(express.json()) // Para que se pueda leer el body de la peticion post
app.use(express.static('dist')) // Para que se pueda acceder a la carpeta dist

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

app.get('/', (req, res)=>{
    res.send('<h1>Hello World</h1>')
})
app.get('/api/notes', (req,resp)=>{
    resp.json(notes)
})

app.get('/api/notes/:id', (req,resp)=>{
    // Esto porque devuelve un string, y se necesita un numero
    const id = Number(req.params.id)
    // Busca la nota con el id que se le pasa
    const note = notes.find(note => note.id === id)
    if(note){
        resp.json(note)
    }else{
        resp.status(404).end()
    }
})

//Vamos a eliminar una nota
app.delete('/api/notes/:id', (req, resp)=>{
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    resp.status(204).end()
})

const generateId = () =>{
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
     return maxId + 1
}

// Para crear una nueva nota
app.post('/api/notes', (req, resp)=>{
   
   const body = req.body 

    if(!body.content){
        return resp.status(400).json({
            error: 'content is missing'
        })
    }

  const note = {
    content : body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }
  notes = notes.concat(note)
    resp.json(note)
})

// Para que el puerto sea dinamico

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})
