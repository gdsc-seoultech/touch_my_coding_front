import React, { useState, useEffect } from "react";
import axios from "axios";

import { UnControlled as CodeMirror } from "react-codemirror2";

const Index = () => {
  const [htmlCode, setHtmlCode] = useState();
  const [cssCode, setCssCode] = useState();
  const [jsCode, setJsCode] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/first");
      console.log(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      <p>html</p>
      <CodeMirror
        value={htmlCode}
        options={{
          mode: "xml",
          theme: "material",
          lineNumbers: true,
        }}
        onChange={(editor, data, value) => {
          setHtmlCode(value);
          console.log(value);
        }}
      />
      <p>css</p>
      <CodeMirror
        value={cssCode}
        options={{
          mode: "css",
          theme: "material",
          lineNumbers: true,
        }}
        onChange={(editor, data, value) => {
          setCssCode(value);
        }}
      />
      <p>js</p>
      <CodeMirror
        value={jsCode}
        options={{
          mode: "xml",
          theme: "material",
          lineNumbers: true,
        }}
        onChange={(editor, data, value) => {
          setJsCode(value);
        }}
      />
    </div>
  );
};

export default Index;
