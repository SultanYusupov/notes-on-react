import {iUser} from "./iUser.ts";

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    user: iUser
}