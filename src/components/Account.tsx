import {useAppSelector} from "../hooks/redux-hooks.ts";

export function Account() {
    const authState = useAppSelector((state) => state.user.isAuth);
    const userData = useAppSelector((state) => state.user.user);

    if (authState) {
        return(
            <div>Hello, {userData.email}</div>
        )
    }
    else {
        return(
            <div>User not authorized</div>
        )
    }
}