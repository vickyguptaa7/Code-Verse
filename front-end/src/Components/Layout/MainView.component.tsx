import React from "react";
import { useAppSelector } from "../../Store/store";
import { HEIGHT_OF_FILENAVIGATION_AND_FOOTER } from "../bottomPannel/BottomPannel.Constant";

import EditorContainer from "../Editor/EditorContainer.component";
import ExtensionDetails from "./Extensions/ExtensionDetails.component";

import Home from "./Home/Home.component";
import Welcome from "./Welcome/Welcome.component";
import Setting from "./Settings/Setting.component";

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
    return <Setting height={height} />;
  }

  if (currentNavFile.type === "welcome") {
    return <Welcome height={height} />;
  }
  return (
    <EditorContainer
      editorHeight={height}
      currentWorkingFile={currentNavFile}
    />
  );
};

export default MainView;
