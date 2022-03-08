import React, { useState, useEffect } from "react";

const Index = () => {
  const [code, setCode] = useState([{}]);
  const [pageName, setPageName] = useState("");

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
    setCode([
      {
        pageName: "main",
        html: "<div><p class='a'>hello world</p></div>",
        css: ".a { color: red }",
      },
      {
        pageName: "second",
        html: "<div><p class='a'>hello world</p></div>",
        css: ".a { color: blue }",
      },
      {
        pageName: "third",
        html: "<div><p class='a'>hello world</p></div>",
        css: ".a { color: yellow }",
      },
    ]);
  }, []);

  return <div>{pageName ? createFrame(code.filter((el) => el["pageName"] === "second")) : createFrame(code[0])}</div>;
};

export default Index;
