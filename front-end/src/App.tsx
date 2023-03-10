import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./Pages/Login.page";
import {
  fetchFileIconsAction,
  fetchFolderIconsAction,
} from "./Store/actions/icons.action";
import { useAppDispatch } from "./Store/store";

const CodeEditor = lazy(() => import("./Pages/CodeEditor.page"));

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("call for icons firebase");

    dispatch(fetchFileIconsAction());
    dispatch(fetchFolderIconsAction());
  }, [dispatch]);
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen animate-bounce">
          Loading...
        </div>
      }
    >
      <div className="App min-h-[30rem] h-screen min-w-[20rem] select-none font-sans">
        <Routes>
          <Route path="/" element={<CodeEditor />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
