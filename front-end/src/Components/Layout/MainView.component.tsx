import React from "react";
import { useAppSelector } from "../../Store/store";
import EditorContainer from "../Editor/EditorContainer.component";

const MainView = () => {
  const currentNavFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );
  console.log(currentNavFile);
  return (
    <>
      {currentNavFile.type === "setting" ? null : currentNavFile.type ===
        "extension" ? null : (
        <EditorContainer />
      )}
    </>
  );
};

export default MainView;
