import useScroll from "../../../hooks/useScroll.hook";
import { addFileToNavigation } from "../../../Store/reducres/Navigation/FileNavigation.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import DropMenu from "../../UI/DropMenu.component";
import DropMenuButton from "../../UI/DropMenuButton.component";
import {
  DrawerContent,
  setShowInSideDrawer,
  setIsDrawerOpen,
} from "./../../../Store/reducres/SideDrawer/SideDrawer.reducer";

interface IPROPS {
  closeDropMenuHandler: Function;
}

export const DropMenuFile: React.FC<IPROPS> = ({ closeDropMenuHandler }) => {
  const dispatch = useAppDispatch();
  const currFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );
  const filesInformation = useAppSelector(
    (state) => state.Directory.filesInformation
  );
  const { scrollToTarget } = useScroll();

  const onSaveFileHandler = () => {
    closeDropMenuHandler();
    const link = document.createElement("a");
    const file = new Blob([filesInformation[currFile.id].body]);
    link.href = URL.createObjectURL(file);
    link.download = filesInformation[currFile.id].name;
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  // TODO: Add the functionality of each buttons

  const showInSideDrawerHandler = (view: DrawerContent) => {
    dispatch(setIsDrawerOpen(true));
    dispatch(setShowInSideDrawer(view));
    closeDropMenuHandler();
  };

  const welcomeHandler = () => {
    dispatch(addFileToNavigation({ id: "welcome", type: "welcome" }));
    scrollToTarget("welcome");
    closeDropMenuHandler();
  };

  return (
    <DropMenu className="w-36 -top-[54px] left-14">
      <label htmlFor="file" title="Add local files">
        <div
          className="cursor-pointer whitespace-nowrap block mx-1 my-0.5 px-4 py-0.5 text-sm text-start rounded-md hover:bg-[color:var(--hover-text-color)]"
          onClick={() => {
            // give time out to perform the task of label so that file selection popup will appear
            setTimeout(closeDropMenuHandler, 0);
          }}
        >
          <h1>Open Files</h1>
        </div>
      </label>

      <label htmlFor="folder" title="Add local files">
        <div
          className="cursor-pointer whitespace-nowrap block mx-1 my-0.5 px-4 py-0.5 text-sm text-start rounded-md hover:bg-[color:var(--hover-text-color)]"
          onClick={() => {
            setTimeout(closeDropMenuHandler, 0);
          }}
        >
          <h1>Open Folder</h1>
        </div>
      </label>
      {currFile.type === "file" && currFile.id !== "null" && (
        <DropMenuButton name="Save File" onClickHandler={onSaveFileHandler} />
      )}
      <div className="w-4/5 mx-auto h-[0.5px] bg-[color:var(--primary-text-color)] my-1"></div>
      <DropMenuButton
        name="Explorer"
        onClickHandler={() => showInSideDrawerHandler("file")}
      />
      <DropMenuButton
        name="Search"
        onClickHandler={() => showInSideDrawerHandler("search")}
      />
      <DropMenuButton
        name="Source Control"
        onClickHandler={() => showInSideDrawerHandler("git")}
      />
      <DropMenuButton
        name="Run"
        onClickHandler={() => showInSideDrawerHandler("debug")}
      />
      <DropMenuButton
        name="Extensions"
        onClickHandler={() => showInSideDrawerHandler("extensions")}
      />
      <div className="w-4/5 mx-auto h-[0.5px] bg-[color:var(--primary-text-color)] my-1"></div>
      <DropMenuButton name="Welcome" onClickHandler={welcomeHandler} />
    </DropMenu>
  );
};
