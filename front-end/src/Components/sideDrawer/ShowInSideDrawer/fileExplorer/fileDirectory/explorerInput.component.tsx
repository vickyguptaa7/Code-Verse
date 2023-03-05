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
  const [isFileNameExistAlready, setIsFileNameExistAlready] = useState(false);
  const dispatch = useAppDispatch();
  const directories = useAppSelector(
    (state) => state.fileDirectory.directories
  );
  const { isFileOrFolderAlreadyExists } = useDirectory();

  const inputChangeHandler = () => {
    setfileName(inputRef.current?.value!);
    setIsFileNameExistAlready(false);
  };

  const inputBlurHandler = () => {
    if (!fileName.trim().length || fileName === directoryInfo.name) {
      setfileName(directoryInfo.name);
      setIsInputInFocus(false);
      setIsFileNameExistAlready(false);
      inputRef.current?.setAttribute("disabled", "");
      return;
    }
    // check if the file with same name does'nt exist already and filename not empty
    if (
      isFileOrFolderAlreadyExists(directories, directoryInfo.parentId, fileName)
    ) {
      setIsFileNameExistAlready(true);
      return;
    }
    dispatch(
      renameFileOrFolderOfDirectory({ id: directoryInfo.id, name: fileName })
    );
    setIsInputInFocus(false);
    setIsFileNameExistAlready(false);
    inputRef.current?.setAttribute("disabled", "");
  };

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (fileName === directoryInfo.name) {
        inputRef.current?.blur();
        return;
      }
      // check if the file with same name does'nt exist already and filename not empty
      if (
        isFileOrFolderAlreadyExists(
          directories,
          directoryInfo.parentId,
          fileName
        ) ||
        !fileName.trim().length
      ) {
        setIsFileNameExistAlready(true);
        return;
      }
      dispatch(
        renameFileOrFolderOfDirectory({
          id: directoryInfo.id,
          name: fileName,
        })
      );
      inputRef.current?.blur();
      setIsInputInFocus(false);
      setIsFileNameExistAlready(false);
    }
    // if()
  };
  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        className={twMerge(
          "w-full overflow-clip p-[2px] bg-transparent outline-none select-none border border-transparent selection:bg-transparent",
          !isInputInFocus
            ? "cursor-pointer"
            : "  border-red-900 selection:bg-[color:var(--accent-color)]",
          isFileNameExistAlready && "border-red-600"
        )}
        disabled
        onKeyDown={onKeyDownHandler}
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
        value={fileName}
      />
      {isFileNameExistAlready && (
        <div
          className="absolute z-20 w-full p-1 break-words whitespace-normal bg-red-900 border-b border-red-600 z-100 border-x"
        >
          {fileName.trim().length ? (
            <h3>
              A file or folder <span className="font-bold">{fileName}</span>{" "}
              already exists at this location. Please choose a different name.
            </h3>
          ) : (
            <h3>A file or folder name must be provided.</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default ExplorerInput;
