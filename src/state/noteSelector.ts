import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store.ts'; // импорт типа корневого состояния

// Предположим, что у вас есть слайс с именем 'items' и в нём массив 'items'
const selectNotes = (state: RootState) => state.notes.noteList;

// Селектор для получения элемента по id
export const selectItemById = createSelector(
    [selectNotes, (_state: RootState, noteId: number) => noteId],
    (noteList, noteId) => noteList.find(note => note.id === noteId)
);