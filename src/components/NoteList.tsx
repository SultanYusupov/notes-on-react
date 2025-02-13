import {iNote} from "../interfaces/iNote.ts";
import NotePreview from "./NotePreview.tsx";
import {Header} from "./Header.tsx";
import {useNavigate} from "react-router";
import {useGetNotesQuery} from "../state/api";

export default function NoteList() {
    const {isLoading, data: notes} = useGetNotesQuery();
    const navigate = useNavigate();

    if (isLoading) {
        return <h4>Loading...</h4>
    }
    if (notes) {
        return (
            <div style={{margin: '1rem'}}>
                <Header style={{width: '25%', marginBottom: '1rem'}} displayBackButton={false}>
                    <i className="bi bi-plus-square" role={"button"} onClick={() => navigate('/new')}></i>
                    <i className="bi bi-search" style={{paddingLeft: '1rem'}} role={"button"}></i>
                </Header>
                <div
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {notes.length ? (notes.map((note: iNote) => {
                        return <NotePreview note={note} key={note.id}/>
                    })) : (
                        <h4>У вас пока нет заметок. Давайте создадим новую!</h4>
                    )}
                </div>
            </div>
        )
    }

}