import './App.css'
import NotePreview from "./components/NotePreview.tsx";

function App() {
  const note = {
    id: 0,
    title: 'Static Title',
    text: 'Static Text',
    dateCreate: '30 January 2025'
  }

  return (
    <>
    <NotePreview note={note} />
    </>
  )
}

export default App
