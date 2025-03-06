import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const API_URL = 'http://localhost:3001/note-list';
export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Notes'],
    baseQuery: fetchBaseQuery({ baseUrl: API_URL}), // TODO здесь есть headers
    endpoints: () => ({}),
})

