import React from "react";
import { createRoot } from "react-dom/client"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../style/sendForm.css';
import '../style/App.css';
import APIService from "../components/ApiService";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SendFormUI(jsonchik) {

    const headers = jsonchik.headers
    const headers_ru = jsonchik.headers_ru

    let headerpicked;
    let valuepicked;

    const headerChanged = (event) => {
        ["dropname"].title = event.target.title
        document.getElementById("header-h1").innerHTML = 'Выбран столбец: "' + event.target.title + '"';
        toast("Выбран заголовок " + event.target.title);
        headerpicked = event.target.name
    }

    const handleInputChange = (event) => {
        valuepicked = event.target.value;
    }

    const clickForGetWhere = async () => {
        try {
            let godobject = new Object()
            godobject[headerpicked] = valuepicked
            let result = await APIService.GetTableSearch(godobject);
            const tablesearched = createRoot(document.getElementById('tablesearched'))
            tablesearched.render(result)
        }
        catch (e) {
            toast(e)
            console.log(e)
        }
    };



    return (

        <header className="App-header">

            <div className="card-block">
                <h1>РЕЗУЛЬТАТ ПОИСКА</h1>
                <div id="tablesearched" className="getTable"></div>
            </div>

            <div className="card-block">
                <h1 id="header-h1"> Что нужно искать? </h1>
                <DropdownButton style={{ zIndex: "200" }} name="dropname" id="dropdown-basic-button" title="Столбец">
                    {headers.map((headers, index) => (
                        <Dropdown.Item style={{ zIndex: "200" }} name={headers} onClick={(e) => headerChanged(e)} title={headers_ru[index]}>{headers_ru[index]}</Dropdown.Item>
                    ))}
                </DropdownButton>
                <h1> </h1>
                <div class="form-example">
                    <Form.Control size="lg" type="text" placeholder="Enter your cutie number:" onChange={(e) => handleInputChange(e)} />
                    <Button name="buttonForSendGodAndGetFile" type="submit" variant="light" onClick={event => clickForGetWhere()} >Подтвердить</Button>
                </div>


            </div>

        </header>
    );
}

