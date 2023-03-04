import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import useDirectory from "../../../../../hooks/useDirectory.hook";
import directory from "../../../../../Interface/directory.interface";
import { renameFileOrFolderOfDirectory } from "../../../../../Store/reducres/File/FileDirectory.reducer";
import { useAppDispatch, useAppSelector } from "../../../../../Store/store";

interface IPROPS {
  directoryInfo: directory;
  isInputInFocus: boolean;
  setIsInputInFocus: Function;
  inputRef: React.RefObject<HTMLInputElement>;
}

const ExplorerInput: React.FC<IPROPS> = ({
  directoryInfo,
  isInputInFocus,
  setIsInputInFocus,
  inputRef,
}) => {
  const [fileName, setfileName] = useState(directoryInfo.name);
  const dispatch = useAppDispatch();
  const directories = useAppSelector(
    (state) => state.fileDirectory.directories
  );
  const { isFileOrFolderAlreadyExists } = useDirectory();

  const inputChangeHandler = () => {
    setfileName(inputRef.current?.value!);
  };

  const inputBlurHandler = () => {
    if (!fileName.trim().length || fileName === directoryInfo.name) {
      setfileName(directoryInfo.name);
      setIsInputInFocus(false);
      inputRef.current?.setAttribute("disabled", "");
      return;
    }
    // check if the file with same name does'nt exist already and filename not empty
    if (
      !isFileOrFolderAlreadyExists(
        directories,
        directoryInfo.parentId,
        fileName
      )
    ) {
      dispatch(
        renameFileOrFolderOfDirectory({ id: directoryInfo.id, name: fileName })
      );
      setIsInputInFocus(false);
      inputRef.current?.setAttribute("disabled", "");
    }
  };

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (fileName === directoryInfo.name) {
        inputRef.current?.blur();
        return;
      }
      // check if the file with same name does'nt exist already and filename not empty
      if (
        !isFileOrFolderAlreadyExists(
          directories,
          directoryInfo.parentId,
          fileName
        ) &&
        fileName.trim().length
      ) {
        dispatch(
          renameFileOrFolderOfDirectory({
            id: directoryInfo.id,
            name: fileName,
          })
        );
        inputRef.current?.blur();
      }
    }
  };

  return (
    <input
      ref={inputRef}
      className={twMerge(
        "w-full overflow-clip p-[2px] bg-transparent outline-none select-none border border-transparent selection:bg-transparent",
        !isInputInFocus
          ? "cursor-pointer"
          : "  border-[color:var(--highlight-text-color)] selection:bg-[color:var(--accent-color)]"
      )}
      disabled
      onKeyDown={onKeyDownHandler}
      onChange={inputChangeHandler}
      onBlur={inputBlurHandler}
      value={fileName}
    />
  );
};

export default ExplorerInput;
