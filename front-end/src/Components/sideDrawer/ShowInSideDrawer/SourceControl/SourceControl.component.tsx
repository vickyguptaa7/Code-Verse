import React from "react";
import Button from "../../../UI/Button.component";
import CollapsibleMenu from "../../../UI/CollapsibleMenu.component";
const EDITOR_MIN_HEIGHT = 480;
const VSCODE_INTRO_TO_GIT_URL =
  "https://code.visualstudio.com/docs/sourcecontrol/intro-to-git";
  
const SourceControl = () => {
  const height = Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) - 100;
  const readDocsHandler = () => {
    window.open(VSCODE_INTRO_TO_GIT_URL, "_blank");
  };
  return (
    <div className="flex flex-col">
      <CollapsibleMenu menuName="SOURCE CONTROL" initialState={true}>
        <div
          className="flex flex-col justify-start overflow-y-auto gap-6 break-words whitespace-normal px-4 py-4 text-[color:var(--highlight-text)]"
          style={{ height: height }}
        >
          <Button
            className="bg-[color:var(--accent-color)] w-full py-1.5 px-2 hover:scale-105 duration-300 max-w-xs text-white"
            onClick={() => window.open("http://github.com/", "_blank")}
            title="comming soon..."
          >
            Open Folder
          </Button>
          <div className="flex flex-col gap-4 text-[0.85rem] ">
            <p>
              In order to use git features, you can open a folder containing a
              git repository or clone from a URL.
            </p>
          </div>
          <Button
            className="bg-[color:var(--accent-color)] w-full py-1.5 px-2 hover:scale-105 duration-300 max-w-xs text-white"
            onClick={() => window.open("http://github.com/", "_blank")}
            title="comming soon..."
          >
            Clone Repository
          </Button>
          <div className="flex flex-col gap-4 text-[0.85rem] ">
            <p>
              To learn more about how to use git and source control is code{" "}
              <span
                className="text-[color:var(--accent-color)] cursor-pointer"
                onClick={readDocsHandler}
              >
                read our docs
              </span>
              .
            </p>
          </div>
        </div>
      </CollapsibleMenu>
    </div>
  );
};

export default SourceControl;
