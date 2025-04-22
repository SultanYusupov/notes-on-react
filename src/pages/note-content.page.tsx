import {Card, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {iNote} from "../interfaces/iNote.ts";
import {Header} from "../components/Header.tsx";
import {useCreateNoteMutation, useDeleteNoteMutation, useEditNoteMutation, useGetNoteByIdQuery} from "../state/api/note.api.ts";

export function NoteContentPage() {
    const {id} = useParams<string>();
    const noteId = id ? Number(id) : null;
    const navigate = useNavigate();
    // Пробовал и refetchOnMountOrArgChange и вернуть коллбэк с promise.abort, но для отмены лишнего запроса после удаления помогло только это
    const [isDeleting, setIsDeleting] = useState(false);
    const {data: existingNote} = useGetNoteByIdQuery(noteId!, {skip: !noteId || isDeleting});
    const [showEditIcon, setEditIcon] = useState(false);
    const [createNote] = useCreateNoteMutation();
    const [editNote] = useEditNoteMutation();
    const [deleteNote] = useDeleteNoteMutation();
    const [initialTitle, setInitialTitle] = useState('');
    const [initialText, setInitialText] = useState('');
    // id нет, это чтобы сервер сгенерировал его для новой записи
    const [note, setNote] = useState<iNote>({title: '', text: '', dateCreate: ''});
    useEffect(() => {
        if (noteId && existingNote) {
            setNote(existingNote);
            setInitialTitle(existingNote.title);
            setInitialText(existingNote.text);
        }

    }, [existingNote, noteId]);

    useEffect(() => {
        // галочка появляется только когда мы реально что-то изменили в тексте
        // если что-то написали, затем это стёрли, то изменений по факту нет
        setEditIcon(note.title !== initialTitle || note.text !== initialText)
    }, [note.title, initialTitle, note.text, initialText])

    function save() {
        setEditIcon(false);
        const noteToSave = {
            ...note,
            dateCreate: new Date().toString()
        };
        if (!noteId) {
            createNote(noteToSave).then(res => {
                if (res.data) navigate(`/${res.data.id}`);
            });
        }
        else {
            editNote(noteToSave);
        }
    }
    function remove() {
        if (!noteId) return;
        setEditIcon(false);
        setIsDeleting(true);
        deleteNote(noteId).then(() => navigate('/'));
    }

    return (
        <div style={{margin: '0 auto', width: '600px'}}>
            <Header style={{margin: '1rem 0', width: '100%', padding: '0.1rem'}} displayBackButton={true}>
                {showEditIcon && <i className="bi bi-check-lg" role={"button"} onClick={save}></i>}
                {noteId && <i className="bi bi-trash3" style={{paddingLeft: '1rem'}} role={"button"}
                    onClick={remove}></i>}
            </Header>
            <Card style={{width: '100%'}}>
                <Card.Body>
                    <Card.Title className={`border-bottom pb-2`}><Form.Control className={'border-0'} type={"text"}
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