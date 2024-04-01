import React, {useContext} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {LOGIN_ROUTE, TABLE_ROUTE } from '../utils/consts';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import {NavLink} from "react-router-dom";
import Cookies from 'universal-cookie';
import { $host } from "../http/index";


const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate();
    const cookie = new Cookies()
    const logOut = async () => {
        await $host.post('/api/logout',{
            withCredentials: true
        })
        user.setUser({})
        user.setIsAuth(false)
        cookie.set('data', 'underfined')
        cookie.set('id', 'underfined')

        navigate(LOGIN_ROUTE)
    }

    return (
        <Navbar bg="dark" variant="dark" >
            <Container fluid>
                <img src="https://i.pinimg.com/originals/d8/04/2d/d8042d88f4fee3f133e56a3a5cfde0e3.gif" width="2%" height="2%" />
                <NavLink style={{color:'white'}} to={TABLE_ROUTE}>БЫСТРЫЕЗАЯВЛЕНИЯПОПРАКТИКЕОНЛАЙН</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(TABLE_ROUTE)}
                        >
                            Таблицы
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;