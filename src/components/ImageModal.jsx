import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { Form, Button } from "react-bootstrap";

import nextIcon from "@Assets/icon/next.svg";
import { textRead } from "@Utils/TextToSpeech";

const ModalWrapper = styled.div`
  padding: 20px;
  position: relative;

  .image-guide-button {
    all: unset;
    cursor: pointer;
    position: absolute;
    width: 64px;
    height: 64px;
    top: calc(50% - 32px);

    img {
      width: 100%;
    }
  }

  .next-button {
    right: 0px;
  }

  .prev-button {
    left: 0px;
    transform: rotate(180deg);
  }

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
  }

  .modal-button-wrapper {
    margin-top: 20px;

    button:first-child {
      margin-right: 25px;
    }
  }
  .modal-result-container {
    margin: 20px;

    img {
      width: 200px;
      margin: 0px calc(50% - 100px);
    }
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

const ImageModal = ({ setImage, cancelFunc, doneFunc }) => {
  const modalHead = "Input the keyword for search image";

  const [keyword, setKeyword] = useState("");
  const [imgIdx, setImgIdx] = useState(0);

  const [page, setPage] = useState(0);
  const [imageList, setImageList] = useState([]);
  const [max, setMax] = useState(0);

  const onChangeKey = (e) => {
    setKeyword(e.target.value);
  };

  const searchImage = async () => {
    const result = await axios(`/api/image?query=${keyword}&page=${page}`);
    if (result.data.success) {
      setImageList(result.data.result);
      setMax(result.data.total_pages);
      setImgIdx(0);
    }
  };

  const onClickEnter = async () => {
    setPage(0);
    searchImage();
  };

  const onClickPrev = async () => {
    if (imgIdx === 0) {
      if (page === 0) {
        textRead("this is the first index");
      } else {
        setPage(page - 1);
        searchImage();
      }
    } else {
      setImgIdx(imgIdx - 1);
    }
  };

  const onClickNext = async () => {
    if (imgIdx === 9) {
      if (page === max) {
        textRead("this is the last index");
      } else {
        setPage(page + 1);
        searchImage();
      }
    } else {
      setImgIdx(imgIdx + 1);
    }
  };

  useEffect(() => {
    const getLabel = async () => {
      const result = await axios({
        method: "POST",
        url: "/api/image/label",
        data: {
          url: imageList[imgIdx],
        },
      });
      if (result.data.success) {
        const { label } = result.data;
        label.map((item) => {
          textRead(item?.description);
        });
      }
    };
    getLabel();
  }, [imageList, imgIdx]);

  useEffect(() => {
    textRead(modalHead);
  }, []);

  return (
    <ModalWrapper>
      {imageList.length > 0 && (
        <div>
          <button className="prev-button image-guide-button" onClick={onClickPrev}>
            <img src={nextIcon} alt="." />
          </button>
          <button className="next-button image-guide-button" onClick={onClickNext}>
            <img src={nextIcon} alt="." />
          </button>
        </div>
      )}
      <h1 className="modal-head">{modalHead}</h1>
      <Form.Group className="search-wrapper">
        <Form.Control type="text" placeholder="enter" value={keyword} onChange={onChangeKey} autoFocus={true} />
        <Button onClick={onClickEnter}>enter</Button>
      </Form.Group>
      {/* <div className="modal-result-container">
        {imageList.map((item) => (
          <img src={item} alt="result" key={item} onClick={() => setImage(`<img src='${item}' alt="image" />`)} />
        ))}
      </div> */}
      <div className="modal-result-container">
        <img src={imageList[imgIdx]} onClick={() => setImage(`<img src=${imageList[imgIdx]} />`)} />
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
