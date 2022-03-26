import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Form, Button } from "react-bootstrap";

import { textRead } from "@Utils/TextToSpeech";
import { iconDbList } from "./iconDb";

const ModalWrapper = styled.div`
  padding: 20px;

  .search-wrapper {
    display: flex;

    button {
      margin-left: 30px;
    }
  }

  .modal-head {
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
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
    margin: 20px 0px;

    button {
      all: unset;
      cursor: pointer;
    }

    span {
      font-size: 40px;
      width: 40px;
      height: 40px;
      margin: 10px;
    }
  }
  p {
    margin: 10px 0px;
  }
`;

const IconModal = ({ setIcon, cancelFunc, doneFunc }) => {
  const modalHead = "Input the keyword for search icon";

  const [keyword, setKeyword] = useState("");

  const onChangeKey = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    textRead(modalHead);
  }, []);

  return (
    <ModalWrapper>
      <h1 className="modal-head">{modalHead}</h1>
      <Form.Group className="search-wrapper">
        <Form.Control type="text" placeholder="enter" value={keyword} onChange={onChangeKey} autoFocus={true} />
        <Button>enter</Button>
      </Form.Group>
      <div className="modal-inner-container">
        {iconDbList
          .filter((data) => data["description"].includes(keyword))
          .map((item) => (
            <button onClick={() => setIcon(`<span class=material-icons>${item.spanName}</span>`)}>
              <span className="material-icons">{item.spanName}</span>
            </button>
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
