import React from "react";
import { VscClose, VscEdit, VscNewFile, VscNewFolder } from "react-icons/vsc";

interface IPROPS {
  inputRef: React.RefObject<HTMLInputElement>;
  isInputInFocus: boolean;
  setIsInputInFocus: Function;
  setIsVisibleChildren?: (val: boolean) => void;
  setAddFileOrFolder?: (val: "file" | "folder") => void;
  from: "file" | "folder" | "root";
}

const ExplorerButtons: React.FC<IPROPS> = ({
  inputRef,
  isInputInFocus,
  setIsInputInFocus,
  setIsVisibleChildren,
  setAddFileOrFolder,
  from,
}) => {
  const renameHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsInputInFocus(true);
    if (inputRef.current?.hasAttribute("disabled"))
      inputRef.current?.removeAttribute("disabled");
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    console.log("rename Folder");
  };
  const deleteHandler = (event: React.MouseEvent) => {
    event.stopPropagation();

    console.log("delete Folder");
  };

  if (from === "file") {
    return (
      <div className="flex items-center justify-center invisible group-hover:visible text-[color:var(--primary-text-color)]">
        <button
          title="Rename"
          onClick={renameHandler}
          className="rounded-lg hover:text-[color:var(--highlight-text-color)] p-1"
        >
          <VscEdit className="text-[14px]" />
        </button>
        <button
          title="Delete"
          onClick={deleteHandler}
          className="rounded-lg hover:text-[color:var(--highlight-text-color)] p-1"
        >
          <VscClose className="text-[15px]" />
        </button>
      </div>
    );
  }

  const addFolderHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (setIsVisibleChildren) setIsVisibleChildren(true);
    console.log("add Folder");
    if (setAddFileOrFolder) setAddFileOrFolder("folder");
  };
  const addFileHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (setIsVisibleChildren) setIsVisibleChildren(true);
    console.log("add File");
    if (setAddFileOrFolder) setAddFileOrFolder("file");
  };

  if (from === "root") {
    return (
      <div className="flex invisible gap-1 group-hover:visible">
        <button
          title="New File"
          onClick={addFileHandler}
          className="rounded-lg hover:bg-[color:var(--hover-text-color)] p-1"
        >
          <VscNewFile className="text-[16px]" />
        </button>
        <button
          title="New Folder"
          onClick={addFolderHandler}
          className="rounded-lg hover:bg-[color:var(--hover-text-color)] p-1"
        >
          <VscNewFolder className="text-[16px]" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center invisible group-hover:visible text-[color:var(--primary-text-color)]">
      <button
        title="New File"
        onClick={addFileHandler}
        className="rounded-lg hover:text-[color:var(--highlight-text-color)] p-1"
      >
        <VscNewFile className="text-[15px]" />
      </button>
      <button
        title="New Folder"
        onClick={addFolderHandler}
        className="rounded-lg hover:text-[color:var(--highlight-text-color)] p-1"
      >
        <VscNewFolder className="text-[15px]" />
      </button>
      <button
        title="Rename"
        onClick={renameHandler}
        className="rounded-lg hover:text-[color:var(--highlight-text-color)] p-1"
      >
        <VscEdit className="text-[14px]" />
      </button>
      <button
        title="Delete"
        onClick={deleteHandler}
        className="rounded-lg hover:text-[color:var(--highlight-text-color)] p-1"
      >
        <VscClose className="text-[15px]" />
      </button>
    </div>
  );
};

export default ExplorerButtons;