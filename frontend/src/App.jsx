
import { useState, useEffect } from 'react'
import {Note} from './Notes';
import {Notification} from './Notification';
import noteService from './services/notes';
import Footer from './Footer';

function App() {
const [notes, setNotes] = useState(null); 
const [newNote, setNewNote] = useState('');
const [showAll, setShowAll] = useState(true);
const [errorMessage, setErrorMessage] = useState(null)

/* ESTA ES LA FORMA DE HACERLO CON FETCH
useEffect(()=>{
  console.log('useEffect');
  fetch('db.json')
  .then(response => response.json())
  .then(data => {
    setNotes(data.notes);
  })
},[])
*/

// ESTA ES LA FORMA DE HACERLO CON AXIOS
// Usamos useEffect para que la petición se haga una vez que el componente se haya renderizado de lo contrario no funcionará
// debido a que el componente se renderiza antes de que se haga la petición a la base de datos
useEffect(()=>{
  noteService.getAll()
  .then(initialNotes =>{
    setNotes(initialNotes);
  })
},[])

if(!notes){
  return null
}

// Esta función se encarga de manejar el cambio en el input
const handleChange =(event) =>{
setNewNote(event.target.value);
}

// Esta función se encarga de manejar el cambio en la importancia de la nota
const toggleImportanceOf = (id) =>{
  const note = notes.find(n => n.id === id);
  const changedNote = {...note, important: !note.important}
  
  noteService.update(id, changedNote)
  .then(returnedNote =>{
    setNotes(notes.map(note => note.id !== id ? note : returnedNote))
  })
  .catch(() =>{
    setErrorMessage(`Note  ${note.content}  was already removed from server`  )
    setTimeout(()=>{
      setErrorMessage(null)
    },5000)
    setNotes(notes.filter(n => n.id !== id))
  })
}

// Esta función se encarga de manejar el submit del formulario
const handleSubmit =(event) =>{
  event.preventDefault();
  //
  const noteToAddToState ={
        content: newNote,
        important: Math.random() < 0.5
  }
  // Usamos axios para hacer la petición POST(enviar la nota a la base de datos)
  noteService.create(noteToAddToState)
  .then(returnedNote =>{
    setNotes(notes.concat(returnedNote));
    setNewNote(''); 
  })
}

// Esta función se encarga de mostrar las notas
const notesToShow = showAll 
                  ? notes 
                  : notes.filter( note => note.important)
  return (
    <>
      <h1>Notas</h1>
      <Notification message={errorMessage}/>
      <button onClick={()=>setShowAll( !showAll )}>
        {showAll ? 'Show important' : 'Show all'}
      </button>
      <ul>
        {notesToShow.map(note => 
        <Note key={note.id} 
        content = {note.content}
        toggleImportance={()=>toggleImportanceOf(note.id)}
          />
        )}
      </ul>

     <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote}/>
        <button>Crear nota</button>
     </form>

   <Footer />
    </>
  )
}

export default App
