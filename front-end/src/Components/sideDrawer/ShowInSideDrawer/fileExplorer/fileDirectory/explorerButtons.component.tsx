import React from "react";
import { VscClose, VscEdit, VscNewFile, VscNewFolder } from "react-icons/vsc";
import { deleteFileOrFolderOfDirectory } from "../../../../../Store/reducres/File/FileDirectory.reducer";
import { useAppDispatch } from "../../../../../Store/store";

interface IPROPS {
  inputRef: React.RefObject<HTMLInputElement>;
  id?: string;
  isInputInFocus: boolean;
  setIsInputInFocus: Function;
  setIsVisibleChildren?: (val: boolean) => void;
  setIsFileOrFolder?: (val: "file" | "folder") => void;
  isFileOrFolder?: "file" | "folder" | "none";
  timerId?: { isTimer: boolean; id: ReturnType<typeof setTimeout> | null };
  setTimerId?: (value: {
    isTimer: boolean;
    id: ReturnType<typeof setTimeout> | null;
  }) => void;
  from: "file" | "folder" | "root";
  childRef?: React.RefObject<HTMLInputElement>;
}

const ExplorerButtons: React.FC<IPROPS> = ({
  inputRef,
  id,
  isInputInFocus,
  setIsInputInFocus,
  setIsVisibleChildren,
  setIsFileOrFolder,
  isFileOrFolder,
  timerId,
  childRef,
  setTimerId,
  from,
}) => {
  const dispatch = useAppDispatch();
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
    if (id && id.trim().length) dispatch(deleteFileOrFolderOfDirectory({ id }));
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

    // folder to expand
    if (setIsVisibleChildren) setIsVisibleChildren(true);

    if (setIsFileOrFolder) {
      if (timerId?.isTimer) {
        clearTimeout(timerId.id!);
        if (setTimerId) setTimerId({ isTimer: false, id: null });
      }
      childRef?.current?.focus();
      console.log("add Folder");
      setIsFileOrFolder("folder");
    }
  };

  const addFileHandler = (event: React.MouseEvent) => {
    event.stopPropagation();

    // folder to expand
    if (setIsVisibleChildren) setIsVisibleChildren(true);
    if (setIsFileOrFolder) {
      if (timerId?.isTimer) {
        clearTimeout(timerId.id!);
        if (setTimerId) setTimerId({ isTimer: false, id: null });
      }
      childRef?.current?.focus();
      console.log("add File");
      setIsFileOrFolder("file");
    }
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
