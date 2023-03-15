import { useAppSelector } from "../../Store/store";
import FileNavigation from "../FileNavigation/FileNavigation.component";
import BottomPannelContainer from "../bottomPannel/BottomPannelContainer.component";
import MainView from "./MainView.component";

function Main() {
  const isBottomPannelOpen = useAppSelector(
    (state) => state.bottomPannel.isBottomPannelOpen
  );
  return (
    <>
      <FileNavigation />
      <MainView />
      {isBottomPannelOpen && <BottomPannelContainer />}
    </>
  );
}

export default Main;
