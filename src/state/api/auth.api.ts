import {api} from "./api.ts";
import {AuthResponse} from "../../interfaces/AuthResponse.ts";
import {setAuth, setUser} from "../userSlice.ts";

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
        // refresh: builder.query<AuthResponse, void>({
        //     query: () => '/refresh',
        //     onQueryStarted:  async (_credentials, { dispatch, queryFulfilled  }) => {
        //         try {
        //             const { data } = await queryFulfilled;
        //             dispatch(setAuth(true));
        //             dispatch(setUser(data.user));
        //             console.log('dsgthjfjyyyyyyyyy')
        //             localStorage.setItem('token', data.accessToken);
        //         }
        //         catch (e) {
        //             if (e.error && e.error.status == 401) {
        //                 console.log('dsgthjfjyyyyyyyyy');
        //                 localStorage.removeItem('token');
        //                 // window.location.href = '/login';
        //             }
        //         }
        //     },
        //     transformResponse: (result:AuthResponse) => result,
        // })
    })
})

export const {useLoginMutation, useRegistrationMutation, useLogoutMutation} = authApi;