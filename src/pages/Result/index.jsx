import React, { useState, useEffect } from "react";
import { getLocalStorage } from "@Utils/storage";
import * as vibe from "@Utils/vibrate";

const Index = () => {
  /*
   * 진동 부여해주는 기능 추가, 페이지 링크 기능 추가
   */

  const [code, setCode] = useState([{}]);
  const [pageName, setPageName] = useState("index");

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

    const iframe = document.getElementById("iframe");
    const innerDoc = iframe.contentDocument || iframe.contentWindow.document;

    const vibeList = [
      {
        tagName: "div",
        vibeFunc: vibe.vibeButton,
      },
      {
        tagName: "p",
        vibeFunc: vibe.vibeP,
      },
    ];

    for (let i = 0; i < vibeList.length; i++) {
      const tagList = innerDoc.getElementsByTagName(`${vibeList[i].tagName}`);

      for (let j = 0; j < tagList.length; j++) {
        tagList[j].addEventListener("click", () => {
          vibeList[i].vibeFunc();
        });
      }
    }
  };

  const createEl = (type, innerhtml) => {
    const el = document.createElement(type);
    el.innerHTML = innerhtml;
    return el;
  };

  useEffect(() => {
    setCode(getLocalStorage());
  }, []);

  return <>{!pageName ? createFrame(code.filter((el) => el["pageName"] === "index")) : createFrame(code[0])}</>;
};

export default Index;
