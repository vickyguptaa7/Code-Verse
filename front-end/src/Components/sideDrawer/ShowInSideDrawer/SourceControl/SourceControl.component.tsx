import React from "react";
import Button from "../../../UI/Button.component";
import CollapsibleMenu from "../../../UI/CollapsibleMenu.component";
const EDITOR_MIN_HEIGHT = 480;
const SourceControl = () => {
  const height = Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) - 90;
  
  // TODO : Add local files
  const openFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
      ? e.target.files[0]
      : new File(["Something went wrong while opening the file"], "error.text");
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      console.log(reader.result);
    };
    reader.onerror = () => {
      console.log("file error", reader.error);
    };
  };
  
  return (
    <div className="flex flex-col">
      <CollapsibleMenu menuName="SOURCE CONTROL" initialState={true}>
        <div
          className="flex flex-col justify-start overflow-y-scroll gap-6 break-words whitespace-normal px-4 py-4 text-[color:var(--highlight-text)] max-w-2xl"
          style={{ height: height }}
        >
          <label htmlFor="file" title="Add local files">
            <div className="bg-[color:var(--accent-color)] w-full py-1.5 px-2 hover:scale-105 duration-300 flex justify-center items-center max-w-xs">
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
          <div className="flex flex-col gap-4 text-[0.85rem] ">
            <p>
              In order to use git features, you can open a folder containing a
              git repository or clone from a URL.
            </p>
          </div>
          <Button
            className="bg-[color:var(--accent-color)] w-full py-1.5 px-2 hover:scale-105 duration-300 max-w-xs"
            onClick={() => {}}
            title="comming soon..."
          >
            Open Folder
          </Button>
          <Button
            className="bg-[color:var(--accent-color)] w-full py-1.5 px-2 hover:scale-105 duration-300 max-w-xs"
            onClick={() => {}}
            title="comming soon..."
          >
            Clone Repository
          </Button>
          <div className="flex flex-col gap-4 text-[0.85rem] ">
            <p>
              To learn more about how to use git and source control is code{" "}
              <span className="text-[color:var(--accent-color)]">
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
