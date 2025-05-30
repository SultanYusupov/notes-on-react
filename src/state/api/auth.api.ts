import {api} from "./api.ts";
import {AuthResponse} from "../../interfaces/AuthResponse.ts";
import {setAuth, setUser} from "../userSlice.ts";
import {iUser} from "../../interfaces/iUser.ts";
import {iError} from "../../interfaces/iError.ts";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, {email: string, password: string}>({
            query: (data) => ({
                url: '/login',
                body: data,
                method: 'POST',
                credentials: 'include'
            }),
            transformResponse: (response: AuthResponse) => response,
            invalidatesTags: [{ type: 'Auth' }]
        }),
        registration: builder.mutation<AuthResponse|iError, {email: string, password: string}>({
            query: (data) => ({
                url: '/registration',
                body: data,
                method: 'POST',
                credentials: 'include'
            }),
            invalidatesTags: (result, error) => [{ type: 'Auth', res: result, err: error }]
        }),
        confirm: builder.mutation<void, string>({
            query: (data) => ({
                url: '/confirm',
                body: {email: data},
                method: 'POST',
                credentials: 'include'
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
                credentials: 'include'
            })
        }),
        user: builder.query<iUser, void>({
            query: () => '/user',
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(setUser(data));
                dispatch(setAuth(true));
            },
        })
    })
})

export const {useLoginMutation, useRegistrationMutation, useLogoutMutation, useUserQuery, useConfirmMutation} = authApi;