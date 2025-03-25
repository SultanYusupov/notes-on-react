import {api} from "./api.ts";
import {AuthResponse} from "../../interfaces/AuthResponse.ts";
import {logOut, setAuth, setUser} from "../userSlice.ts";
import {iUser} from "../../interfaces/iUser.ts";

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
        registration: builder.mutation<AuthResponse, {email: string, password: string}>({
            query: (data) => ({
                url: '/registration',
                body: data,
                method: 'POST',
                credentials: 'include'
            }),
            invalidatesTags: (result, error) => [{ type: 'Auth', res: result, err: error }]
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
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                    dispatch(setAuth(true));
                } catch (error) {
                    dispatch(setAuth(false));
                    dispatch(logOut());
                    console.error('Ошибка запроса:', error);
                }
            },
        })
    })
})

export const {useLoginMutation, useRegistrationMutation, useLogoutMutation, useUserQuery} = authApi;