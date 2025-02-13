import './App.scss'
import {Route, Routes} from "react-router";
import NoteList from "./components/NoteList.tsx";
import {NoteContent} from "./components/NoteContent.tsx";
function App() {
  return(
      <>
          <Routes>
            <Route path={'/'} element={<NoteList />}></Route>
            <Route path={'/:id'} element={<NoteContent />}></Route>
              <Route path={'/new'} element={<NoteContent />}></Route>
          </Routes>
      </>
      )
}

export default App
