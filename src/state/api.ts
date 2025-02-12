import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {iNote} from "../interfaces/iNote.ts";

const API_URL = 'http://localhost:3001/note-list';
export const noteApi = createApi({
    reducerPath: 'noteApi',
    tagTypes: ['Note'],
    baseQuery: fetchBaseQuery({ baseUrl: API_URL}),
    endpoints: (builder) => ({
        getNotes: builder.query<iNote[], void>({
            query: () => '/'
        }),
        getNoteById: builder.query<iNote, string>({
            query: (id) => `/${id}`,
        }),
        createNote: builder.mutation({
            query: (note:iNote) => ({
                url: API_URL,
                body: note,
                method: 'POST'
            })
        }),
        editNote: builder.mutation<string, iNote>({
            query: ({id, ...note}) => ({
                url: API_URL+'/'+id,
                body: note,
                method: 'PATCH'
            })
        }),
        deleteNote: builder.mutation({
            query: (id:string) => ({
                url: API_URL+'/'+id,
                method: 'DELETE'
            })
        }),
    }),
})

export const { useGetNotesQuery, useGetNoteByIdQuery, useEditNoteMutation, useCreateNoteMutation, useDeleteNoteMutation } = noteApi