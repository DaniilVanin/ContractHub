import React from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../style/sendForm.css';
import APIService from "./ApiService";
import 'react-toastify/dist/ReactToastify.css';

export default function SendFormForEditUI(jsonchik) {
  
  var jsonchikeditble = new Object()
  jsonchik.headers.map((headers,index) => (
    jsonchikeditble[headers] = jsonchik.rows[0][index]
  ));

  const headers = jsonchik.headers
  const headers_ru = jsonchik.headers_ru
  const rows = jsonchik.rows
  
  const handleInputChange = (event) => {

    jsonchikeditble[event.target.name] = event.target.value;
  }

  const clickForGetFormUI = async () => {
    try {
      let datezxczxc = new Date(jsonchikeditble["start_practice"]);
      jsonchikeditble["start_practice"] = datezxczxc.toISOString().split('T')[0]
      let result = APIService.UpdateEntity(jsonchikeditble);
      await result
    }
    catch (e) {
      console.log(e)
    }

    return;
  };
  
  const datezxc = new Date(rows[0][3]);

  return (
    <div className="form-group-send">
      <Row className="align-items-center">
        {headers.map((headers, index) => (
          <Col xs="auto">
            <Form.Group className="mb-x" controlId="exampleForm.ControlTextarea1">
              <Form.Label>{headers_ru[index]}</Form.Label>
              {/* onChange={(e) => setnameofgod(e.target.value) */}

              {headers == "start_practice" ? (
                <Form.Control type="date" name={headers} defaultValue={datezxc.toISOString().split('T')[0]} value={handleInputChange.value} onChange={(e) => handleInputChange(e)} />
              ) :
                headers == "statement_id" ? (
                  <h2>{rows[0][index]}</h2>

                ) : (
                  <Form.Control as="textarea" defaultValue={rows[0][index]} rows={1} name={headers} value={handleInputChange.value} onChange={(e) => handleInputChange(e)} />
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

