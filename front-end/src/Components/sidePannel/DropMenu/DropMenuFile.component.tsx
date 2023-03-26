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
import { v4 as uuid4 } from "uuid";
import {
  addFileOrFolderToDirectory,
  updateFileBody,
} from "../../../Store/reducres/SideDrawer/Directory/Directory.reducer";
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

  const fileNameGenerator = (name: string) => {
    const fileName = name.split("\\").pop()?.split(".");
    const extension = fileName ? fileName.pop() : "";
    const id: string = uuid4();
    fileName?.push(id);
    fileName?.push(extension ? extension : "");
    const newFileName = fileName ? fileName.join(".") : id;
    return { fileName: newFileName, id };
  };

  // TODO : Add local files
  const openFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    closeDropMenuHandler();
    const files = e.target.files;
    for (const fileKey in files) {
      if (isNaN(parseInt(fileKey))) continue;
      const { fileName, id } = fileNameGenerator(files[parseInt(fileKey)].name);
      console.log(files[parseInt(fileKey)]);
      const reader = new FileReader();
      reader.readAsText(files[parseInt(fileKey)]);
      reader.onload = () => {
        dispatch(
          addFileOrFolderToDirectory({
            id: id,
            parentId: "root",
            name: fileName,
            isFolder: false,
          })
        );
        dispatch(
          updateFileBody({
            id: id,
            body: reader.result ? reader.result.toString() : "",
          })
        );
        dispatch(addFileToNavigation({ id: id, type: "file" }));
        // console.log(reader.result?.toString());
      };
      reader.onerror = () => {
        console.log("file error", reader.error);
      };
    }
  };

  const openFolderHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    console.log(e.target.files);
    
  }

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
