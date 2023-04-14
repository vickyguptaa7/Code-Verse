import React from "react";
import {
  VscFolderOpened,
  VscGitMerge,
  VscGoToFile,
  VscLightbulb,
  VscNewFile,
  VscStarEmpty,
} from "react-icons/vsc";
import { IoSchoolOutline } from "react-icons/io5";
import Button from "../../UI/Button.component";
import { useAppDispatch } from "../../../Store/store";
import {
  setIsDrawerOpen,
  setShowInSideDrawer,
} from "../../../Store/reducres/SideDrawer/SideDrawer.reducer";

const VSCODE_BASIC_URL =
  "https://code.visualstudio.com/docs/introvideos/basics";
const VSCODE_TIPS_AND_TRICKS_URL =
  "https://code.visualstudio.com/docs/getstarted/tips-and-tricks#vscode";

interface IPROPS {
  height: number;
}

const Welcome: React.FC<IPROPS> = ({ height }) => {
  return (
    <div className="overflow-scroll">
      <div
        className="text-[color:var(--highlight-text-color)] w-4/5 mx-auto py-12 px-3 min-w-[16rem] flex flex-col"
        style={{ height: height }}
      >
        <div className="">
          <h1 className="text-4xl text-[color:var(--highlight-text-color)]">
            Visual Studio Code
          </h1>
          <h3 className="text-xl text-[color:var(--primary-text-color)] mt-2">
            Editing evolved
          </h3>
        </div>
        <div className="flex justify-between text-[color:var(--highlight-text-color)] flex-wrap">
          <StartsAndRecent />
          <Walkthroughs />
        </div>
      </div>
    </div>
  );
};

function StartsAndRecent() {
  const dispatch = useAppDispatch();
  const newFileHandler = () => {
    dispatch(setIsDrawerOpen(true));
    dispatch(setShowInSideDrawer("file"));
  };
  const openRepositoryHandler = () => {
    dispatch(setIsDrawerOpen(true));
    dispatch(setShowInSideDrawer("git"));
  };
  return (
    <div className="flex flex-col gap-3 mt-8">
      <h4 className="text-lg">Start</h4>
      <div className="flex flex-col gap-2 ">
        <Button
          className="flex text-sm text-[color:var(--accent-color)]"
          onClick={newFileHandler}
        >
          <VscNewFile className="text-lg" />
          &nbsp;New File...
        </Button>
        <OpenFileFolderButtons />
        <Button
          className="flex text-sm text-[color:var(--accent-color)]"
          onClick={openRepositoryHandler}
        >
          <VscGitMerge className="text-lg" />
          &nbsp;Open Repository...
        </Button>
      </div>
      <h4 className="mt-4 text-lg">Recent</h4>
      <div className="flex flex-col gap-1 text-xs">
        <p>You have no recent folders,</p>
        <p>
          <label htmlFor="folder" title="Open local folders">
            <span className="text-[color:var(--accent-color)] cursor-pointer">
              open a folder
            </span>{" "}
          </label>
          to start
        </p>
      </div>
    </div>
  );
}

function OpenFileFolderButtons() {
  return (
    <>
      <label htmlFor="file" title="Open local files">
        <div className="flex text-sm text-[color:var(--accent-color)] cursor-pointer">
          <VscGoToFile className="text-lg" />
          &nbsp;Open Files...
        </div>
      </label>
      <label htmlFor="folder" title="Open local folders">
        <div className="flex text-sm text-[color:var(--accent-color)] cursor-pointer">
          <VscFolderOpened className="text-lg" />
          &nbsp;Open Folder...
        </div>
      </label>
    </>
  );
}

function Walkthroughs() {
  const basicIntroHandler = () => {
    window.open(VSCODE_BASIC_URL, "_blank");
  };
  const tipsAndTricksHandler = () => {
    window.open(VSCODE_TIPS_AND_TRICKS_URL, "_blank");
  };
  return (
    <div className="flex flex-col gap-3 my-8">
      <h4 className="text-lg">Walkthroughs</h4>
      <div className="flex flex-col gap-5">
        <Button
          className="bg-[color:var(--hover-text-color)] px-8 py-4 rounded-md relative border-b-[5px] border-[color:var(--accent-color)] overflow-hidden"
          onClick={basicIntroHandler}
        >
          <div className="absolute top-0 left-0 w-0 h-0 border-[color:var(--accent-color)] border-b-[36px] border-l-[36px] border-r-8 border-r-transparent border-b-transparent "></div>
          <VscStarEmpty className="absolute left-[3px] text-sm top-[3px]" />
          <h5 className="text-left">Get Started with VS Code</h5>
          <p className="mt-1 text-sm text-left">
            Discover the best customization to make VS Code yours.
          </p>
        </Button>
        <Button
          className="bg-[color:var(--hover-text-color)]  px-3 py-2 rounded-md relative "
          onClick={basicIntroHandler}
        >
          <h5 className="flex items-center justify-start">
            <span>
              <VscLightbulb className="text-[color:var(--accent-color)] text-xl mr-1" />
            </span>
            Learn the Fundamentals
          </h5>
        </Button>
        <Button
          className="bg-[color:var(--hover-text-color)]  px-3 py-2 rounded-md relative "
          onClick={tipsAndTricksHandler}
        >
          <h5 className="flex items-center justify-start">
            <span>
              <IoSchoolOutline className="text-[color:var(--accent-color)] text-xl mr-1" />
            </span>
            Boost your Productivity
          </h5>
        </Button>
      </div>
    </div>
  );
}

export default Welcome;
