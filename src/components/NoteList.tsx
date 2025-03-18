import {iNote} from "../interfaces/iNote.ts";
import NotePreview from "./NotePreview.tsx";
import {Header} from "./Header.tsx";
import {useNavigate} from "react-router";
import {useGetNotesQuery} from "../state/api/note.api.ts";
import {useState} from "react";
import {Pagination} from "react-bootstrap";

export default function NoteList() {
    const [page, setPage] = useState(1);
    const {isLoading, data: notesData} = useGetNotesQuery(page);
    const notes = notesData?.notes;
    const totalCount = notesData?.totalCount;
    const navigate = useNavigate();
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

    if (isLoading) {
        return <h4>Loading...</h4>
    }
    if (notes) {
        return (
            <div>
                <Header style={{width: '25%', marginBottom: '1rem'}} displayBackButton={false}>
                    <i className="bi bi-plus-square" role={"button"} onClick={() => navigate('/new')}></i>
                    <i className="bi bi-search" style={{paddingLeft: '1rem'}} role={"button"}></i>
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