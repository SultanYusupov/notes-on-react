import {Button, Card, Form} from "react-bootstrap";
import React, {useState} from "react";
import {useLogin} from "../hooks/useLogin.ts";
import {useAppDispatch} from "../hooks/redux-hooks.ts";
import {setAuth, setUser} from "../state/userSlice.ts";
import {useNavigate} from "react-router";

export function Login() {
    const [email, setEmail] = useState<string>('sultansuzran@gmail.com');
    const [password, setPassword] = useState<string>('12345');
    const login = useLogin();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    async function loginToAccount(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const result = await login(email, password);
            localStorage.setItem('token', result!.accessToken);
            dispatch(setAuth(true));
            dispatch(setUser(result!.user));
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <Card style={{width: '30%', margin: '50px auto'}}>
            <Card.Header>Авторизация</Card.Header>
            <Card.Body>
                <Form onSubmit={(event) => loginToAccount(event)}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label column={'lg'}>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" autoComplete={'true'} value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label column={'lg'}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" autoComplete={'false'} value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Войти
                    </Button>
                    <Card.Link style={{marginLeft: '15px'}} href="/registration">Регистрация</Card.Link>
                </Form>
            </Card.Body>
        </Card>

    )
}