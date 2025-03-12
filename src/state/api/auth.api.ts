import {api} from "./api.ts";
import {AuthResponse} from "../../interfaces/AuthResponse.ts";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, {email: string, password: string}>({
            query: (data) => ({
                url: '/login',
                body: data,
                method: 'POST',
                credentials: 'include'
            }),
            transformResponse: (response: { data: AuthResponse }) => {
                localStorage.setItem('token', response.data.accessToken);
                return response.data
            }
        }),
        registration: builder.mutation<AuthResponse, {email: string, password: string}>({
            query: (data) => ({
                url: '/registration',
                body: data,
                method: 'POST',
                credentials: 'include'
            }),
            transformResponse: (response: { data: AuthResponse }) => {
                localStorage.setItem('token', response.data.accessToken);
                return response.data
            }
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
                credentials: 'include'
            })
        }),
        refresh: builder.query<AuthResponse, void>({
            query: () => '/refresh',
            transformResponse: (result:AuthResponse) => {
                console.log(result);
                localStorage.setItem('token', result.accessToken);
                return result;
            },
        })
    })
})

export const {useLoginMutation, useRegistrationMutation, useLogoutMutation, useRefreshQuery} = authApi;