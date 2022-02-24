import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Controlled as CodeMirror } from "react-codemirror2";
import { useSpeechContext } from "@speechly/react-client";

import { Button, Container, InputGroup, FormControl, CloseButton } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

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
  const [code, setCode] = useState({ html: "", css: "", js: "" });
  const [command, setCommand] = useState("");

  const { segment } = useSpeechContext();

  const createFrame = (code) => {
    const { html, css, js } = code;
    const currentFrame = document.querySelector("#iframe");
    const frameEl = document.createElement("iframe");

    if (currentFrame) {
      currentFrame.remove();
    }

    const el = document.querySelector("#root");
    frameEl.setAttribute("id", "iframe");
    frameEl.setAttribute("class", "output");
    el.appendChild(frameEl);
    const doc = document.querySelector("#iframe").contentWindow.document;
    const head = doc.querySelector("head");
    doc.body.innerHTML = html;
    head.appendChild(createEl("script", js));
    head.appendChild(createEl("style", css));
  };

  const createEl = (type, innerhtml) => {
    const el = document.createElement(type);
    el.innerHTML = innerhtml;
    return el;
  };

  useEffect(() => {
    if (segment) {
      if (segment.isFinal) {
        setCommand(segment);
      }
    }
  }, [segment]);

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
        <Button className="m-3" onClick={() => createFrame(code)}>
          저장
        </Button>
      </div>
    </CodeWrapper>
  );
};

export default Index;
