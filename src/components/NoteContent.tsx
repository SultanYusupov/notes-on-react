import {Card, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {useAppSelector} from "../hooks/redux-hooks.ts";
import {iNote} from "../interfaces/iNote.ts";
import {selectItemById} from "../state/noteSelector.ts";
import {Header} from "./Header.tsx";
import {noteService} from "../services/backend.service.ts";

export function NoteContent() {
    const {id} = useParams<string>();
    const noteId: number = Number(id);
    const [showEditIcon, setEditIcon] = useState(false);
    const navigate = useNavigate();
    const existingNote = useAppSelector(state => {
        return selectItemById(state, noteId)
    });
    const initialTitle = existingNote?.title ?? '';
    const initialText = existingNote?.text ?? '';
    // id нет, это чтобы сервер сгенерировал его для новой записи
    const [note, setNote] = useState<iNote>({title: initialTitle, text: initialText, dateCreate: ''});
    const asyncNoteItemFunc = async (id:string) => {
        return await noteService.getNoteItem(id);
    }
    useEffect(() => {
        if (id) {
            if (existingNote) {
                setNote(existingNote);
            }
            else {
                asyncNoteItemFunc(id).then((res:iNote) => setNote(res));
            }
        }

    }, [existingNote, id]);
    
    useEffect(() => {
        // галочка появляется только когда мы реально что-то изменили в тексте
        // если что-то написали, затем это стёрли, то изменений по факту нет
        setEditIcon(note.title !== initialTitle || note.text !== initialText)
    }, [note.title, initialTitle, note.text, initialText])

    function save() {
        //TODO when we edit existing note and come back, the data does not update
        setEditIcon(false);
        note.dateCreate = new Date().toString();
        if (Number.isNaN(noteId)) {
            noteService.createNote(note).then(res => navigate(`/${res.id}`));
        }
        else {
            noteService.editNote(id!, note).then(res => console.log(res))
        }
    }

    return (
        <div style={{margin: '0 auto', width: '600px',}}>
            <Header style={{margin: '1rem 0', with: '100%', padding: '0.1rem'}} displayBackButton={true}>
                {showEditIcon && <i className="bi bi-check-lg" role={"button"} onClick={() => save()}></i>}
                <i className="bi bi-trash3" style={{paddingLeft: '1rem'}} role={"button"}></i>
            </Header>
            <Card style={{width: '100%'}}>
                <Card.Body>
                    <Card.Title className={'border-bottom pb-2'}><Form.Control className={'border-0'} type={"text"}
                                                                               value={note.title}
                                                                               onChange={(e) => setNote({
                                                                                   ...note,
                                                                                   title: e.target.value
                                                                               })}/></Card.Title>
                    <Card.Text>
                        <Form.Control className={'border-0'} as="textarea" rows={3} value={note.text}
                                      onChange={(e) => setNote({
                            ...note,
                            text: e.target.value
                        })}/>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}