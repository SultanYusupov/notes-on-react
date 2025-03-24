import {iNote} from "../interfaces/iNote.ts";
import NotePreview from "./NotePreview.tsx";
import {Header} from "./Header.tsx";
import {useNavigate} from "react-router";
import {useGetNotesQuery} from "../state/api/note.api.ts";
import {useState} from "react";
import {Alert, Form, Pagination} from "react-bootstrap";

export default function NoteList() {
    const [page, setPage] = useState(1);
    // const searchText = useRef<HTMLInputElement | null>(null);
    const [filterText, setFilterText] = useState('');
    const {isLoading, data: notesData, isError} = useGetNotesQuery({page, filterText});
    const notes = notesData?.notes;
    const totalCount = notesData?.totalCount;
    const navigate = useNavigate();
    const [searchMode, setSearchMode] = useState<boolean>(true);
    let timerId: ReturnType<typeof setTimeout> | undefined;
    function fillPaginationItems(page:number, totalCount:number) {
        const items = [];
        const total:number = Math.ceil(totalCount / 10);
        for (let number = 1; number <= total; number++) {
            items.push(
                <Pagination.Item key={number} active={number === page} onClick={() => setPage(number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        return items;
    }

    function searchNote(filterValue:string) {
        if (timerId !== undefined) clearTimeout(timerId);
        timerId = setTimeout(() => {
            setFilterText(filterValue.trim());
        }, 1500);
    }

    if (isLoading) {
        return <h4>Loading...</h4>
    }
    if (isError) {
        return <Alert key={'danger'} variant={'danger'}>Ошибка соединения с сервером</Alert>
    }
    if (notes) {
        return (
            <div>
                <Header style={{width: '25%', marginBottom: '1rem'}} displayBackButton={false}>
                    {!searchMode && <i className="bi bi-plus-square" role={"button"} onClick={() => navigate('/new')}></i>}
                    {!searchMode && <i className="bi bi-search" style={{paddingLeft: '1rem'}} role={"button"} onClick={() => setSearchMode(true)}></i>}
                    {searchMode && <Form><Form.Control size="sm" type="text" maxLength={12} onChange={(e) => searchNote(e.target.value)}></Form.Control></Form>}
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
                <div className={'ms-1 mt-4'}>
                    <Pagination>{fillPaginationItems(page, totalCount!)}</Pagination>
                </div>
            </div>
        )
    }

}