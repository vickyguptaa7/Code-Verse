import React from "react";
import { VscClose, VscEdit, VscNewFile, VscNewFolder } from "react-icons/vsc";
import {
  deleteFileOrFolderOfDirectory,
  setInfoOfCurrentWorkingFileOrFolder,
} from "../../../../../Store/reducres/Directory/Directory.reducer";
import { useAppDispatch } from "../../../../../Store/store";
import Button from "../../../../UI/Button.component";

interface IPROPS {
  id?: string;
  isInputInFocus: boolean;
  setIsInputInFocus: Function;
  setIsFolderOpen?: (val: boolean) => void;
  setIsFileOrFolder?: (val: "file" | "folder") => void;
  isFileOrFolder?: "file" | "folder" | "none";
  newFileOrFolderDummyTimerId?: {
    isTimer: boolean;
    id: ReturnType<typeof setTimeout> | null;
  };
  setNewFileOrFolderDummyTimerId?: (value: {
    isTimer: boolean;
    id: ReturnType<typeof setTimeout> | null;
  }) => void;
  from: "file" | "folder" | "root";
  childRef?: React.RefObject<HTMLInputElement>;
}

const ExplorerButtons: React.FC<IPROPS> = ({
  id,
  isInputInFocus,
  setIsInputInFocus,
  setIsFolderOpen,
  setIsFileOrFolder,
  isFileOrFolder,
  newFileOrFolderDummyTimerId,
  childRef,
  setNewFileOrFolderDummyTimerId,
  from,
}) => {
  const dispatch = useAppDispatch();

  const renameHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsInputInFocus(true);
    dispatch(
      setInfoOfCurrentWorkingFileOrFolder({
        isActive: true,
        id: id!,
        operation: "rename",
      })
    );
    console.log("rename");
  };

  const deleteHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (id && id.trim().length) dispatch(deleteFileOrFolderOfDirectory({ id }));
  };

  function addFolderHandler(event: React.MouseEvent) {
    event.stopPropagation();

    // folder to expand
    if (setIsFolderOpen) setIsFolderOpen(true);

    if (setIsFileOrFolder) {
      if (newFileOrFolderDummyTimerId?.isTimer) {
        clearTimeout(newFileOrFolderDummyTimerId.id!);
        if (setNewFileOrFolderDummyTimerId)
          setNewFileOrFolderDummyTimerId({ isTimer: false, id: null });
      }
      childRef?.current?.focus();
      console.log("add Folder");
      setIsFileOrFolder("folder");
      dispatch(
        setInfoOfCurrentWorkingFileOrFolder({
          isActive: true,
          id: id!,
          operation: "add",
        })
      );
    }
  }

  function addFileHandler(event: React.MouseEvent) {
    event.stopPropagation();
    console.log("file handler");

    // folder to expand
    if (setIsFolderOpen) setIsFolderOpen(true);
    if (setIsFileOrFolder) {
      if (newFileOrFolderDummyTimerId?.isTimer) {
        clearTimeout(newFileOrFolderDummyTimerId.id!);
        if (setNewFileOrFolderDummyTimerId)
          setNewFileOrFolderDummyTimerId({ isTimer: false, id: null });
      }
      childRef?.current?.focus();
      console.log("add File");
      setIsFileOrFolder("file");
      dispatch(
        setInfoOfCurrentWorkingFileOrFolder({
          isActive: true,
          id: id!,
          operation: "add",
        })
      );
    }
  }

  if (from === "root") {
    return (
      <div className="flex invisible gap-1 group-hover:visible">
        <Button
          title="New File"
          onClick={addFileHandler}
          className="rounded-lg hover:bg-[color:var(--hover-text-color)] p-1"
        >
          <VscNewFile className="text-[16px]" />
        </Button>
        <Button
          title="New Folder"
          onClick={addFolderHandler}
          className="rounded-lg hover:bg-[color:var(--hover-text-color)] p-1"
        >
          <VscNewFolder className="text-[16px]" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center invisible group-hover:visible text-[color:var(--primary-text-color)]">
      {from === "folder" ? (
        <>
          <Button
            title="New File"
            onClick={addFileHandler}
            className="rounded-lg hover:text-[color:var(--highlight-text-color)] p-1"
          >
            <VscNewFile className="text-[15px]" />
          </Button>
          <Button
            title="New Folder"
            onClick={addFolderHandler}
            className="rounded-lg hover:text-[color:var(--highlight-text-color)] p-1"
          >
            <VscNewFolder className="text-[15px]" />
          </Button>
        </>
      ) : null}
      <Button
        title="Rename"
        onClick={renameHandler}
        className="rounded-lg hover:text-[color:var(--highlight-text-color)] p-1"
      >
        <VscEdit className="text-[14px]" />
      </Button>
      <Button
        title="Delete"
        onClick={deleteHandler}
        className="rounded-lg hover:text-[color:var(--highlight-text-color)] p-1"
      >
        <VscClose className="text-[15px]" />
      </Button>
    </div>
  );
};

export default ExplorerButtons;
