import {Card, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useAppSelector} from "../hooks/redux-hooks.ts";
import {iNote} from "../interfaces/iNote.ts";
import {selectItemById} from "../state/noteSelector.ts";
import {RootState} from "../state/store.ts";

export function NoteContent() {
    const {noteId} = useParams<string>();
    const [showEditIcon, setEditIcon] = useState<boolean>(false);
    const note:iNote | undefined = useAppSelector(state => selectItemById(state, noteId));
    const [title, setTitle] = useState<string>(note?.title || '');
    const [text, setText] = useState<string>(note?.text || '');
    useEffect(() => {
        if (note?.id) {
            setTitle(note.title);
            setText(note.text);
        }
    }, [note?.id])

    return (
        <div style={{margin: '0 auto', width: '600px',}}>

            <Card style={{width: '100%'}}>
                <Card.Body>
                    <Card.Title className={'border-bottom pb-2'}><Form.Control className={'border-0'} type={"text"}
                                                                               value={title}
                                                                               onFocus={() => setEditIcon(true)}
                                                                               onChange={(e) => setTitle(e.target.value)}/></Card.Title>
                    <Card.Text>
                        <Form.Control className={'border-0'} as="textarea" rows={3} value={text}
                                      onFocus={() => setEditIcon(true)} onChange={(e) => setText(e.target.value)}/>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}