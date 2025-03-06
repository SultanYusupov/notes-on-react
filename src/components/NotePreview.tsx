import {CloseButton, Toast} from "react-bootstrap";
import {useState} from "react";
import {iNote} from "../interfaces/iNote.ts";
import {useNavigate} from "react-router";
import {useDeleteNoteMutation} from "../state/api/note.api.ts";

export default function NotePreview({note}:{note: iNote}) {
    const [toggleHover, setToggleHover] = useState({cursor: 'default', boxShadow: 'none'});
    const navigate = useNavigate();
    const [deleteNote] = useDeleteNoteMutation();
    function toggleCursorPointer(cursorStyle: string, borderStyle: string) {
        setToggleHover({cursor: cursorStyle, boxShadow: borderStyle})
    }
    function formatDate(inputDateString:string) {
        const inputDate:Date = new Date(inputDateString);
        const now = new Date();
        const diffInMs = now.getTime() - inputDate.getTime();
        const diffInDays = diffInMs / (1000 * 3600 * 24);

        // Форматируем время
        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
        };
        const time = new Intl.DateTimeFormat('ru-RU', timeOptions).format(inputDate);

        if (diffInDays < 1) {
            return `Сегодня в ${time}`;
        } else if (diffInDays < 2) {
            return `Вчера в ${time}`;
        } else if (now.getFullYear() === inputDate.getFullYear()) {
            const dateOptions: Intl.DateTimeFormatOptions = {
                day: 'numeric',
                month: 'long',
            };
            const date = new Intl.DateTimeFormat('ru-RU', dateOptions).format(inputDate);
            return `${date}, в ${time}`;
        } else {
            const dateOptions: Intl.DateTimeFormatOptions = {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            };
            const date = new Intl.DateTimeFormat('ru-RU', dateOptions).format(inputDate);
            return `${date}, в ${time}`;
        }
    }
    function remove(id:number) {
        deleteNote(id);
    }
    return(
        <Toast className={`cursor-wait d-inline-block m-1`} style={toggleHover}
               onMouseEnter={() => toggleCursorPointer('pointer', 'rgb(124 124 124) 0px 0px 8px 2px')}
               onMouseLeave={() => toggleCursorPointer('default', 'none')}
        >
            <Toast.Header closeButton={false}>
                <strong className="me-auto" onClick={() => navigate(`${note.id}`, {replace: false})}>{note.title}</strong>
                <small onClick={() => navigate(`${note.id}`, {replace: false})}>{formatDate(note.dateCreate)}</small>
                <CloseButton onClick={() => remove(note.id!)}/>
            </Toast.Header>
            <Toast.Body onClick={() => navigate(`${note.id}`, {replace: false})}>{note.text}</Toast.Body>
        </Toast>
    );
}