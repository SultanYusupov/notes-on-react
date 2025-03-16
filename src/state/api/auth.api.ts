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
        refresh: builder.query<AuthResponse, void>({
            query: () => '/refresh',
            onQueryStarted:  async (_credentials, { dispatch, queryFulfilled  }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setAuth(true));
                    dispatch(setUser(data.user));
                    localStorage.setItem('token', data.accessToken);
                }
                catch (e) {
                    console.log(e);
                }
            },
            transformResponse: (result:AuthResponse) => result,
        })
    })
})

export const {useLoginMutation, useRegistrationMutation, useLogoutMutation, useRefreshQuery} = authApi;