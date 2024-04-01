import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../style/sendForm.css';
import APIService from "../components/ApiService";
import 'react-toastify/dist/ReactToastify.css';

export default function SendFormUI(jsonchik) {

  var jsonchikeditble = new Object()
  jsonchik.headers.map((headers) => (
    jsonchikeditble[headers] = ""
  ));

  const headers = jsonchik.headers
  const headers_ru = jsonchik.headers_ru
  const rows = jsonchik.rows

  const handleInputChange = (event) => {


    jsonchikeditble[event.target.name] = event.target.value;
  }

  const clickForGetFormUI = async () => {
    try {
      let result = APIService.CreateEntity(jsonchikeditble);
      await result
    }
    catch (e) {
      console.log(e)
    }

    return;
  };
  


  return (
    <div className="form-group-send">
      <Row className="align-items-center">
        {headers.map((headers, index) => (
          <Col xs="auto">
            <Form.Group className="mb-x" controlId="exampleForm.ControlTextarea1">
              <Form.Label>{headers_ru[index]}</Form.Label>

              {headers == "start_practice" ? (
                <Form.Control type="date" name={headers} value={handleInputChange.value} onChange={handleInputChange} />
              ) :
                headers == "statement_id" ? (
                  <h2>АВТОМАТИЧЕСКИЙ ВВОД</h2>

                ) : (
                  <Form.Control as="textarea" rows={1} name={headers} value={handleInputChange.value} onChange={handleInputChange} />
                )
              }
            </Form.Group>
          </Col>
        ))}

      </Row>

      <br />
        
      <Col xs="auto">
        <Button type="submit" variant="light" value="Submit" onClick={clickForGetFormUI}> Добавить запись </Button>
      </Col>
    </div>
  );
}

