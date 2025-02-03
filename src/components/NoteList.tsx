import {useAppSelector} from "../hooks/redux-hooks.ts";
import {RootState} from "../state/store.ts";
import {iNote} from "../interfaces/iNote.ts";
import NotePreview from "./NotePreview.tsx";

export default function NoteList() {
    const notes = useAppSelector((state: RootState) => state.notes.noteList);

    return (
        <>
            {notes.length ? (notes.map((note:iNote) => {
                return <NotePreview note={note} key={note.id}/>
            })) : (
                <h4>У вас пока нет заметок. Давайте создадим новую!</h4>
            )}

        </>
    )
}