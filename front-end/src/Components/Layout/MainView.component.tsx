import React from "react";
import { useAppSelector } from "../../Store/store";
import { HEIGHT_OF_FILENAVIGATION_AND_FOOTER } from "../bottomPannel/BottomPannel.Constant";

import EditorContainer from "../Editor/EditorContainer.component";
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
  console.log(currentNavFile);
  if (currentNavFile.id === "null") {
    return (
      <>
        <div
          style={{ height: height + 40 }}
          className="flex items-center justify-center text-white"
        >
          HOME
        </div>
      </>
    );
  }
  if (currentNavFile.type === "extension") {
    return <div style={{ height: height }}></div>;
  }
  if (currentNavFile.type === "setting") {
    return <div style={{ height: height }}></div>;
  }

  return (
    <EditorContainer
      editorHeight={height}
      currentWorkingFile={currentNavFile}
    />
  );
};

export default MainView;
