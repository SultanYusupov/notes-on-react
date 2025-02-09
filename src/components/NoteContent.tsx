import {Card, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useAppSelector} from "../hooks/redux-hooks.ts";
import {iNote} from "../interfaces/iNote.ts";
import {selectItemById} from "../state/noteSelector.ts";
import {Header} from "./Header.tsx";
import {noteService} from "../services/note.service.ts";

export function NoteContent() {
    const {id} = useParams<string>();
    const noteId: number = Number(id);
    const [showEditIcon, setEditIcon] = useState<boolean>(false);
    const [note, setNote] = useState<iNote>({id: noteId, title: '', text: '', dateCreate: ''});

    const existingNote = useAppSelector(state => {
        return selectItemById(state, noteId)
    });
    const asyncNoteItemFunc = async (id:string) => {
        return await noteService.getNoteItem(id);
    }
    useEffect(() => {
        if (id) {
            if (existingNote) {
                setNote(existingNote);
            }
            else {
                asyncNoteItemFunc(id).then((res:iNote) => {
                    console.log(res)
                    setNote(res)
                });
            }
        }

    }, [existingNote, id]);

    return (
        <div style={{margin: '0 auto', width: '600px',}}>
            <Header style={{margin: '1rem 0', with: '100%', padding: '0.1rem'}} displayBackButton={true}>
                {showEditIcon && <i className="bi bi-check-lg" role={"button"}></i>}
                <i className="bi bi-trash2" style={{paddingLeft: '1rem'}} role={"button"}></i>
            </Header>
            <Card style={{width: '100%'}}>
                <Card.Body>
                    <Card.Title className={'border-bottom pb-2'}><Form.Control className={'border-0'} type={"text"}
                                                                               value={note.title}
                                                                               onFocus={() => setEditIcon(true)}
                                                                               onChange={(e) => setNote({
                                                                                   ...note,
                                                                                   title: e.target.value
                                                                               })}/></Card.Title>
                    <Card.Text>
                        <Form.Control className={'border-0'} as="textarea" rows={3} value={note.text}
                                      onFocus={() => setEditIcon(true)} onChange={(e) => setNote({
                            ...note,
                            text: e.target.value
                        })}/>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}