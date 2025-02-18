import './App.scss'
import {Route, Routes} from "react-router";
import NoteList from "./components/NoteList.tsx";
import {NoteContent} from "./components/NoteContent.tsx";
import {Form} from "react-bootstrap";

function App() {
    function changeTheme() {
        const htmlElement = document.documentElement;
        if (htmlElement.dataset.bsTheme === 'dark') {
            htmlElement.dataset.bsTheme = 'light';
        } else {
            htmlElement.dataset.bsTheme = 'dark';
        }
    }
  return(
      <div>
          <Form>
              <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Theme"
                  onClick={() => changeTheme()}
              />
          </Form>
          <Routes>
            <Route path={'/'} element={<NoteList />}></Route>
            <Route path={'/:id'} element={<NoteContent />}></Route>
              <Route path={'/new'} element={<NoteContent />}></Route>
          </Routes>
      </div>
      )
}

export default App
