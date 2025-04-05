import './App.scss'
import {Route, Routes} from "react-router";
import NoteListPage from "./pages/note-list.page.tsx";
import {NoteContentPage} from "./pages/note-content.page.tsx";
import {Form} from "react-bootstrap";
import {LoginPage} from "./pages/login.page.tsx";
import {RegisterPage} from "./pages/register.page.tsx";
import {Account} from "./components/Account.tsx";
import {ConfirmPage} from "./pages/confirm.page.tsx";

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
      <div style={{margin: '1rem'}}>
          <header style={{display: 'flex', justifyContent: 'space-between'}}>
              <Form>
                  <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Theme"
                      onClick={() => changeTheme()}
                  />
              </Form>
              <Account />
          </header>
          <Routes>
            <Route path={'/'} element={<NoteListPage />}></Route>
            <Route path={'/login'} element={<LoginPage />}></Route>
            <Route path={'/registration'} element={<RegisterPage />}></Route>
            <Route path={'/confirm'} element={<ConfirmPage />}></Route>
            <Route path={'/:id'} element={<NoteContentPage />}></Route>
              <Route path={'/new'} element={<NoteContentPage />}></Route>
          </Routes>
      </div>
      )
}

export default App
