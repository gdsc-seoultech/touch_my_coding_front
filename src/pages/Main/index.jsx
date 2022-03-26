import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { Controlled as CodeMirror } from "react-codemirror2";
import { useSpeechContext } from "@speechly/react-client";
import { Button, Container, Row, Col } from "react-bootstrap";
import "react-tabs/style/react-tabs.css";
import axios from "axios";

import { PushToTalkButton, BigTranscript, ErrorPanel } from "@speechly/react-ui";

import { modalStyles } from "@Components/modalOption";

import TitleModal from "@Components/TitleModal";
import IconModal from "@Components/IconModal";
import ImageModal from "@Components/ImageModal";
import Header from "@Components/Header";

import { textRead } from "@Utils/TextToSpeech";
import { getLocalStorage, saveLocalStorage, getLocalUuid, getRandomValue, setLocalUuid } from "@Utils/storage";

const CodeWrapper = styled.div`
  .content {
    margin-top: 20px;
  }

  .current-page {
    margin: 20px;

    span {
      font-weight: 700;
    }
  }

  .code-category {
    text-align: center;
  }

  .button-wrapper {
    margin: 40px 16px 0px 16px;

    button {
      margin-right: 16px;
    }
  }

  .code-page-head {
    margin: 20px 16px 0px 16px;
    font-weight: 500;
    font-size: 20px;
  }

  .code-page-list {
    margin: 16px;
    display: flex;

    button {
      margin: 0px 16px 16px 0px;
    }
  }

  .empty-page {
    margin-top: 50px;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
  }
`;

const Index = () => {
  const [code, setCode] = useState([{ pageName: "index", html: "", css: "", js: "" }]);
  const [uuid, setUuid] = useState("");

  const [pageName, setPageName] = useState("index");

  const [command, setCommand] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenIcon, setIsOpenIcon] = useState(false);
  const [isOpenImage, setIsOpenImage] = useState(false);

  const { segment } = useSpeechContext();

  const currentCode = code.filter((el) => el.pageName === pageName)[0];

  const movePage = (pageName) => {
    setPageName(pageName);
  };

  const setIcon = (iconHtml) => {
    setCode([
      ...code.filter((el) => el.pageName !== pageName),
      { pageName: pageName, html: currentCode?.html + iconHtml, css: currentCode?.css, js: currentCode?.js },
    ]);
    setIsOpenIcon(false);
  };

  const setImage = (imageHtml) => {
    setCode([
      ...code.filter((el) => el.pageName !== pageName),
      { pageName: pageName, html: currentCode?.html + imageHtml, css: currentCode?.css, js: currentCode?.js },
    ]);
    setIsOpenImage(false);
  };

  const deletePage = (pageName) => {
    const filterValue = code.filter((el) => el.pageName !== pageName);
    if (filterValue) {
      setCode(filterValue);
    } else {
      textRead("not valid page name");
    }
  };

  const pageList = () => {
    textRead(`There are ${code.length} pages`);
    code.map((item) => textRead(item.pageName));
  };

  const buildApp = async () => {
    try {
      saveLocalStorage(code);
      const result = await axios({
        method: "POST",
        url: "/api/code",
        data: {
          uuid: uuid,
          code: code,
        },
      });
      if (result.data.success) {
        textRead(`save success. Move to page slash result slash ${getLocalUuid()}`);
      }
    } catch {
      textRead("There are some errors in server.");
    }
  };

  const modalDoneFunc = (pageName) => {
    setCode([...code, { pageName: pageName, html: "", css: "", js: "" }]);
    setIsOpen(false);
    setPageName(pageName);
  };

  const modalCancleFucn = () => {
    setIsOpen(false);
  };
  const modalCancelFucnIcon = () => {
    setIsOpenIcon(false);
  };
  const modalDoneFuncIcon = () => {
    setIsOpenIcon(false);
  };
  const modalCancelFucnImage = () => {
    setIsOpenImage(false);
  };
  const modalDoneFuncImage = () => {
    setIsOpenImage(false);
  };

  const resetCode = () => {
    setCode([{ pageName: "index", html: "", css: "", js: "" }]);
  };

  // 초기 실행 값
  useEffect(() => {
    const prevCode = getLocalStorage();
    if (!prevCode) {
      // setCode("");
      // setIsOpen(true);
    } else {
      setCode(prevCode);
    }
  }, []);

  useEffect(() => {
    const uuidValue = getLocalUuid();
    if (!uuidValue) {
      const newUuid = getRandomValue();
      setLocalUuid(newUuid);
      setUuid(newUuid);
    } else {
      setUuid(uuidValue);
    }
  }, []);

  useEffect(() => {
    if (segment) {
      if (segment.isFinal) {
        setCommand(segment.words);
      }
    }
  }, [segment]);

  // 음성 명령이슈가 생길 때 마다
  useEffect(() => {
    const firstCommand = String(command[0]?.value).toLowerCase();
    const secondCommand = String(command[1]?.value).toLowerCase();
    const thirdCommand = String(command[2]?.value).toLowerCase();

    switch (firstCommand) {
      case "guide":
        return textRead("guide text");

      case "new":
        if (secondCommand === "page") {
          return setIsOpen(true);
        }
        break;

      case "move":
        if (secondCommand === "page") {
          return movePage(thirdCommand);
        }
        break;

      case "delete":
        if (secondCommand === "page") {
          return deletePage(pageName);
        }
        break;

      case "page":
        if (secondCommand === "list") {
          return pageList();
        }
        break;

      case "search":
        if (secondCommand === "icon") {
          return setIsOpenIcon(true);
        } else if (secondCommand === "image") {
          return setIsOpenImage(true);
        }
        break;

      case "save":
        if (secondCommand === "app") {
          return buildApp();
        }
        break;
      case "reset":
        if (secondCommand === "all") {
          return resetCode();
        }
        break;

      case "start project":
        return "";

      case "focus html":
        return "";
      case "focus css":
        return "";
      case "focus javascript":
        return "";

      default:
        return "";
    }
  }, [command]);

  return (
    <CodeWrapper>
      <BigTranscript placement="top" />
      <PushToTalkButton placement="bottom" captureKey=" " />
      <ErrorPanel placement="bottom" />
      <Header />
      {pageName && (
        <p className="current-page">
          Current Page: <span>{pageName}</span>
        </p>
      )}

      <div className="content">
        {code.length !== 0 && pageName ? (
          <Container fluid>
            <Row md={3}>
              <Col>
                <p className="code-category">html</p>
                <CodeMirror
                  value={currentCode?.html}
                  options={{
                    mode: "xml",
                    theme: "material",
                    lineNumbers: true,
                  }}
                  onBeforeChange={(editor, data, value) => {
                    setCode([
                      ...code.filter((el) => el.pageName !== pageName),
                      { pageName: pageName, html: value, css: currentCode?.css, js: currentCode?.js },
                    ]);
                  }}
                />
              </Col>
              <Col>
                <p className="code-category">css</p>
                <CodeMirror
                  value={currentCode?.css}
                  options={{
                    mode: "css",
                    theme: "material",
                    lineNumbers: true,
                  }}
                  onBeforeChange={(editor, data, value) => {
                    setCode([
                      ...code.filter((el) => el.pageName !== pageName),
                      { pageName: pageName, html: currentCode?.html, css: value, js: currentCode?.js },
                    ]);
                  }}
                />
              </Col>
              <Col>
                <p className="code-category">js</p>
                <CodeMirror
                  value={currentCode?.js}
                  options={{
                    mode: "xml",
                    theme: "material",
                    lineNumbers: true,
                  }}
                  onBeforeChange={(editor, data, value) => {
                    setCode([
                      ...code.filter((el) => el.pageName !== pageName),
                      { pageName: pageName, html: currentCode?.html, css: currentCode?.css, js: value },
                    ]);
                  }}
                />
              </Col>
            </Row>
          </Container>
        ) : (
          <p className="empty-page">Create the page</p>
        )}
        {code.length !== 0 && (
          <div>
            <h2 className="code-page-head">Page List</h2>
            <div className="code-page-list">
              {code
                .sort((a, b) => (a.pageName > b.pageName ? 1 : -1))
                .map((item) => (
                  <Button
                    key={item.pageName}
                    size="lg"
                    variant="outline-primary"
                    onClick={() => setPageName(item.pageName)}
                  >
                    {item.pageName}
                  </Button>
                ))}
            </div>
          </div>
        )}
        <div className="button-wrapper">
          <Button variant="primary" size="lg" onClick={buildApp}>
            Save
          </Button>
          <Button variant="warning" size="lg" onClick={resetCode}>
            Reset
          </Button>
          <Button variant="primary" size="lg" onClick={() => setIsOpen(true)}>
            New page
          </Button>
          <Button variant="primary" size="lg" onClick={() => deletePage("")}>
            delete page
          </Button>
          <Button variant="primary" size="lg" onClick={pageList}>
            pageList
          </Button>
        </div>
      </div>
      <Modal isOpen={isOpen} ariaHideApp={false} style={modalStyles} contentLabel="set title modal">
        <TitleModal isOpen={isOpen} doneFunc={modalDoneFunc} cancleFunc={modalCancleFucn} />
      </Modal>
      <Modal isOpen={isOpenIcon} ariaHideApp={false} style={modalStyles} contentLabel="set icon modal">
        <IconModal setIcon={setIcon} cancelFunc={modalCancelFucnIcon} doneFunc={modalDoneFuncIcon} />
      </Modal>
      <Modal isOpen={isOpenImage} ariaHideApp={false} style={modalStyles} contentLabel="set image modal">
        <ImageModal setImage={setImage} cancelFunc={modalCancelFucnImage} doneFunc={modalDoneFuncImage} />
      </Modal>
    </CodeWrapper>
  );
};

export default Index;
