import React, { useState } from "react";
import styled from "styled-components";

import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { images } from "./dummy";
const ModalWrapper = styled.div`
  padding: 20px;

  .modal-head {
    font-size: 32px;
    font-weight: 700;
    text-align: center;
  }

  .modal-button-wrapper {
    margin-top: 20px;

    button:first-child {
      margin-right: 25px;
    }
  }
  .modal-inner-container {
    margin: 20px;
  }
  .modal-inner-box {
    &:hover {
      background-color: yellow;
    }
  }
  .modal-inner-boxClicked {
    background-color: yellow;
  }
`;

const ImageModal = ({ isOpen, cancelFunc, doneFunc }) => {
  const modalHead = "Input the keyword for search image";
  const [keyword, setKeyword] = useState("");
  const [isSelected, setIsSelected] = useState(null);
  const onChangeKey = (e) => {
    setKeyword(e.target.value);
  };
  const onhandelClick = (e, id) => {
    setIsSelected(id);
  };
  return (
    <ModalWrapper>
      <h1 className="modal-head">{modalHead}</h1>
      <Form.Group>
        <Form.Control type="text" placeholder="enter" value={keyword} onChange={onChangeKey} />
      </Form.Group>
      <div className="modal-inner-container">
        <Row xs={1} md={4} className="g-4">
          {images
            .filter((data) => {
              if (keyword == "") {
                return data;
              } else if (data.keyword.includes(keyword)) {
                return data;
              }
            })
            .map((data) => (
              <Col>
                <Card
                  border="light"
                  onClick={(e) => onhandelClick(e, data.id)}
                  className={data.id === isSelected ? "modal-inner-boxClicked" : "modal-inner-box"}
                >
                  <Card.Img variant="top" src={data.img} />
                  <Card.Body>
                    <Card.Title>{data.keyword}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
      <div className="modal-button-wrapper">
        <Button variant="primary" size="lg" onClick={cancelFunc}>
          Done
        </Button>
        <Button variant="dark" size="lg" onClick={doneFunc}>
          Cancel
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default ImageModal;
