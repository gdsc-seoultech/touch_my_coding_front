import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { Controlled as CodeMirror } from "react-codemirror2";
import { useSpeechContext } from "@speechly/react-client";
import { Button, Container, Row, Col } from "react-bootstrap";
import "react-tabs/style/react-tabs.css";

import { modalStyles } from "@Components/modalOption";

import TitleModal from "@Components/TitleModal";
import IconModal from "@Components/IconModal";
import ImageModal from "@Components/ImageModal";
import Header from "@Components/Header";

import { textRead } from "@Utils/TextToSpeech";
import { getLocalStorage, saveLocalStorage } from "@Utils/storage";

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
  const [code, setCode] = useState([{ pageName: "index", htm: "", css: "", js: "" }]);

  const [pageName, setPageName] = useState("index");

  const [command, setCommand] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenIcon, setIsOpenIcon] = useState(false);
  const [isOpenImage, setIsOpenImage] = useState(true);

  const { segment } = useSpeechContext();

  const currentCode = code.filter((el) => el.pageName === pageName)[0];

  const movePage = (pageName) => {
    setPageName(pageName);
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

  const buildApp = () => {
    saveLocalStorage(code);
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
    setCode([]);
  };

  // useEffect(() => {
  //   if (segment) {
  //     if (segment.isFinal) {
  //       setCommand(segment);
  //     }
  //   }
  // }, [segment]);

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

  // 음성 명령이슈가 생길 때 마다
  useEffect(() => {
    switch (command) {
      case "guide":
        return textRead("guide text");
      case "new page":
        return setIsOpen(true);
      case "move page":
        return movePage("");
      case "delete page":
        return deletePage("");
      case "page list":
        return pageList();
      case "start project":
        return "";
      case "search icon":
        return setIsOpenIcon(true);
      case "search image":
        return setIsOpenImage(true);
      case "build app":
        return buildApp();
      default:
        return textRead("not valiid command. Try it again.");
    }
  }, [command]);

  return (
    <CodeWrapper>
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
                  <Button size="lg" variant="outline-primary" onClick={() => setPageName(item.pageName)}>
                    {item.pageName}
                  </Button>
                ))}
            </div>
          </div>
        )}
        <div className="button-wrapper">
          <Button variant="primary" size="lg" onClick={() => saveLocalStorage(code)}>
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
        <Container fluid>
          <Row md={3}>
            <Col>
              <p>html</p>
              <CodeMirror
                value={code.html}
                options={{
                  mode: "xml",
                  theme: "material",
                  lineNumbers: true,
                }}
                onBeforeChange={(editor, data, value) => {
                  setCode({ ...code, html: value });
                }}
              />
            </Col>
            <Col>
              <p>css</p>
              <CodeMirror
                value={code.css}
                options={{
                  mode: "css",
                  theme: "material",
                  lineNumbers: true,
                }}
                onBeforeChange={(editor, data, value) => {
                  setCode({ ...code, css: value });
                }}
              />
            </Col>
            <Col>
              <p>js</p>
              <CodeMirror
                value={code.js}
                options={{
                  mode: "xml",
                  theme: "material",
                  lineNumbers: true,
                }}
                onBeforeChange={(editor, data, value) => {
                  setCode({ ...code, js: value });
                }}
              />
            </Col>
          </Row>
        </Container>

        <Button className="m-3" onClick={() => saveLocalStorage(code)}>
          저장
        </Button>
      </div>
      <Modal isOpen={isOpen} ariaHideApp={false} style={modalStyles} contentLabel="set title modal">
        <TitleModal isOpen={isOpen} doneFunc={modalDoneFunc} cancleFunc={modalCancleFucn} />
      </Modal>
      <Modal isOpen={isOpenIcon} ariaHideApp={false} style={modalStyles} contentLabel="set icon modal">
        <IconModal isOpen={isOpenIcon} cancelFunc={modalCancelFucnIcon} doneFunc={modalDoneFuncIcon} />
      </Modal>
      <Modal isOpen={isOpenImage} ariaHideApp={false} style={modalStyles} contentLabel="set image modal">
        <ImageModal isOpen={isOpenImage} cancelFunc={modalCancelFucnImage} doneFunc={modalDoneFuncImage} />
      </Modal>
    </CodeWrapper>
  );
};

export default Index;
