import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import {iNote} from "../interfaces/iNote.ts";

export interface NotesState {
    noteList: iNote[]
}

const initialState: NotesState = {
    noteList: []
}

export const notesSlice = createSlice({
    name: 'notesState',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        add: (state, action: PayloadAction<iNote>) => {
            return {...state, noteList: [...state.noteList, action.payload]}
        },
        remove: (state, action: PayloadAction<number>) => {
            return {...state, noteList: state.noteList.filter(n => n.id !== action.payload)};
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        edit: (state, action: PayloadAction<iNote>) => {
            return {...state, noteItem: state.noteList.map(n => n.id == action.payload.id ? action.payload : n)};
        }
    }
})

export const { add, remove, edit } = notesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectNote = (state: RootState) => state.notes.noteList // state.counter.value

export default notesSlice.reducer