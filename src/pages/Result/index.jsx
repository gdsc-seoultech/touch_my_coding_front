import React, { useState, useEffect } from "react";

const Index = () => {
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
    // server로 부터 코드를 가져오는 방식
    return true;
  });

  const test = () => {
    window.navigator.vibrate([2000, 1000, 500]);
  };
  return (
    <div>
      <p onClick={test}>result page</p>
      <h1>test code</h1>
    </div>
  );
};

export default Index;
