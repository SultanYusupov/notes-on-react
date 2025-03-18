import {iUser} from "../interfaces/iUser.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState{
    user: iUser,
    isAuth: boolean,
    isLoading: boolean
}
const initialState: UserState = {
    user: {} as iUser,
    isAuth: false,
    isLoading: false
}
export const userSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        setAuth: (state:UserState, action:PayloadAction<boolean>) => {
            return {...state, isAuth: action.payload}
        },
        setUser: (state:UserState, action:PayloadAction<iUser>) => {
            return {...state, user: action.payload}
        },
        setLoading: (state:UserState, action:PayloadAction<boolean>) => {
            return {...state, isLoading: action.payload}
        },
        logOut: () => initialState
    }
});
export const {setLoading, setAuth, setUser, logOut} = userSlice.actions;
export default userSlice.reducer;