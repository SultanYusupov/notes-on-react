import './App.css'
import {Route, Routes} from "react-router";
import NoteList from "./components/NoteList.tsx";
import {NoteContent} from "./components/NoteContent.tsx";
import {useAppDispatch, useAppSelector} from "./hooks/redux-hooks.ts";
import {RootState} from "./state/store.ts";
import {useEffect, useRef} from "react";
import {noteService} from "./services/note.service.ts";
import {iNote} from "./interfaces/iNote.ts";
import {add} from "./state/notesSlice.ts";
function App() {
    const notes = useAppSelector((state: RootState) => state.notes.noteList);
    const dispatch = useAppDispatch();
    const isEffectRun = useRef(false); // Флаг для отслеживания выполнения эффекта
    useEffect(() => {
        if (isEffectRun.current) return; // Если эффект уже выполнен, выходим
        isEffectRun.current = true; // Устанавливаем флаг
        const asyncNoteListFunc = async () => {
            return await noteService.getNoteList();
        };
        asyncNoteListFunc().then((result: iNote[]) => {
            result.forEach(r => {
                if (!notes.some((note) => note.id === r.id)) { // Проверка на дубликаты, когда возвращаемся из NoteContent
                    dispatch(add(r));
                }
            });

        });
    }, [dispatch])
  return(
          <Routes>
            <Route path={'/'} element={<NoteList />}></Route>
            <Route path={'/:noteId'} element={<NoteContent />}></Route>
              <Route path={'/new'} element={<NoteContent />}></Route>
          </Routes>
      )
}

export default App
