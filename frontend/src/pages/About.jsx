import '../style/App.css';
import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';


const Tables = observer(() => {
    const gotolink = url => {
        window.location.href = url;
    }
    return (
        <div className="App">
            <header className="App-header">
                <h1>О ПРОЕКТЕ</h1>
                <div className="card-block">
                    <h1>Разработчики</h1>
                    <li onClick={() => gotolink('https://github.com/DaniilVanin')}>
                        Губанов Даниил Павлович
                        <h3><Link onClick={() => gotolink('https://github.com/DaniilVanin')}>https://github.com/DaniilVanin</Link></h3>
                    </li>
                    <li onClick={() => gotolink('https://github.com/Nikiffffka')}>
                        Никифоров Даниил Геннадьевич
                        <h3><Link onClick={() => gotolink('https://github.com/Nikiffffka')}>https://github.com/Nikiffffka</Link></h3>
                    </li>
                    {/* здесь можно дописать причастных */}
                </div>
                <div className="card-block">

                    <h1>R I P</h1>
                    <h1>Этот парнишка сообщал о поломках во время разработки сайта<br />Мы(фронтендер) его очень любили</h1>

                    <h1>Здрасте, Кирби съел все технические штуки на этой вкладке😔 <br /> Сейчас тут ничего не работает <br /> Ну как на него можно обижаться?</h1>
                    <div>
                        <img src="https://i.pinimg.com/originals/09/4e/c1/094ec1517789527ec7d5ac9a633d053e.gif" height="200px" />
                        <img src="https://i.pinimg.com/originals/e5/cc/9e/e5cc9e0cb7ff45b892ab2a25ef76a6e4.gif" height="200px" />
                        <img src="https://i.pinimg.com/originals/25/15/5c/25155cc35e32ee7c09933f3dc8a65689.gif" height="200px" />
                    </div>
                </div>
            </header>
        </div>
    );
});


export default Tables;