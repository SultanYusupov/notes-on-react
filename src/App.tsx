import './App.css'
import {Route, Routes} from "react-router";
import NoteList from "./components/NoteList.tsx";
import {NoteContent} from "./components/NoteContent.tsx";
function App() {
  return(
          <Routes>
            <Route path={'/'} element={<NoteList />}></Route>
            <Route path={'/:noteId'} element={<NoteContent />}></Route>
          </Routes>
      )
}

export default App
