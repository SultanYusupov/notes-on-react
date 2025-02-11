import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store.ts';
import {iNote} from "../interfaces/iNote.ts"; // импорт типа корневого состояния

// Предположим, что у вас есть слайс с именем 'items' и в нём массив 'items'
const selectedNotes = (state: RootState) => state.notes.noteList;

// Селектор для получения элемента по id
export const selectItemById = createSelector(
    [selectedNotes, (_state: RootState, noteId: number) => noteId],
    (noteList:iNote[], noteId) => noteList.find(note => note.id == noteId)
);
export const selectArrayLength = createSelector(selectedNotes, (selectedNotes) => selectedNotes.length)