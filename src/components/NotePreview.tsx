import {CloseButton, Toast} from "react-bootstrap";
import {useState} from "react";
import {iNote} from "../interfaces/iNote.ts";
import {useNavigate} from "react-router";

interface PreviewProps {
    note: iNote,
}

export default function NotePreview({note}:PreviewProps) {
    const [toggleHover, setToggleHover] = useState({cursor: 'default', boxShadow: 'none'});
    const navigate = useNavigate();
    function toggleCursorPointer(cursorStyle: string, borderStyle: string) {
        setToggleHover({cursor: cursorStyle, boxShadow: borderStyle})
    }
    return(
        <Toast className={`cursor-wait d-inline-block m-1`} style={toggleHover}
               onMouseEnter={() => toggleCursorPointer('pointer', 'rgb(124 124 124) 0px 0px 8px 2px')}
               onMouseLeave={() => toggleCursorPointer('default', 'none')}
        >
            <Toast.Header closeButton={false}>
                <strong className="me-auto" onClick={() => navigate(`${note.id}`, {replace: false, state: {id: note.id}})}>{note.title}</strong>
                <small onClick={() => navigate(`${note.id}`, {replace: false})}>{note.dateCreate}</small>
                <CloseButton/>
            </Toast.Header>
            <Toast.Body onClick={() => navigate(`${note.id}`, {replace: false})}>{note.text}</Toast.Body>
        </Toast>
    );
}