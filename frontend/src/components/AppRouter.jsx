import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {LOGIN_ROUTE, TABLE_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

import Tables from '../pages/Tables';
import Auth from '../pages/Auth';
import About from '../pages/About';


const AppRouter = observer(() => {
    const {user} = useContext(Context)
    console.log(user)
    return (
        <Routes>
            {/* {true && auth} */}
            {!user.isAuth?(
                <Route exact key="login" path="login" element={<Auth/>}/> 
            ):
                <Route exact key="tables" path="tables" element={<Tables/>}/>
            }
            
            {/* <Route exact key="login" path="login" element={<Tables/>}/>
            <Route path="/" element={<Navigate replace to={LOGIN_ROUTE} />} /> */}
            <Route exact key="about" path="about" element={<About/>}/>

            <Route path="*" element={<Navigate replace to={!user.isAuth?(LOGIN_ROUTE):(TABLE_ROUTE)} />} /> 

        </Routes>
    );
});

export default AppRouter;