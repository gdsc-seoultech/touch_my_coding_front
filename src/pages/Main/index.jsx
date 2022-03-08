import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";

import { Controlled as CodeMirror } from "react-codemirror2";
import { useSpeechContext } from "@speechly/react-client";

import { Button, Container, InputGroup, FormControl, CloseButton } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getLocalStorage, saveLocalStorage } from "@Utils/storage";

import { modalStyles } from "../../components/modalOption";
import TitleModal from "@Components/TitleModal";
import IconModal from "@Components/IconModal";
import ImageModal from "@Components/ImageModal";
import { textRead } from "@Utils/TextToSpeech";

const CodeWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  .content {
    width: 80%;
  }
  /* .touch-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .touch-col {
    width: 30%;

    p {
      text-align: center;
    }
  } */
`;

const Side = styled.div`
  width: 20%;
  height: 900px;
  position: sticky;
  top: 0;
  background-color: black;
  color: white;
`;

const Index = () => {
  const [code, setCode] = useState([]);
  const [command, setCommand] = useState("");

  const [pageName, setPageName] = useState("");

  const [isOpen, setIsOpen] = useState(true);
  const [isOpenIcon, setIsOpenIcon] = useState(false);
  const [isOpenImage, setIsOpenImage] = useState(false);

  const { segment } = useSpeechContext();

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
  };

  const modalCancleFucn = () => {
    setIsOpen(false);
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
      setCode("");
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
      {/* <Side>
        <div>
          <h4 className="m-3">Files</h4>
          <div>
            {names.map((name) => (
              <div className="m-3">
                {name.text}
                <CloseButton onClick={() => onRemove(name.id)} variant="white" />
              </div>
            ))}
          </div>
          <InputGroup className="mb-3">
            <FormControl placeholder="파일명" value={""} />
            <Button variant="outline-secondary">
              추가
            </Button>
          </InputGroup>
        </div>
      </Side> */}
      <div className="content">
        <Container fluid>
          <Tabs>
            {/* <TabList>
              {names.map((name) => (
                <Tab>
                  {name.text}
                  <CloseButton onClick={() => onRemove(name.id)} variant="gray" />
                </Tab>
              ))}
            </TabList>

            {names.map((name) => (
              <div>
                {name.type === "html" ? (
                  <TabPanel>
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
                  </TabPanel>
                ) : name.type === "css" ? (
                  <TabPanel>
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
                  </TabPanel>
                ) : (
                  <TabPanel>
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
                  </TabPanel>
                )}
              </div>
            ))} */}

            {/* <TabPanel>
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
            </TabPanel>

            <TabPanel>
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
            </TabPanel>
            <TabPanel>
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
            </TabPanel> */}
          </Tabs>

          {/* <Row xs={1} md={2}>
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
              {" "}
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
          </Row> */}
        </Container>
        <Button className="m-3" onClick={() => saveLocalStorage(code)}>
          저장s
        </Button>
      </div>
      <Modal isOpen={isOpen} ariaHideApp={false} style={modalStyles} contentLabel="set title modal">
        <TitleModal isOpen={isOpen} doneFunc={modalDoneFunc} cancleFunc={modalCancleFucn} />
      </Modal>
      <Modal isOpen={isOpenIcon} ariaHideApp={false} style={modalStyles} contentLabel="set icon modal">
        <IconModal />
      </Modal>
      <Modal isOpen={isOpenImage} ariaHideApp={false} style={modalStyles} contentLabel="set image modal">
        <ImageModal />
      </Modal>
    </CodeWrapper>
  );
};

export default Index;
