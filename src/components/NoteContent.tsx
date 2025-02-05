import {Card, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useAppSelector} from "../hooks/redux-hooks.ts";
import {iNote} from "../interfaces/iNote.ts";
import {selectItemById} from "../state/noteSelector.ts";
import {Header} from "./Header.tsx";

export function NoteContent() {
    const {noteId} = useParams<string>();
    const [showEditIcon, setEditIcon] = useState<boolean>(false);
    const note:iNote | undefined = useAppSelector(state => selectItemById(state, noteId));
    const [title, setTitle] = useState<string>(note?.title || '');
    const [text, setText] = useState<string>(note?.text || '');
    useEffect(() => {
        // данные из store приходят не сразу, поэтому нужно повторно обновить state
        if (note?.id) {
            setTitle(note.title);
            setText(note.text);
        }
    }, [note?.id])

    return (
        <div style={{margin: '0 auto', width: '600px',}}>
            <Header style={{margin: '1rem 0', with: '100%', padding: '0.1rem'}} displayBackButton={true}>
                {showEditIcon && <i className="bi bi-check-lg" role={"button"}></i>}
                <i className="bi bi-trash3" style={{paddingLeft: '1rem'}} role={"button"}></i>
            </Header>
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