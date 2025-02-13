import { configureStore } from '@reduxjs/toolkit'
// import notesReducer from './notesSlice'
import {noteApi} from './api.ts'

export const store = configureStore({
    reducer: {
        // notes: notesReducer,
        [noteApi.reducerPath]: noteApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(noteApi.middleware),
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store