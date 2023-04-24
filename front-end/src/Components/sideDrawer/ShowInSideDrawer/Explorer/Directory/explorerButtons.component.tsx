import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { VscClose, VscEdit, VscNewFile, VscNewFolder } from "react-icons/vsc";
import {
  deleteFileOrFolderOfDirectory,
  setInfoOfCurrentWorkingFileOrFolder,
} from "../../../../../Store/reducres/SideDrawer/Directory/Directory.reducer";
import { useAppDispatch, useAppSelector } from "../../../../../Store/store";
import Backdrop from "../../../../UI/Backdrop.component";
import Button from "../../../../UI/Button.component";
import Warning from "../../../../UI/warning.component";

interface IPROPS {
  id?: string;
  name?: string;
  path: Array<string>;
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
  name,
  path,
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
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isDeleteWarningEnable = useAppSelector(
    (state) => state.sideDrawer.isDeleteWarningEnable
  );

  // rename handler for the file or folder
  const renameHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsInputInFocus(true);
    // set the current working file or folder info to the store to avoid the parallel renaming of the file or folder
    dispatch(
      setInfoOfCurrentWorkingFileOrFolder({
        isActive: true,
        id: id!,
        operation: "rename",
      })
    );
  };

  // close the delete warning dialog box
  const closeDeleteWarningHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setIsDeleteWarningOpen(false);
  };

  // delete the file or folder
  const deleteFileOrFolder = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (id && id.trim().length)
      dispatch(deleteFileOrFolderOfDirectory({ id, path }));
  };

  // delete handler for wheter to show the delete warning dialog box or delete the file or folder
  const deleteHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isDeleteWarningEnable) {
      setIsDeleteWarningOpen(true);
      return;
    }
    deleteFileOrFolder(event);
  };

  // add folder to folder or the root
  function addFolderHandler(event: React.MouseEvent) {
    event.stopPropagation();

    // folder to expand if the folder is closed
    if (setIsFolderOpen) setIsFolderOpen(true);

    if (setIsFileOrFolder) {
      if (newFileOrFolderDummyTimerId?.isTimer) {
        clearTimeout(newFileOrFolderDummyTimerId.id!);
        if (setNewFileOrFolderDummyTimerId)
          setNewFileOrFolderDummyTimerId({ isTimer: false, id: null });
      }
      childRef?.current?.focus();
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

    // folder to expand
    if (setIsFolderOpen) setIsFolderOpen(true);
    if (setIsFileOrFolder) {
      if (newFileOrFolderDummyTimerId?.isTimer) {
        clearTimeout(newFileOrFolderDummyTimerId.id!);
        if (setNewFileOrFolderDummyTimerId)
          setNewFileOrFolderDummyTimerId({ isTimer: false, id: null });
      }
      childRef?.current?.focus();
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
    <>
      <AnimatePresence>
        {isDeleteWarningOpen ? (
          <>
            <Backdrop
              className="bg-opacity-30"
              onClick={closeDeleteWarningHandler}
            />
            <Warning
              name={name!}
              onCancel={closeDeleteWarningHandler}
              onDelete={deleteFileOrFolder}
            />
          </>
        ) : null}
      </AnimatePresence>
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
    </>
  );
};

export default ExplorerButtons;
