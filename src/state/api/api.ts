import {BaseQueryApi, createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AuthResponse} from "../../interfaces/AuthResponse.ts";
import {setAuth, setUser} from "../userSlice.ts";

const API_URL = 'http://localhost:5000/api';

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

// Я не знаю как это работает
const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // Попытка обновить токен
        const refreshResult = await baseQuery({ url: '/refresh', method: 'GET', credentials: "include" }, api, extraOptions);
        if (refreshResult?.data) {
            // Сохраняем новый токен в localStorage
            localStorage.setItem('token', (refreshResult.data as AuthResponse).accessToken);
            api.dispatch(setUser((refreshResult.data as AuthResponse).user));
            api.dispatch(setAuth(true));
            // Повторяем оригинальный запрос с новым токеном
            result = await baseQuery(args, api, extraOptions);
        } else {
            // Если обновление токена не удалось, перенаправляем на страницу авторизации
            localStorage.removeItem('token');
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