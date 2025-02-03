import {Card, Form} from "react-bootstrap";
import {useState} from "react";
import {useLocation} from "react-router";
import {useAppSelector} from "../hooks/redux-hooks.ts";
import {iNote} from "../interfaces/iNote.ts";
import {selectItemById} from "../state/noteSelector.ts";

export function NoteContent() {
    const {state} = useLocation();
    const id:number = state.id;
    const [showEditIcon, setEditIcon] = useState<boolean>(false);
    const note:iNote | undefined = useAppSelector(state => selectItemById(state, id));
    console.log(note)
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');

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