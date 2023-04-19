import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./Pages/Login.page";
import { fetchExtensionsListAction } from "./Store/actions/extensions.action";
import {
  fetchFileIconsAction,
  fetchFolderIconsAction,
} from "./Store/actions/icons.action";
import { useAppDispatch } from "./Store/store";
import { removeFromLocalStorage } from "./utils/localStorage.utils";

import Loader from "./Components/UI/Loader/Loader.component";

const CodeEditor = lazy(() => import("./Pages/CodeEditor.page"));

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchExtensionsListAction());
    dispatch(fetchFileIconsAction());
    dispatch(fetchFolderIconsAction());
    return () => {
      // clear the local storage when the app is unmounted historyInfo of the files
      removeFromLocalStorage("historyInfo");
    };
  }, [dispatch]);
  return (
    <Suspense
      fallback={
        <Loader type="loading" />
      }
    >
      <div className="App min-h-[30rem] h-screen min-w-[20rem] select-none font-cascadia">
        <Routes>
          <Route path="/" element={<CodeEditor />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
