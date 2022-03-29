import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SpeechProvider } from "@speechly/react-client";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/neat.css";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/css/css.js";

ReactDOM.render(
  <React.StrictMode>
    <SpeechProvider appId={process.env.REACT_APP_ID}>
      <App />
    </SpeechProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
