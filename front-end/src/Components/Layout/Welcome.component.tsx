import React from "react";
import {
  VscFolderOpened,
  VscGitMerge,
  VscGoToFile,
  VscNewFile,
} from "react-icons/vsc";
import Button from "../UI/Button.component";

interface IPROPS {
  height: number;
}

const Welcome: React.FC<IPROPS> = ({ height }) => {
  return (
    <div className="overflow-scroll">
      <div
        className="text-[color:var(--highlight-text-color)] w-4/5 mx-auto py-12 px-3 min-w-[16rem] gap-12 flex flex-col"
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
        <div className="flex justify-between text-[color:var(--highlight-text-color)] flex-wrap gap-8">
          <div className="flex flex-col gap-3">
            <h4 className="text-lg">Start</h4>
            <div className="flex flex-col gap-2 ">
              <Button className="flex text-sm text-[color:var(--accent-color)]">
                <VscNewFile className="text-lg" />
                &nbsp;New File...
              </Button>
              <Button className="flex text-sm text-[color:var(--accent-color)]">
                <VscGoToFile className="text-lg" />
                &nbsp;Open File...
              </Button>
              <Button className="flex text-sm text-[color:var(--accent-color)]">
                <VscFolderOpened className="text-lg" />
                &nbsp;Open Folder...
              </Button>
              <Button className="flex text-sm text-[color:var(--accent-color)]">
                <VscGitMerge className="text-lg" />
                &nbsp;Open Repository...
              </Button>
            </div>
            <h4 className="mt-4 text-lg">Recent</h4>
            <div className="flex flex-col gap-1 text-xs">
              <p>You have no recent folders,</p>
              <p>
                <span className="text-[color:var(--accent-color)]">
                  open a folder
                </span>{" "}
                to start
              </p>
            </div>
          </div>

          <div className="">
            <h4 className="text-lg">Walkthroughs</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
