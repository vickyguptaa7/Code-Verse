import { addFileToNavigation } from "../../../Store/reducres/Navigation/FileNavigation.reducer";
import {
  setIsDrawerOpen,
  setShowInSideDrawer,
} from "../../../Store/reducres/SideDrawer/SideDrawer.reducer";
import { useAppDispatch } from "../../../Store/store";
import DropMenu from "../../UI/DropMenu.component";
import DropMenuButton from "../../UI/DropMenuButton.component";
import { whiteBoardUrl } from "../SidePannel.constants";

interface IPROPS {
  closeDropMenuHandler: React.MouseEventHandler;
}

export const DropMenuSetting: React.FC<IPROPS> = ({ closeDropMenuHandler }) => {
  const dispatch = useAppDispatch();
  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    closeDropMenuHandler(event);
  };
  // TODO: Add the functionality of each buttons

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
    <DropMenu className=" bottom-5 left-14">
      <DropMenuButton name="Settings" onClickHandler={openSettingHandler} />
      <DropMenuButton name="Extensions" onClickHandler={openExtensionHandler} />
      <DropMenuButton name="Themes" onClickHandler={onClickHandler} />
      <DropMenuButton
        name="White Board"
        onClickHandler={openToWhiteboardHandler}
      />
    </DropMenu>
  );
};
