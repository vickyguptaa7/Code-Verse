import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import DebugDrawer from "./Components/sideDrawer/debugDrawer.component";
import ExtensionsDrawer from "./Components/sideDrawer/extensionsDrawer.component";
import FileDrawer from "./Components/sideDrawer/fileDrawer.component";
import GitDrawer from "./Components/sideDrawer/gitDrawer.component";
import SearchDrawer from "./Components/sideDrawer/searchDrawer.component";

import CodeEditor from "./Pages/CodeEditor.page";
import Login from "./Pages/Login.page";

const App = () => {
  return (
    <div className="App min-h-[30rem] h-screen min-w-[20rem]">
      <Routes>
        <Route path="/" element={<CodeEditor />}>
            <Route path="side-drawer/files" element={<FileDrawer />} />
            <Route path="side-drawer/search" element={<SearchDrawer />} />
            <Route path="side-drawer/git" element={<GitDrawer />} />
            <Route path="side-drawer/debug" element={<DebugDrawer />} />
            <Route path="side-drawer/extensions" element={<ExtensionsDrawer />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
