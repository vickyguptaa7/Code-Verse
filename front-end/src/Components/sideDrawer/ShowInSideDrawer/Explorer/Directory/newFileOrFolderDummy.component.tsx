import { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";
import { VscChevronRight, VscFile } from "react-icons/vsc";
import { addFileToNavigation } from "../../../../../Store/reducres/Navigation/FileNavigation.reducer";
import { addFileOrFolderToDirectory } from "../../../../../Store/reducres/SideDrawer/Directory/Directory.reducer";
import { useAppDispatch, useAppSelector } from "../../../../../Store/store";
import useDirectory from "../../../../../hooks/useDirectory.hook";
import { mergeClass } from "../../../../../library/tailwindMerge/tailwindMerge.lib";
import { uniqueIdGenerator } from "../../../../../library/uuid/uuid.lib";
import { scrollToTarget } from "../../../../../utils/scrollToTargetId.util";
import Input from "../../../../UI/Input.component";

interface IPROPS {
  isFileOrFolder: "file" | "folder" | "none";
  setIsFileOrFolder: Function;
  path: Array<string>;
  parentId: string;
  setNewFileOrFolderDummyTimerId?: (val: {
    isTimer: boolean;
    id: ReturnType<typeof setTimeout>;
  }) => void;
  childRef: React.RefObject<HTMLInputElement>;
}

const NewFileOrFolderDummy: React.FC<IPROPS> = ({
  isFileOrFolder,
  setIsFileOrFolder,
  path,
  parentId,
  setNewFileOrFolderDummyTimerId,
  childRef,
}) => {
  const [childName, setChildName] = useState("");
  const [isExistAlready, setIsExistAlready] = useState(false);
  const dispatch = useAppDispatch();
  const directories = useAppSelector((state) => state.Directory.directories);
  const infoOfCurrentWorkingFileOrFolder = useAppSelector(
    (state) => state.Directory.infoOfCurrentWorkingFileOrFolder
  );

  // if user tries to add file or folder again then we need to remove the previous one
  useEffect(() => {
    if (!infoOfCurrentWorkingFileOrFolder.isActive) return;
    if (
      infoOfCurrentWorkingFileOrFolder.operation !== "add" ||
      infoOfCurrentWorkingFileOrFolder.id !== parentId
    ) {
      // collision so we set the isFileOrFolder to none
      // more than one file or folder is not allowed to add  at same time in multiple destination
      setIsFileOrFolder("none");
    }
  }, [infoOfCurrentWorkingFileOrFolder, parentId, setIsFileOrFolder]);

  const { isFileOrFolderAlreadyExists } = useDirectory();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChildName(event.target.value);
    setIsExistAlready(false);
  };

  /*
   if user creating new file or folder and then suddenly click on other file or folder 
   then we need to add if the name is unqiue or show warning that file or folder already exists 
   or if input is empty then we remove the new file or folder dummy
  */
  const inputBlurHandler = () => {
    // Check if we have changed our state from the file to folder adding then sudden change will flicker ui so we used the setTimout to avoid the file or folder adding in same destination does not flicker ui so we clear time out if its in same destination
    const timerId = setTimeout(() => {
      if (!childName.trim().length) {
        setIsFileOrFolder("none");
        return;
      }
      if (isFileOrFolderAlreadyExists(directories, path, childName)) {
        setIsExistAlready(true);
        return;
      }
      setIsFileOrFolder("none");
      // Added timeout so that there is setFileOrFolder will update and the dummyfileorfolder get removed first and then our new folder or file gets added to directory
      // if its not done then it will add file or folder to directory first and then dummyfileorfolder gets removed so there is wierd ui change
      const newId = uniqueIdGenerator();

      setTimeout(() => {
        dispatch(
          addFileOrFolderToDirectory({
            id: newId,
            parentId,
            name: childName,
            isFolder: isFileOrFolder === "folder",
            path: path,
          })
        );
        if (isFileOrFolder === "file") {
          dispatch(addFileToNavigation({ id: newId, type: "file" }));
          scrollToTarget(newId);
        }
      }, 20);

      setIsExistAlready(false);
    }, 160);

    if (setNewFileOrFolderDummyTimerId)
      setNewFileOrFolderDummyTimerId({
        isTimer: true,
        id: timerId,
      });
  };

  /*
   when user press enter then we need to add the file or folder to directory 
    and if the name is not unique then we show warning that file or folder already exists
    if name is empty we need to show we must provide name for file or folder
    if name is unique we add the file or folder to directory
  */
  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      // check if file or folder is already exists or not
      if (
        isFileOrFolderAlreadyExists(directories, path, childName) ||
        !childName.trim().length
      ) {
        setIsExistAlready(true);
        return;
      }

      setIsFileOrFolder("none");
      // Added timeout so that there is setFileOrFolder will update and the dummyfileorfolder get removed first and then our new folder or file gets added to directory
      // if its not done then it will add file or folder to directory first and then dummyfileorfolder gets removed so there is wierd ui change
      const newId = uniqueIdGenerator();
      setTimeout(() => {
        dispatch(
          addFileOrFolderToDirectory({
            id: newId,
            parentId,
            name: childName,
            isFolder: isFileOrFolder === "folder",
            path: path,
          })
        );
        if (isFileOrFolder === "file") {
          dispatch(addFileToNavigation({ id: newId, type: "file" }));
          scrollToTarget(newId);
        }
      }, 0);
      setIsExistAlready(false);
    }
  };

  // if isFileOrFolder is none then we dont need to show the dummy file or folder
  if (isFileOrFolder === "none") return <></>;

  return (
    <div className="flex items-center justify-center gap-[3px]">
      {isFileOrFolder === "folder" ? (
        <>
          <VscChevronRight className="text-[17px]" />
          <FaFolder className="mr-[5px] text-[17px]" />
        </>
      ) : (
        <VscFile className="text-[color:var(--primary-color)] ml-[18.2px] text-[18px]" />
      )}
      <div className="relative w-full">
        <Input
          inputRef={childRef}
          className={mergeClass([
            "w-full overflow-clip p-[2px] bg-transparent outline-none select-none border  border-[color:var(--primary-color)]  selection:bg-[color:var(--accent-color)]",
            isExistAlready ? "border-red-600" : "",
          ])}
          onKeyDown={onKeyDownHandler}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          value={childName}
          autoFocus
        />
        {isExistAlready ? (
          <div className="absolute z-20 w-full p-1 text-white break-words whitespace-normal bg-red-600 border-b border-red-600 border-x">
            {childName.trim().length ? (
              <h3>
                A file or folder <span className="font-bold">{childName}</span>{" "}
                already exists at this location. Please choose a different name.
              </h3>
            ) : (
              <h3>A file or folder name must be provided.</h3>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NewFileOrFolderDummy;
