import {Alert, Button} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {useConfirmMutation} from "../state/api/auth.api.ts";

export function Confirmation() {
    const {state} = useLocation();
    const {email} = state;
    const navigate = useNavigate();
    useEffect(() => {
        if (!email) navigate("/registration")
    }, [email, navigate]);

    const [disabledButton, setDisabledButton] = useState<boolean>(true);
    const [seconds, setSeconds] = useState<number>(10);
    const interval = useRef(0);
    useEffect(() => {
        if (seconds == 0) {
            setDisabledButton(false);
            return clearInterval(interval.current);
        }
        if (disabledButton) {
            interval.current = setInterval(() => {
                setSeconds((sec) => sec - 1)
            }, 1000)

            return () => clearInterval(interval.current)
        }
    }, [disabledButton, seconds]);
    function getText() {
        if (disabledButton) return <span>Кнопка будет доступна через {seconds} сек.</span>
    }
    const [confirm] = useConfirmMutation();
    async function repeatQuery() {
        setDisabledButton(true);
        setSeconds(10)
        await confirm(email);
    }

    return (
        <div>
            <Alert key={'warning'} variant={'warning'}>На вашу почту {email} пришло письмо с подтверждением аккаунта.</Alert>
            <div className={'d-flex gap-lg-3 align-items-center'}>
                <Button disabled={disabledButton} onClick={() => repeatQuery()}>Отправить повторно</Button>
                {getText()}
            </div>
        </div>
    )
}