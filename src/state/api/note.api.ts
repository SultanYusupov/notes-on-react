import {api} from './api.ts'
import {iNote} from "../../interfaces/iNote.ts";

export const noteApi = api.injectEndpoints({
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
    getNoteById: builder.query<iNote|null, number>({
        query: (id) => isNaN(id) ? '' : `/${id}`,
        providesTags: (result, error, id) => [{ type: 'Notes', id, res: result, err: error }],
    }),
    createNote: builder.mutation<iNote, iNote>({
        query: (note:iNote) => ({
            url: '',
            body: note,
            method: 'POST'
        }),
        invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
    }),
    editNote: builder.mutation<number, iNote>({
        query: ({id, ...note}) => ({
            url: '/'+id,
            body: note,
            method: 'PATCH'
        }),
        invalidatesTags: (result, error, { id }) => [{ type: 'Notes', id, res: result, err: error }],
    }),
    deleteNote: builder.mutation({
        query: (id:number) => ({
            url: '/'+id,
            method: 'DELETE'
        }),
        invalidatesTags: (result, error, id) => [{ type: 'Notes', id, res: result, err: error }],
    })
}),
})

export const { useGetNotesQuery, useGetNoteByIdQuery, useEditNoteMutation, useCreateNoteMutation, useDeleteNoteMutation } = noteApi;