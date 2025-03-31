import {Alert, Button, Card, Form} from "react-bootstrap";
import React, {useState} from "react";
import {useRegistrationMutation} from "../state/api/auth.api.ts";
import {iError} from "../interfaces/iError.ts";
import {AuthResponse} from "../interfaces/AuthResponse.ts";

export function Register() {
    const [email, setEmail] = useState<string>('sultansuzran@gmail.com');
    const [password, setPassword] = useState<string>('12345');
    const [confirmedPassword, setConfirmedPassword] = useState<string>('12345');
    const [isInvalid, setIsInvalid] = useState(false);
    const [displayError, setDisplayError] = useState(false);
    const [text, setText] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [register] = useRegistrationMutation();

    function closeAlert() {
        setDisplayError(false);
        setDisplayWarning(false);
        setText('');
    }
    async function registerAccount() {
        const result = await register({email, password});

        if ((result as iError) !== undefined) {
            setText((result as iError).error.data.message);
            setDisplayError(true);
        }

        if (result.data !== undefined && (!(result as {data: AuthResponse}).data.user.isActivated)) {
            setDisplayWarning(true);
            setText('На вашу почту пришло письмо с подтверждением аккаунта');
        }

        setEmail('');
        setPassword('');
    }
   async function validateForm(e: React.FormEvent<HTMLFormElement>) {
       e.preventDefault();
       setDisplayError(false);
       if (password !== confirmedPassword) {
           setIsInvalid(true);
           return;
       } else {
           setIsInvalid(false);
           await registerAccount();
       }
   }
    return(
        <Card style={{width: '30%', margin: '50px auto'}}>
            <Card.Header>Регистрация</Card.Header>
            <Card.Body>
                <Form onSubmit={(event) => validateForm(event)}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label column={'lg'}>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" autoComplete={'true'} value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label column={'lg'}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" autoComplete={'false'} value={password}  isInvalid={isInvalid}
                                      onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="confirmFormPassword">
                        <Form.Label column={'lg'}>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm your password" autoComplete={'false'} value={confirmedPassword}
                                      required isInvalid={isInvalid}
                                      onChange={(e) => setConfirmedPassword(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                            Ваши пароли не совпадают
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Зарегистрироваться
                    </Button>
                </Form>
            </Card.Body>
            {displayError &&
                <Alert key={'danger'} variant={'danger'} onClick={() => closeAlert()}>{text}</Alert>
            }
            {displayWarning &&
                <Alert key={'warning'} variant={'warning'}>{text}</Alert>
            }
        </Card>
    )
}