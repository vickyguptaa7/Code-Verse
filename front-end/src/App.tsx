import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";

import CodeEditor from "./Pages/CodeEditor.page";
import Login from "./Pages/Login.page";

const App = () => {
  return (
    <div className="App min-h-[30rem] h-screen min-w-[20rem] select-none font-sans">
      <Routes>
        <Route path="/" element={<CodeEditor />}/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
