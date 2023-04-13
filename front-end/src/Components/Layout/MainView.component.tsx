import React from "react";
import { useAppSelector } from "../../Store/store";
import { HEIGHT_OF_FILENAVIGATION_AND_FOOTER } from "../bottomPannel/BottomPannel.Constant";

import EditorContainer from "../Editor/EditorContainer.component";
import ExtensionDetails from "../ExtensionDetails/ExtensionDetails.component";

import Home from "./Home.component";

const EDITOR_MIN_HEIGHT = 480;
const MainView = () => {
  const currentNavFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );
  const bottomPannelHeight = useAppSelector(
    (state) => state.bottomPannel.bottomPannelHeight
  );
  const isBottomPannelOpen = useAppSelector(
    (state) => state.bottomPannel.isBottomPannelOpen
  );
  let height =
    Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) -
    HEIGHT_OF_FILENAVIGATION_AND_FOOTER;
  height -= isBottomPannelOpen ? bottomPannelHeight : 0;

  if (currentNavFile.id === "null") {
    return <Home height={height} />;
  }
  if (currentNavFile.type === "extension") {
    return <ExtensionDetails height={height} />;
  }
  if (currentNavFile.type === "setting") {
    return (
      <div
        className="text-[color:var(--highlight-text-color)] items-center justify-center flex"
        style={{ height: height }}
      >
        Settings
      </div>
    );
  }
  if (currentNavFile.type === "welcome") {
    return (
      <div
        className="text-[color:var(--highlight-text-color)] items-center justify-center flex"
        style={{ height: height }}
      >
        Welcome
      </div>
    );
  }
  return (
    <EditorContainer
      editorHeight={height}
      currentWorkingFile={currentNavFile}
    />
  );
};

export default MainView;
