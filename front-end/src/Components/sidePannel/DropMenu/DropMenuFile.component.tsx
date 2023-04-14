import JSZip from "jszip";
import { addFileToNavigation } from "../../../Store/reducres/Navigation/FileNavigation.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import DropMenu from "../../UI/DropMenu.component";
import DropMenuButton from "../../UI/DropMenuButton.component";
import {
  DrawerContent,
  setShowInSideDrawer,
  setIsDrawerOpen,
} from "./../../../Store/reducres/SideDrawer/SideDrawer.reducer";
import IDirectory from "../../../Interface/directory.interface";
import { fileDownloader } from "../../../utils/fileFolder.utils";
import { scrollToTarget } from "../../../utils/scrollToTargetId.util";

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
  const directories = useAppSelector((state) => state.Directory.directories);

  const onSaveFileHandler = () => {
    closeDropMenuHandler();
    const file = new Blob([filesInformation[currFile.id].body]);
    fileDownloader(file, filesInformation[currFile.id].name);
  };

  const addAllFilesAndFolderToZipHelper = async (
    zip: JSZip,
    directories: Array<IDirectory>,
    dirPath: string
  ) => {
    for (const directory of directories) {
      if (directory.isFolder) {
        await addAllFilesAndFolderToZipHelper(
          zip,
          directory.children,
          dirPath + "/" + directory.name
        );
      } else {
        zip.file(
          dirPath + "/" + directory.name,
          new Blob([filesInformation[directory.id].body])
        );
      }
    }
  };

  const onSaveAllFileAndFolderHandler = async () => {
    console.log("Save all files and folders");
    closeDropMenuHandler();
    const zip = new JSZip();
    await addAllFilesAndFolderToZipHelper(zip, directories, "root");
    const file = await zip.generateAsync({ type: "blob" });
    fileDownloader(file, "All File And Folder");
  };

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
      <OpenFileFolderDropMenuButtons
        closeDropMenuHandler={closeDropMenuHandler}
      />
      <div className="w-4/5 mx-auto h-[0.5px] bg-[color:var(--primary-text-color)] my-1"></div>
      <DropMenuButton
        name="Save All"
        onClickHandler={onSaveAllFileAndFolderHandler}
      />
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

function OpenFileFolderDropMenuButtons(props: {
  closeDropMenuHandler: Function;
}) {
  return (
    <>
      <label htmlFor="file" title="Add local files">
        <div
          className="cursor-pointer whitespace-nowrap block mx-1 my-0.5 px-4 py-0.5 text-sm text-start rounded-md hover:bg-[color:var(--hover-text-color)]"
          onClick={() => {
            // give time out to perform the task of label so that file selection popup will appear
            setTimeout(props.closeDropMenuHandler, 0);
          }}
        >
          <h1>Open Files</h1>
        </div>
      </label>

      <label htmlFor="folder" title="Add local files">
        <div
          className="cursor-pointer whitespace-nowrap block mx-1 my-0.5 px-4 py-0.5 text-sm text-start rounded-md hover:bg-[color:var(--hover-text-color)]"
          onClick={() => {
            setTimeout(props.closeDropMenuHandler, 0);
          }}
        >
          <h1>Open Folder</h1>
        </div>
      </label>
    </>
  );
}
