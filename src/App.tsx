import './App.css'
import NotePreview from "./components/NotePreview.tsx";
import {RootState} from "./state/store.ts";
import {useAppDispatch, useAppSelector} from "./hooks/redux-hooks.ts";
import { add } from './state/notesSlice'
import {useEffect} from "react";
import {noteService} from "./services/note.service.ts";
import {iNote} from "./interfaces/iNote.ts";

function App() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state: RootState) => state.notes.noteList)
  const note = {
    id: 0,
    title: 'Static Title',
    text: 'Static Text',
    dateCreate: '30 January 2025'
  }
  useEffect(() => {
    const asyncNoteListFunc = async () => {
      return await noteService.getNoteList();

    };
    asyncNoteListFunc().then((result: iNote[]) => {
      result.map(r => {
        dispatch(add(r));
        console.log(notes)
      });
    });
  }, [])

  return (
    <>
    <NotePreview note={note} />
    </>
  )
}

export default App
