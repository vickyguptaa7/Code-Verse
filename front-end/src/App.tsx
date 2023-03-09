import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import CodeEditor from "./Pages/CodeEditor.page";
import Login from "./Pages/Login.page";
import {
  fetchFileIconsAction,
  fetchFolderIconsAction,
} from "./Store/actions/icons.action";
import { useAppDispatch } from "./Store/store";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("call for icons firebase");
    
    dispatch(fetchFileIconsAction());
    dispatch(fetchFolderIconsAction());
  }, [dispatch]);
  return (
    <div className="App min-h-[30rem] h-screen min-w-[20rem] select-none font-sans">
      <Routes>
        <Route path="/" element={<CodeEditor />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
