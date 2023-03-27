import useScroll from "../../../hooks/useScroll.hook";
import { addFileToNavigation } from "../../../Store/reducres/Navigation/FileNavigation.reducer";
import { useAppDispatch } from "../../../Store/store";
import DropMenu from "../../UI/DropMenu.component";
import DropMenuButton from "../../UI/DropMenuButton.component";
import {
  DrawerContent,
  setShowInSideDrawer,
  setIsDrawerOpen,
} from "./../../../Store/reducres/SideDrawer/SideDrawer.reducer";
import {
  addExternalFileOrFolderToDirectory,
  setFilesInformation,
} from "../../../Store/reducres/SideDrawer/Directory/Directory.reducer";
import IDirectory from "../../../Interface/directory.interface";
import useDirectory from "../../../hooks/useDirectory.hook";
import { IFile } from "../../../Interface/file.interface";

declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?: string;
    mozdirectory?: string;
  }
}
interface IPROPS {
  closeDropMenuHandler: Function;
}

export const DropMenuFile: React.FC<IPROPS> = ({ closeDropMenuHandler }) => {
  const dispatch = useAppDispatch();
  const { scrollToTarget } = useScroll();

  const onClickHandler = () => {
    closeDropMenuHandler();
  };
  const {
    processFileUpload,
    uniqueFileFolderNameGenerator,
    processFolderUpload,
    sortTheProcessedDirectory,
  } = useDirectory();

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

  // TODO : Add local files
  const openFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    closeDropMenuHandler();
    const files = e.target.files;
    const tempDirectory: Array<IDirectory> = [];
    const tempFilesInformation: Array<IFile> = [];
    for (const fileKey in files) {
      if (isNaN(parseInt(fileKey))) continue;
      await processFileUpload(
        files[parseInt(fileKey)],
        tempDirectory,
        tempFilesInformation
      );
    }
    dispatch(addExternalFileOrFolderToDirectory(tempDirectory));
    dispatch(setFilesInformation(tempFilesInformation));
  };

  const openFolderHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files, e.target.value);
    closeDropMenuHandler();
    let files = e.target.files;
    if (!files) return;
    const { name: folderName, id: folderId } = uniqueFileFolderNameGenerator(
      files[0].webkitRelativePath.split("/")[0],
      true,
      true
    );
    const newDirectory: IDirectory = {
      id: folderId,
      parentId: "root",
      name: folderName,
      iconUrls: [],
      isFolder: true,
      children: [],
    };
    const tempFilesInformation: Array<IFile> = [];
    for (const fileKey in files) {
      if (isNaN(parseInt(fileKey))) continue;
      const currFile = files[parseInt(fileKey)];
      await processFolderUpload(
        currFile,
        newDirectory,
        tempFilesInformation
      );
    }
    sortTheProcessedDirectory(newDirectory);
    dispatch(addExternalFileOrFolderToDirectory([newDirectory]));
    dispatch(setFilesInformation(tempFilesInformation));
    console.log(newDirectory);
  };

  return (
    <DropMenu className="w-36 -top-[54px] left-14">
      <label htmlFor="file" title="Add local files">
        <div className="cursor-pointer whitespace-nowrap block mx-1 my-0.5 px-4 py-0.5 text-sm text-start rounded-md hover:bg-[color:var(--hover-text-color)]">
          <h1>Open Files</h1>
        </div>
      </label>
      <input
        type="file"
        id="file"
        name="file"
        multiple
        className="hidden"
        onChange={openFileHandler}
      />

      <label htmlFor="folder" title="Add local files">
        <div className="cursor-pointer whitespace-nowrap block mx-1 my-0.5 px-4 py-0.5 text-sm text-start rounded-md hover:bg-[color:var(--hover-text-color)]">
          <h1>Open Folder</h1>
        </div>
      </label>
      <input
        type="file"
        id="folder"
        name="folder"
        directory=""
        webkitdirectory=""
        className="hidden"
        onChange={openFolderHandler}
      />

      <DropMenuButton name="Save Files" onClickHandler={onClickHandler} />
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
