import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {iNote} from "../interfaces/iNote.ts";

const API_URL = 'http://localhost:3001/note-list';
export const noteApi = createApi({
    reducerPath: 'noteApi',
    tagTypes: ['Notes'],
    baseQuery: fetchBaseQuery({ baseUrl: API_URL}),
    endpoints: (builder) => ({
        getNotes: builder.query<{notes: iNote[], totalCount: number}, number>({
            query: (page) => `/?_page=${page}&_per_page=10`,
            providesTags: result =>
                result ? [...result.notes.map(({id}) => ({type: 'Notes', id} as const)), { type: 'Notes', id: 'LIST' }]
                    : [{type: 'Notes', id: 'LIST'}],
            transformResponse: (response: iNote[], meta: any) => {
                const totalCount = meta?.response?.headers.get('X-Total-Count');
                return {
                    notes: response ? response : [],
                    totalCount: totalCount ? parseInt(totalCount, 10) : 1,
                };
            },
        }),
        getNoteById: builder.query<iNote, number>({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Notes', id }],
        }),
        createNote: builder.mutation<iNote, iNote>({
            query: (note:iNote) => ({
                url: API_URL,
                body: note,
                method: 'POST'
            }),
            invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
        }),
        editNote: builder.mutation<number, iNote>({
            query: ({id, ...note}) => ({
                url: API_URL+'/'+id,
                body: note,
                method: 'PATCH'
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Notes', id }],
        }),
        deleteNote: builder.mutation({
            query: (id:number) => ({
                url: API_URL+'/'+id,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Notes', id }],
        })
    }),
})

export const { useGetNotesQuery, useGetNoteByIdQuery, useEditNoteMutation, useCreateNoteMutation, useDeleteNoteMutation } = noteApi