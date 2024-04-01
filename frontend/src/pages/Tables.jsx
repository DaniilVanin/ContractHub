import '../style/App.css';
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import APIService from "../components/ApiService";
import { Button } from "react-bootstrap";
import { Tabs, Tab } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import FileSaver from "file-saver";



const Tables = observer(() => {
    const [godless, setnameofgod] = useState();
    const [tableIDforEdit, settableIDforEdit] = useState();
    const [tableIDforDelete, settableIDforDelete] = useState();
    const [statementID, setStatementID] = useState();
    const [table, settable] = useState();
    const [buttonForSendGodAndGetFileState, setButtonForSendGodAndGetFileState] = useState(false)
    const [form, setform] = useState();
    const [searchtab, setsearchtab] = useState();
    const [formForEdit, setformForEdit] = useState();


    const [key, setKey] = useState('home');

    useEffect(() => {
        clickForGetFormUI()
        clickForGetSearchTab()
    }, []);

    useEffect(() => {
        const getActiveTab = JSON.parse(localStorage.getItem("activeTab"));
        if (getActiveTab) {
            setKey(getActiveTab);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("activeTab", JSON.stringify(key));
    }, [key]);


    const clickForSendGodAndGetFile = async () => {
        setStatementID("wait...");
        try {
            setButtonForSendGodAndGetFileState(true);
            let zxc = await APIService.SendID({ "number_statement": godless });
            FileSaver.saveAs(zxc)
            await setStatementID(godless);
            setButtonForSendGodAndGetFileState(false);
        }
        catch (e) {
            setButtonForSendGodAndGetFileState(false);
            setStatementID("ОШИБКА");
            console.log(e)
        }
    };

    const clickForGetTable = async () => {
        settable("wait...");
        try {
            let zxc = await APIService.GetTable(godless);
            console.log(zxc)
            await settable(zxc);
        }
        catch (e) {
            settable("ОШИБКА ");
            console.log(e)
        }
    };
    const clickForGetSearchTab = async () => {

        setform("wait...");
        try {
            let zxc = await APIService.GetTableHeader();
            await setsearchtab(zxc);
        }
        catch (e) {
            setsearchtab("ОШИБКА ");
            console.log(e)
        }
    };

    const clickForGetFormUI = async () => {

        setform("wait...");
        try {
            let zxc = await APIService.GetUIInputForm();
            await setform(zxc);
        }
        catch (e) {
            setform("ОШИБКА ");
            console.log(e)
        }
    };
    const clickForGetFormForEditUI = async () => {

        setformForEdit("wait...");
        try {
            let zxc = await APIService.GetUIInputFormForEdit({statement_id:tableIDforEdit});
            await setformForEdit(zxc);
        }
        catch (e) {
            setformForEdit("ОШИБКА ");
            console.log(e)
        }
    };
    const clickForDeleteRow = async () => {

        try {
            await APIService.SendIDforDelete({statement_id:tableIDforDelete});
        }
        catch (e) {
            console.log(e)
        }
    };


    return (
        <Tabs
            id="fill-tab-example"
            className="Tabs-app"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            fill
        >
            <Tab eventKey="home" title="Документация">
                <div className="App">
                    <header className="App-header">
                        <h1>Документация</h1>
                        <div className="card-block">
                            <h2>😇Тут всё довольно просто😇</h2>
                            <dl>
                                <dt>Вкладка "Документация"</dt>
                                <dd>Эмммм нуууу как сказать крч аааа да</dd>
                                <dt>Вкладка "Получить таблицу"</dt>
                                <dd>Для получение таблицы из базы данных или выгрузки файла необходимо нажать соответствующую кнопку на интерфейсе</dd>
                                <dt>Вкладка "Поиск в таблице"</dt>
                                <dd>На этой вкладке можно выбрать столбец для фильтрации результатов запроса на основе определенных критериев</dd>
                                <dt>Вкладка "Отправка"</dt>
                                <dd>Заполнив форму на этой вкладке, Вы можете отправить её как строку на базу данных</dd>
                                <dt>Вкладка "Изменение таблицы"</dt>
                                <dd>На данной вкладке есть возможность изменить выбранную строку или же удалить её</dd>
                                <dt>Кстати</dt>
                                <dd>Если Вас встречают постоянные ошибки, то попробуйте перезагрузить страницу</dd>
                                <dd>Либо слетела авторизация, либо проблемы с api mmis</dd>
                            </dl>
                        </div>
                    </header>
                </div>
            </Tab>
            <Tab eventKey="get" title="Получить таблицу">
                <div className="App">
                    <header className="App-header">
                        <div className="card-block">
                            <h1> Выбран номер договора для выгрузки: {statementID}</h1>
                            <div class="form-example">
                                <Form.Control size="lg" type="text" placeholder="Введите номер договора:" onChange={(e) => setnameofgod(e.target.value)} />
                                <Button name="buttonForSendGodAndGetFile" disabled={buttonForSendGodAndGetFileState} type="submit" variant="light" onClick={event => clickForSendGodAndGetFile()} >Получить договор</Button>
                            </div>
                        </div>

                        <div className="card-block">
                            <div className="getTable">
                                <h1>ТАБЛИЦА </h1>
                                <div class="form-example">
                                    <Button type="submit" variant="light" onClick={event => clickForGetTable()}>Получить(Обновить) таблицу</Button>
                                </div>
                                {table}
                            </div>

                        </div>
                        <br />
                    </header>

                </div>
            </Tab>
            <Tab eventKey="search" title="Поиск в таблице">
                <div className="App">
                    {searchtab}
                </div>
            </Tab>
            <Tab eventKey="send" title="Отправка">

                <div className="App">
                    <header className="App-header">
                        <div className="card-block">
                            <div className="getTable">
                                <h1>Заполните форму для отправки</h1>
                            </div>
                            <div class="form-example">
                                {form}
                            </div>
                        </div>
                    </header>
                </div>
            </Tab>
            <Tab eventKey="update" title="Изменение таблицы">

                <div className="App">
                    <header className="App-header">
                        <div className="card-block">
                            <div className="getTable">
                                <h1>Форма для изменения</h1>
                            </div>
                            <div class="form-example">
                                Выбор индекса:
                                <Form.Control size="lg" type="text" placeholder="Введите индекс строки в базе:" onChange={(e) => settableIDforEdit(e.target.value)} />
                                <Button type="submit" variant="light" onClick={event => clickForGetFormForEditUI()} >Подтвердить</Button>
                            </div>
                            {formForEdit}
                        </div>
                        <div className="card-block">
                            
                            <div className="getTable">
                                <h1>Удаление</h1>
                            </div>
                            <div class="form-example">
                            Выбор индекса для удаления:
                                <Form.Control size="lg" type="text" placeholder="Введите индекс строки в базе:" onChange={(e) => settableIDforDelete(e.target.value)} />
                                <Button type="submit" variant="light" onClick={event => clickForDeleteRow()} >Подтвердить</Button>
                            </div>
                            
                        </div>
                    </header>
                </div>
            </Tab>
        </Tabs>

    );
});



export default Tables;