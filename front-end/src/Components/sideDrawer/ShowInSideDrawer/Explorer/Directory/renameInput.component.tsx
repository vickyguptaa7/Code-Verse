import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import useDirectory from "../../../../../hooks/useDirectory.hook";
import IDirectory from "../../../../../Interface/directory.interface";
import { renameFileOrFolderOfDirectory } from "../../../../../Store/reducres/File/FileDirectory.reducer";
import { useAppDispatch, useAppSelector } from "../../../../../Store/store";
import Input from "../../../../UI/Input.component";

interface IPROPS {
  id: string;
  directoryInfo: IDirectory;
  isInputInFocus: boolean;
  setIsInputInFocus: Function;
  inputRef: React.RefObject<HTMLInputElement>;
}

const RenameInput: React.FC<IPROPS> = ({
  directoryInfo,
  isInputInFocus,
  setIsInputInFocus,
  inputRef,
  id,
}) => {
  const [fileName, setfileName] = useState(directoryInfo.name);
  const [isFileNameExistAlready, setIsFileNameExistAlready] = useState(false);
  const dispatch = useAppDispatch();
  const directories = useAppSelector(
    (state) => state.fileDirectory.directories
  );
  const { isFileOrFolderAlreadyExists } = useDirectory();

  useEffect(() => {
    // On initial render the text will be selected and focused
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(0, directoryInfo.name.length);
  }, [directoryInfo, inputRef]);

  const currentWorkingFileOrFolder = useAppSelector(
    (state) => state.fileDirectory.currentWorkingFileOrFolder
  );

  useEffect(() => {
    if (!currentWorkingFileOrFolder.isActive) return;
    if (
      currentWorkingFileOrFolder.operation !== "rename" ||
      currentWorkingFileOrFolder.id !== id
    ) {
      // user tries to add another file or folder so we need to remove the previous one
      console.log("rename collision");
      setIsInputInFocus(false);
    }
  }, [currentWorkingFileOrFolder, setIsInputInFocus, id]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfileName(event.target.value);
    setIsFileNameExistAlready(false);
  };

  const inputBlurHandler = () => {
    if (!fileName.trim().length || fileName === directoryInfo.name) {
      setfileName(directoryInfo.name);
      setIsInputInFocus(false);
      setIsFileNameExistAlready(false);
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
      renameFileOrFolderOfDirectory({
        id: directoryInfo.id,
        name: fileName,
        isFolder: directoryInfo.isFolder,
      })
    );
    setIsInputInFocus(false);
    setIsFileNameExistAlready(false);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (fileName === directoryInfo.name) {
        setIsInputInFocus(false);
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
          isFolder:directoryInfo.isFolder
        })
      );
      setIsInputInFocus(false);
      setIsFileNameExistAlready(false);
    }
  };

  return (
    <div className="relative w-full">
      <Input
        inputRef={inputRef}
        className={twMerge(
          "w-full overflow-clip p-[2px] bg-transparent outline-none select-none border border-transparent border-red-900 selection:bg-[color:var(--accent-color)]",
          isFileNameExistAlready && "border-red-600"
        )}
        onKeyDown={onKeyDownHandler}
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
        value={fileName}
      />
      {isFileNameExistAlready ? (
        <div className="absolute z-20 w-full p-1 break-words whitespace-normal bg-red-900 border-b border-red-600 z-100 border-x">
          {fileName.trim().length ? (
            <h3>
              A file or folder <span className="font-bold">{fileName}</span>{" "}
              already exists at this location. Please choose a different name.
            </h3>
          ) : (
            <h3>A file or folder name must be provided.</h3>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default RenameInput;
