import {iNote} from "../interfaces/iNote.ts";
import NotePreview from "./NotePreview.tsx";
import {Header} from "./Header.tsx";
import {useNavigate} from "react-router";
import {useGetNotesQuery} from "../state/api";
import {useState} from "react";
import {Pagination} from "react-bootstrap";

export default function NoteList() {
    const [page, setPage] = useState(15);
    const {isLoading, data} = useGetNotesQuery(page);
    const notes = data?.notes;
    const totalCount = data?.totalCount;
    const navigate = useNavigate();
    function fillPaginationItems(page:number) {
        let items = [];
        for (let number = 1; number <= 5; number++) {
            items.push(
                <Pagination.Item key={number} active={number === page}>
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
            <div style={{margin: '1rem'}}>
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
                    <Pagination>{fillPaginationItems(page)}</Pagination>
                </div>
            </div>
        )
    }

}