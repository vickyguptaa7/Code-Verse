import { useAppSelector } from "../../Store/store";
import Editor from "../Editor/editor.component";
import FileNavigation from "../FileNavigation/FileNavigation.component";
import BottomPannelContainer from "../bottomPannel/BottomPannelContainer.component";

function Main() {
  const isBottomPannelOpen = useAppSelector(
    (state) => state.bottomPannel.isBottomPannelOpen
  );
  return (
    <>
      <FileNavigation />
      <Editor />
      {isBottomPannelOpen && <BottomPannelContainer />}
    </>
  );
}

export default Main;
