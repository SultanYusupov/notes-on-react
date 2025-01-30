import {CloseButton, Toast} from "react-bootstrap";
import {useState} from "react";

export default function NotePreview() {
    const [toggleHover, setToggleHover] = useState({cursor: 'default', boxShadow: 'none'});
    function toggleCursorPointer(cursorStyle: string, borderStyle: string) {
        setToggleHover({cursor: cursorStyle, boxShadow: borderStyle})
    }
    return(
        <Toast className={`cursor-wait d-inline-block m-1`} style={toggleHover}
               onMouseEnter={() => toggleCursorPointer('pointer', 'rgb(124 124 124) 0px 0px 8px 2px')}
               onMouseLeave={() => toggleCursorPointer('default', 'none')}
        >
            <Toast.Header closeButton={false}>
                <strong className="me-auto">Static Title</strong>
                <small>Static Date Create</small>
                <CloseButton/>
            </Toast.Header>
            <Toast.Body>Static Text</Toast.Body>
        </Toast>
    );
}