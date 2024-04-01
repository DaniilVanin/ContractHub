import React, {useContext, useEffect, useState} from "react";
import './style/App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import { ToastContainer} from 'react-toastify';


const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      check().then(data => {
          user.setUser(true)
          user.setIsAuth(true)
      }).finally(() => setLoading(false))
  }, [])

  if (loading) {
      return  <div className="App">
      <header className="App-header"><Spinner animation={"grow"}/> </header> </div>
  }

  return (
      <BrowserRouter>
          <ToastContainer />
          <NavBar />
          <AppRouter />
      </BrowserRouter>
  );
});


export default App;
