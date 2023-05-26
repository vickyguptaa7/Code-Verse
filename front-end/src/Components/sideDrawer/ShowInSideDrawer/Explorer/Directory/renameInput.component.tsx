import React, { useEffect, useState } from "react";
import IDirectory from "../../../../../@types/directory.d";
import { renameFileOrFolderOfDirectory } from "../../../../../Store/reducres/SideDrawer/Directory/Directory.reducer";
import { useAppDispatch, useAppSelector } from "../../../../../Store/store";
import useDirectory from "../../../../../hooks/useDirectory.hook";
import { mergeClass } from "../../../../../library/tailwindMerge/tailwindMerge.lib";
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
  const directories = useAppSelector((state) => state.Directory.directories);

  const { isFileOrFolderAlreadyExists } = useDirectory();

  useEffect(() => {
    // On initial render the text will be selected and focused
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(0, directoryInfo.name.length);
  }, [directoryInfo, inputRef]);

  const infoOfCurrentWorkingFileOrFolder = useAppSelector(
    (state) => state.Directory.infoOfCurrentWorkingFileOrFolder
  );

  // avoid user to rename two file or folder simultaneously
  useEffect(() => {
    if (!infoOfCurrentWorkingFileOrFolder.isActive) return;
    if (
      infoOfCurrentWorkingFileOrFolder.operation !== "rename" ||
      infoOfCurrentWorkingFileOrFolder.id !== id
    ) {
      // user tries to add another file or folder so we need to remove the previous one
      // collision in file or folder renaming
      setIsInputInFocus(false);
    }
  }, [infoOfCurrentWorkingFileOrFolder, setIsInputInFocus, id]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfileName(event.target.value);
    setIsFileNameExistAlready(false);
  };

  // when input get out of focus then we have to do following things
  // 1. check if the file name entered by the user is unique  if not then show the warning
  // 2. if the file name is unique then rename the file or folder
  const inputBlurHandler = () => {
    if (!fileName.trim().length || fileName === directoryInfo.name) {
      setfileName(directoryInfo.name);
      setIsInputInFocus(false);
      setIsFileNameExistAlready(false);
      return;
    }
    // check if the file with same name does'nt exist already and filename not empty
    if (
      isFileOrFolderAlreadyExists(
        directories,
        directoryInfo.path.split("/"),
        fileName,
        true
      )
    ) {
      setIsFileNameExistAlready(true);
      return;
    }
    dispatch(
      renameFileOrFolderOfDirectory({
        id: directoryInfo.id,
        name: fileName,
        isFolder: directoryInfo.isFolder,
        path: directoryInfo.path.split("/"),
      })
    );
    setIsInputInFocus(false);
    setIsFileNameExistAlready(false);
  };

  // when user press enter then we have to do following things
  // 1. check if the file name entered by the user is unique  if not then show the warning
  // 2. if the file name is unique then rename the file or folder
  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (fileName === directoryInfo.name) {
        setIsInputInFocus(false);
        return;
      }
      // check if the file with same name does'nt exist already and filename not empty
      if (
        !fileName.trim().length ||
        isFileOrFolderAlreadyExists(
          directories,
          directoryInfo.path.split("/"),
          fileName,
          true
        )
      ) {
        setIsFileNameExistAlready(true);
        return;
      }
      dispatch(
        renameFileOrFolderOfDirectory({
          id: directoryInfo.id,
          name: fileName,
          isFolder: directoryInfo.isFolder,
          path: directoryInfo.path.split("/"),
        })
      );
      setIsInputInFocus(false);
      setIsFileNameExistAlready(false);
    }
  };

  return (
    <div className="relative w-full mr-1">
      <Input
        inputRef={inputRef}
        className={mergeClass([
          "w-full overflow-clip p-[2px] bg-transparent outline-none select-none border  border-[color:var(--primary-color)] selection:bg-[color:var(--accent-color)] ",
          isFileNameExistAlready && "border-red-600",
        ])}
        onKeyDown={onKeyDownHandler}
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
        value={fileName}
      />
      {isFileNameExistAlready ? (
        <div className="absolute z-20 w-full p-1 break-words whitespace-normal bg-red-600 border-b border-red-600 z-100 border-x">
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
