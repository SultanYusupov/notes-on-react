import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {iNote} from "../interfaces/iNote.ts";

export interface NotesState {
    noteList: iNote[]
}

const initialState: NotesState = {
    noteList: [],
}

export const notesSlice = createSlice({
    name: 'notesState',
    initialState,
    reducers: {
        search: (state, action: PayloadAction<string>) => {
            return {...state, noteList: state.noteList.filter(n => n.text.includes(action.payload) || n.title.includes(action.payload))};
        },
    }
})

export const { search } = notesSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectNoteList = (state: RootState) => state.notes.noteList // state.counter.value

export default notesSlice.reducer