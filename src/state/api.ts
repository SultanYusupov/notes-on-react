import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {iNote, iNoteData} from "../interfaces/iNote.ts";

const API_URL = 'http://localhost:3001/note-list';
export const noteApi = createApi({
    reducerPath: 'noteApi',
    tagTypes: ['Notes'],
    baseQuery: fetchBaseQuery({ baseUrl: API_URL}),
    endpoints: (builder) => ({
        getNotes: builder.query<iNote[], void>({
            query: () => '/',
            providesTags: result =>
                result ? [...result.map(({id}) => ({type: 'Notes', id} as const))]
                    : [{type: 'Notes', id: 'LIST'}]
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
            // invalidatesTags: (result, error, { id, title }) => [{ type: 'Notes', id, title }],
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    noteApi.util.updateQueryData('getNoteById', id!, (draft) => {
                        Object.assign(draft, patch)
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()

                    /**
                     * Alternatively, on failure you can invalidate the corresponding cache tags
                     * to trigger a re-fetch:
                     * dispatch(api.util.invalidateTags(['Post']))
                     */
                }
            },
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