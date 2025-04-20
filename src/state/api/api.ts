import {BaseQueryApi, createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AuthResponse} from "../../interfaces/AuthResponse.ts";
import {logOut} from "../userSlice.ts";
const API_URL = import.meta.env.VITE_API_URL+'/api';

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401 && !(typeof args !== 'string' && args.url === '/refresh')) {
        // Попытка обновить токен
        const refreshResult = await baseQuery({ url: '/refresh', method: 'GET', credentials: "include" }, api, extraOptions);
        if (refreshResult?.data) {
            localStorage.setItem('token', (refreshResult.data as AuthResponse).accessToken);
            // Повторяем оригинальный запрос с новым токеном
            result = await baseQuery(args, api, extraOptions);
        } else {
            // Если обновление токена не удалось, перенаправляем на страницу авторизации
            localStorage.removeItem('token');
            api.dispatch(logOut());
            window.location.href = '/login';
        }
    }
    return result;
};

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Notes', 'Auth'],
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
})