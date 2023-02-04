import React from "react";
import "./App.css";

import CodeEditor from "./Pages/CodeEditor.page";

const App = () => {
  return (
    <div className="App min-h-[30rem] h-screen min-w-[20rem]">
      <CodeEditor />
    </div>
  );
};

export default App;
