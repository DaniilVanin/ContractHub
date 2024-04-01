import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.css"
import UserStore from "./store/UserStore";



export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
}}>
    <App />
</Context.Provider>
);

