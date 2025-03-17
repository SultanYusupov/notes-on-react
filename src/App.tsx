import './App.scss'
import {Route, Routes, useNavigate} from "react-router";
import NoteList from "./components/NoteList.tsx";
import {NoteContent} from "./components/NoteContent.tsx";
import {Form} from "react-bootstrap";
import {Login} from "./components/Login.tsx";
import {Register} from "./components/Register.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./hooks/redux-hooks.ts";
import {Account} from "./components/Account.tsx";

function App() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const {data: refreshData, isError: isTokenError} = useRefreshQuery();
    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         dispatch(setUser(refreshData!.user));
    //         dispatch(setAuth(true));
    //     }
    // }, [dispatch, refreshData])
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
          <Account />
          <Routes>
            <Route path={'/'} element={<NoteList />}></Route>
            <Route path={'/login'} element={<Login />}></Route>
            <Route path={'/registration'} element={<Register />}></Route>
            <Route path={'/:id'} element={<NoteContent />}></Route>
              <Route path={'/new'} element={<NoteContent />}></Route>
          </Routes>
      </div>
      )
}

export default App
