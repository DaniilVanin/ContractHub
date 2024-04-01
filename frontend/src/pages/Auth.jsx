import React, { useContext, useState } from 'react';
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, TABLE_ROUTE } from "../utils/consts";
import { login } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { toast } from 'react-toastify';

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            await login(username, password);
            user.setUser(user)
            user.setIsAuth(true)
            navigate(TABLE_ROUTE)
            
        } catch (e) {
            toast("Ошибка авторизации")
        }

    }

    return (
        <div className="App">
            <header className="App-header">

                <div className="card-block" style={{maxWidth: 600}}>
                    <div className="getTable">
                        <h1>Вход в аккаунт</h1>
                    </div>
                    <div class="form-example">
                        <Form className="d-flex flex-column">
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваш email..."
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваш пароль..."
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                                <Button
                                    variant="light"
                                    onClick={click}
                                >
                                    Войти
                                </Button>
                            </Row>

                        </Form>
                    </div>
                </div>
                <br />


            </header>

        </div>
    );
});



export default Auth;