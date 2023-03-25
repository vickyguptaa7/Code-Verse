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

  // TODO : Add local files
  const openFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const fileName = e.target.value.split("\\").pop()?.split(".");
    const extension = fileName ? fileName.pop() : "";
    const id: string = uuid4();
    fileName?.push(id);
    fileName?.push(extension ? extension : "");
    const newFileName = fileName ? fileName.join(".") : id;
    console.log(newFileName);

    const file = e.target.files
      ? e.target.files[0]
      : new File(["Something went wrong while opening the file"], "error.text");
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      dispatch(
        addFileOrFolderToDirectory({
          id: id,
          parentId: "root",
          name: newFileName,
          isFolder: false,
        })
      );
      dispatch(updateFileBody({ id: id, body: reader.result?reader.result.toString():"" }));
      dispatch(addFileToNavigation({ id: id, type: "file" }));
      console.log(reader.result?.toString());
    };
    reader.onerror = () => {
      closeDropMenuHandler();
      console.log("file error", reader.error);
    };
    closeDropMenuHandler();
  };

  return (
    <DropMenu className="w-36 -top-[54px] left-14">
      <label htmlFor="file" title="Add local files">
        <div className="cursor-pointer whitespace-nowrap block mx-1 my-0.5 px-4 py-0.5 text-sm text-start rounded-md hover:bg-[color:var(--hover-text-color)]">
          <h1>Open File</h1>
        </div>
      </label>
      <input
        type="file"
        id="file"
        name="file"
        className="hidden"
        onChange={openFileHandler}
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
