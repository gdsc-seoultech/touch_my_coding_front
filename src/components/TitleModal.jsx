import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { textRead } from "@Utils/TextToSpeech";
import { Form, Button } from "react-bootstrap";

const ModalWrapper = styled.div`
  padding: 20px;

  .modal-head {
    font-size: 32px;
    font-weight: 700;
    text-align: center;
  }

  .modal-body {
    font-size: 20px;
    font-weight: 400;
  }

  .modal-button-wrapper {
    margin-top: 20px;

    button:first-child {
      margin-right: 25px;
    }
  }
`;

const TitleModal = ({ isOpen, doneFunc, cancleFunc }) => {
  const [title, setTitle] = useState("");

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const modalHead = "Set the page name";
  const modalBody =
    "The page name is used for divide page. When you want to exchange the page, use the command move page pagename. After set the page name, you can finish by enter.";

  useEffect(() => {
    if (isOpen) {
      textRead(modalHead);
      textRead(modalBody);
    }
  }, [isOpen]);

  return (
    <ModalWrapper>
      <h1 className="modal-head">{modalHead}</h1>
      <p className="modal-body">{modalBody}</p>
      <Form.Group>
        <Form.Control type="text" value={title} onChange={onChangeTitle} autoFocus></Form.Control>
      </Form.Group>

      <div className="modal-button-wrapper">
        <Button variant="primary" size="lg" onClick={doneFunc}>
          Done
        </Button>
        <Button variant="dark" size="lg" onClick={cancleFunc}>
          Cancle
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default TitleModal;
