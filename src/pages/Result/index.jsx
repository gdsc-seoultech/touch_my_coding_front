import React, { useState, useEffect } from "react";
import axios from "axios";
import { PushToTalkButton, BigTranscript, ErrorPanel } from "@speechly/react-ui";
import { useSpeechContext } from "@speechly/react-client";

import * as vibe from "@Utils/vibrate";

const Index = (match) => {
  const [code, setCode] = useState([{}]);
  const [command, setCommand] = useState([]);
  const [pageName, setPageName] = useState("index");

  const createFrame = (code) => {
    const { html, css, js } = code;
    const fontApi = document.createElement("link");
    fontApi.setAttribute("href", "https://fonts.googleapis.com/icon?family=Material+Icons");
    fontApi.setAttribute("rel", "stylesheet");

    // fontApi.rel = "stylesheet";

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
    head.appendChild(createEl("script", js));
    head.appendChild(fontApi);

    doc.body.innerHTML = html;
    head.appendChild(createEl("style", css));
    head.appendChild(
      createEl(
        "style",
        `

    body {
      margin: 0;
    }

    img {
      max-width: 100%;
    }

    `
      )
    );

    const iframe = document.getElementById("iframe");
    const innerDoc = iframe.contentDocument || iframe.contentWindow.document;

    const vibeList = [
      {
        tagName: "button",
        vibeFunc: vibe.vibeButton,
      },
      {
        tagName: "div",
        vibeFunc: vibe.vibeDiv,
      },
      {
        tagName: "h1",
        vibeFunc: vibe.vibeH1,
      },
      {
        tagName: "h2",
        vibeFunc: vibe.vibeH2,
      },
      {
        tagName: "h3",
        vibeFunc: vibe.vibeH3,
      },
      {
        tagName: "h4",
        vibeFunc: vibe.vibeH4,
      },
      {
        tagName: "h5",
        vibeFunc: vibe.vibeH5,
      },
      {
        tagName: "a",
        vibeFunc: vibe.vibeA,
      },
      {
        tagName: "img",
        vibeFunc: vibe.vibeImg,
      },
      {
        tagName: "p",
        vibeFunc: vibe.vibeP,
      },
      {
        tagName: "span",
        vibeFunc: vibe.vibeSpan,
      },
      {
        tagName: "ul",
        vibeFunc: vibe.vibeUl,
      },
      {
        tagName: "ol",
        vibeFunc: vibe.vibeOl,
      },
      {
        tagName: "li",
        vibeFunc: vibe.vibeLi,
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

  const { segment } = useSpeechContext();

  useEffect(() => {
    const { uuid } = match.match.params;
    const fetchData = async () => {
      const result = await axios(`/api/code/${uuid}`);
      if (result.data.success) {
        const { code } = result.data;
        const formatfQuote = code.replaceAll("'", '"');
        setCode(JSON.parse(formatfQuote));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (segment) {
      if (segment.isFinal) {
        setCommand(segment.words);
      }
    }
  }, [segment]);

  useEffect(() => {
    const firstCommand = String(command[0]?.value).toLowerCase();
    const secondCommand = String(command[1]?.value).toLowerCase();

    if (firstCommand === "move") {
      if (code?.secondCommand) {
        setPageName(secondCommand);
      }
    }
  }, [command]);

  return (
    <>
      {/* <BigTranscript placement="top" />
      <PushToTalkButton placement="bottom" captureKey=" " />
      <ErrorPanel placement="bottom" /> */}
      {pageName !== "index" ? createFrame(code.filter((el) => el["pageName"] === pageName)[0]) : createFrame(code[0])}
    </>
  );
};

export default Index;
