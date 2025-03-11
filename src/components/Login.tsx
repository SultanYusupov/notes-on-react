import {Button, Card, Form} from "react-bootstrap";

export function Login() {
    return(
        <Card style={{width: '30%', margin: '50px auto'}}>
            <Card.Header>Авторизация</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label column={'lg'}>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label column={'lg'}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
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