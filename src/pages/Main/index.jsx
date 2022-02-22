import React, { useState } from "react";
import styled from "styled-components";

import { Controlled as CodeMirror } from "react-codemirror2";

const CodeWrapper = styled.div`
  .touch-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .touch-col {
    width: 30%;

    p {
      text-align: center;
    }
  }
`;

const Index = () => {
  // const [htmlCode, setHtmlCode] = useState();
  // const [cssCode, setCssCode] = useState();
  // const [jsCode, setJsCode] = useState();

  const [code, setCode] = useState({ html: "", css: "", js: "" });

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

  return (
    <CodeWrapper>
      <button onClick={() => createFrame(code)}>저장</button>
      <div className="touch-wrapper">
        <div className="touch-col">
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
        </div>
        <div className="touch-col">
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
        </div>
        <div className="touch-col">
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
        </div>
      </div>
    </CodeWrapper>
  );
};

export default Index;
