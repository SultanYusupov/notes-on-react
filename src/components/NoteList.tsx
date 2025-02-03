import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks.ts";
import {RootState} from "../state/store.ts";
import {useEffect, useRef} from "react";
import {noteService} from "../services/note.service.ts";
import {iNote} from "../interfaces/iNote.ts";
import {add} from "../state/notesSlice.ts";
import NotePreview from "./NotePreview.tsx";

export default function NoteList() {
    const dispatch = useAppDispatch();
    const notes = useAppSelector((state: RootState) => state.notes.noteList);
    const isEffectRun = useRef(false); // Флаг для отслеживания выполнения эффекта
    useEffect(() => {
        if (isEffectRun.current) return; // Если эффект уже выполнен, выходим
        isEffectRun.current = true; // Устанавливаем флаг
        const asyncNoteListFunc = async () => {
            return await noteService.getNoteList();
        };
        asyncNoteListFunc().then((result: iNote[]) => {
            result.forEach(r => {
                if (!notes.some((note) => note.id === r.id)) { // Проверка на дубликаты, когда возвращаемся из NoteContent
                    dispatch(add(r));
                }
            });

        });
    }, [dispatch])

    return (
        <>
            {notes.length ? (notes.map((note:iNote) => {
                return <NotePreview note={note} key={note.id}/>
            })) : (
                <h4>У вас пока нет заметок. Давайте создадим новую!</h4>
            )}

        </>
    )
}