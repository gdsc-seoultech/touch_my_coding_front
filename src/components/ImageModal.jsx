import React from "react";
import styled from "styled-components";

import { Form, Button } from "react-bootstrap";

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
`;

const ImageModal = () => {
  const modalHead = "Input the keyword for search image";
  return (
    <ModalWrapper>
      <h1 className="modal-head">{modalHead}</h1>
      <div className="modal-button-wrapper">
        {/* <Button variant="primary" size="lg">Done</Button> */}
        <Button variant="dark" size="lg">
          Cancle
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default ImageModal;
