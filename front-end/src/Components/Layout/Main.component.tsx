import { useAppSelector } from "../../Store/store";
import FileNavigation from "../FileNavigation/FileNavigation.component";
import BottomPannelContainer from "../bottomPannel/BottomPannelContainer.component";
import EditorContainer from "../Editor/EditorContainer.component";

function Main() {
  const isBottomPannelOpen = useAppSelector(
    (state) => state.bottomPannel.isBottomPannelOpen
  );
  return (
    <>
      <FileNavigation />
      <EditorContainer />
      {isBottomPannelOpen && <BottomPannelContainer />}
    </>
  );
}

export default Main;
