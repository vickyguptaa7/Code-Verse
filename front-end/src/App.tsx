import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.css";

import { fetchExtensionsListAction } from "./Store/actions/extensions.action";
import {
  fetchFileIconsAction,
  fetchFolderIconsAction,
} from "./Store/actions/icons.action";
import { useAppDispatch, useAppSelector } from "./Store/store";
import { removeFromLocalStorage } from "./utils/localStorage.utils";

import Loader from "./Components/UI/Loader/Loader.component";
import { themesNameArray } from "./Assets/Data/theme.data";

const CodeEditor = lazy(() => import("./Pages/CodeEditor.page"));

const App = () => {
  const dispatch = useAppDispatch();
  const editorTheme = useAppSelector((state) => state.editor.theme);
  useEffect(() => {
    document.body.classList.remove(...themesNameArray);
    document.body.classList.add(editorTheme);
  }, [editorTheme]);
  useEffect(() => {
    dispatch(fetchExtensionsListAction());
    dispatch(fetchFileIconsAction());
    dispatch(fetchFolderIconsAction());
    removeFromLocalStorage("vscode-history-info");
    return () => {
      // clear the local storage when the app is unmounted historyInfo of the files
      removeFromLocalStorage("vscode-history-info");
    };
  }, [dispatch]);
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen pb-32 bg-[color:var(--codeeditor-color)]">
          <Loader type="loading" />
        </div>
      }
    >
      <div className="App min-h-[30rem] h-screen min-w-[20rem] select-none font-cascadia overflow-hidden">
        <Routes>
          <Route path="/*" element={<CodeEditor />} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
