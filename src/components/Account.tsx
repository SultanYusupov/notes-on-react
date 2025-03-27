import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks.ts";
import {Button} from "react-bootstrap";
import {useLogoutMutation} from "../state/api/auth.api.ts";
import {logOut} from "../state/userSlice.ts";
import {useNavigate} from "react-router";

export function Account() {
    const authState = useAppSelector((state) => state.user.isAuth);
    const userData = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    async function logoutAccount() {
        await logout();
        dispatch(logOut());
        localStorage.removeItem('token');
        navigate('/login');
    }
    if (authState) {
        return(
            <div style={{display: 'flex', alignItems: 'baseline'}}>
                <p>Hello, {userData.email}</p>
                <Button variant="secondary" style={{marginLeft: '10px'}} onClick={() => logoutAccount()}>Exit</Button>
            </div>
        )
    }
    else {
        return(
            <div>User not authorized</div>
        )
    }
}