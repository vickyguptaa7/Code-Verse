import { CODE_EDITOR_MIN_HEIGHT } from "../../Pages/CodeEditor.page";
import { useAppSelector } from "../../Store/store";
import EditorContainer from "../Editor/EditorContainer.component";
import { HEIGHT_OF_FILENAVIGATION_AND_FOOTER } from "../bottomPannel/BottomPannel.Constant";
import ExtensionDetails from "./Extensions/ExtensionDetails.component";
import Home from "./Home/Home.component";
import Setting from "./Settings/Setting.component";
import Welcome from "./Welcome/Welcome.component";

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

  // Calculate the height for the editor home page etc.
  let height =
    Math.max(document.body.clientHeight, CODE_EDITOR_MIN_HEIGHT) -
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
