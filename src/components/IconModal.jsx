import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Form, Button } from "react-bootstrap";

import { icons } from "./dummy";
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
  img {
    width: 90%;
  }
  .modal-inner-box {
    display: inline-block;
    width: 10%;
    justify-content: center;
    padding: 10px;
    text-align: center;

    &:hover {
      background-color: yellow;
    }
  }
  .modal-inner-boxClicked {
    display: inline-block;
    width: 10%;
    justify-content: center;
    padding: 10px;
    text-align: center;
    background-color: yellow;
  }
  .modal-inner-container {
    margin: 20px;
  }
  p {
    margin: 10px 0px;
  }
`;

const IconModal = ({ isOpen, cancelFunc, doneFunc }) => {
  const modalHead = "Input the keyword for search icon";
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
        {/* <Button variant="primary" type="submit" onClick={searchKey}>
          Submit
        </Button> */}
      </Form.Group>
      <div className="modal-inner-container">
        {icons
          .filter((data) => {
            if (keyword == "") {
              return data;
            } else if (data.keyword.includes(keyword)) {
              return data;
            }
          })
          .map((data) => (
            <div
              className={data.id === isSelected ? "modal-inner-boxClicked" : "modal-inner-box"}
              onClick={(e) => onhandelClick(e, data.id)}
            >
              <img src={data.img} alt="img" />
              <p>{data.keyword}</p>
            </div>
          ))}
      </div>

      <div className="modal-button-wrapper">
        <Button variant="dark" size="lg" onClick={cancelFunc}>
          Cancel
        </Button>
        <Button variant="primary" size="lg" onClick={doneFunc}>
          Done
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default IconModal;
