import { addFileToNavigation } from "../../../Store/reducres/Navigation/FileNavigation.reducer";
import {
  setIsDrawerOpen,
  setShowInSideDrawer,
} from "../../../Store/reducres/SideDrawer/SideDrawer.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import DropMenu from "../../UI/DropMenu.component";
import DropMenuButton from "../../UI/DropMenuButton.component";
import { whiteBoardUrl } from "../SidePannel.constants";

interface IPROPS {
  closeDropMenuHandler: React.MouseEventHandler;
}

export const DropMenuSetting: React.FC<IPROPS> = ({ closeDropMenuHandler }) => {
  const dispatch = useAppDispatch();
  const isSidePannelPositionOnLeft = useAppSelector(
    (state) => state.sideDrawer.isSidePannelPositionOnLeft
  );
  const openToWhiteboardHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    window.open(whiteBoardUrl, "_blank");
    closeDropMenuHandler(event);
  };

  const openSettingHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(addFileToNavigation({ id: "setting", type: "setting" }));
    closeDropMenuHandler(event);
  };

  const openExtensionHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsDrawerOpen(true));
    dispatch(setShowInSideDrawer("extensions"));
    closeDropMenuHandler(event);
  };

  return (
    <DropMenu
      className={
        isSidePannelPositionOnLeft
          ? "w-36 bottom-3.5 left-[54px]"
          : "w-36 bottom-3.5 right-[54px]"
      }
      initialX={isSidePannelPositionOnLeft ? -155 : 15}
      initialY={100}
    >
      <DropMenuButton name="Settings" onClickHandler={openSettingHandler} />
      <DropMenuButton name="Extensions" onClickHandler={openExtensionHandler} />
      <DropMenuButton name="Themes" onClickHandler={openSettingHandler} />
      <DropMenuButton
        name="White Board"
        onClickHandler={openToWhiteboardHandler}
      />
    </DropMenu>
  );
};
