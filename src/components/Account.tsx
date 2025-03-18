import {useAppSelector} from "../hooks/redux-hooks.ts";
import {Button} from "react-bootstrap";

export function Account() {
    const authState = useAppSelector((state) => state.user.isAuth);
    const userData = useAppSelector((state) => state.user.user);

    if (authState) {
        return(
            <div style={{display: 'flex', alignItems: 'baseline'}}>
                <p>Hello, {userData.email}</p>
                <Button variant="secondary" style={{marginLeft: '10px'}}>Exit</Button>
            </div>
        )
    }
    else {
        return(
            <div>User not authorized</div>
        )
    }
}