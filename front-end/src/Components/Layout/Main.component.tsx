import { useAppSelector } from "../../Store/store";
import FileNavigation from "../FileNavigation/FileNavigation.component";
import BottomPannelContainer from "../bottomPannel/BottomPannelContainer.component";
import Browser from "../browser/Browser";
import MainView from "./MainView.component";
import NotificationContainer from "./Notification/NotificationContainer.component";

function Main() {
  const isBottomPannelOpen = useAppSelector(
    (state) => state.bottomPannel.isBottomPannelOpen
  );
  return (
    <>
      <Browser />
      <FileNavigation />
      <MainView />
      <NotificationContainer />
      {isBottomPannelOpen && <BottomPannelContainer />}
    </>
  );
}

export default Main;
