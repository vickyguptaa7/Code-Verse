import { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";
import { VscChevronRight, VscFile } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import useDirectory from "../../../../../hooks/useDirectory.hook";
import { addFileOrFolderToDirectory } from "../../../../../Store/reducres/File/FileDirectory.reducer";
import { useAppDispatch, useAppSelector } from "../../../../../Store/store";

interface IPROPS {
  isFileOrFolder: "file" | "folder" | "none";
  setIsFileOrFolder: Function;
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
  parentId,
  setNewFileOrFolderDummyTimerId,
  childRef,
}) => {
  const [childName, setChildName] = useState("");
  const [isExistAlready, setIsExistAlready] = useState(false);
  const dispatch = useAppDispatch();
  const directories = useAppSelector(
    (state) => state.fileDirectory.directories
  );

  const currentWorkingFileOrFolder = useAppSelector(
    (state) => state.fileDirectory.currentWorkingFileOrFolder
  );

  useEffect(() => {
    console.log("ll");
    
    if (!currentWorkingFileOrFolder.isActive) return;
    if (
      currentWorkingFileOrFolder.operation !== "add" ||
      currentWorkingFileOrFolder.id !== parentId
    ) {
      console.log("collision");
      setIsFileOrFolder("none");
    }
    return;
  },[currentWorkingFileOrFolder,parentId,setIsFileOrFolder]);
  const { isFileOrFolderAlreadyExists } = useDirectory();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChildName(event.target.value);
    setIsExistAlready(false);
  };

  const inputBlurHandler = () => {
    // Check if we have changed our state from the file to folder adding then sudden change will flicker ui so we used the setTimout to avoid the file or folder adding in same destination does not flicker ui so we clear time out if its in same destination

    const timerId = setTimeout(() => {
      if (!childName.trim().length) {
        setIsFileOrFolder("none");
        return;
      }
      if (isFileOrFolderAlreadyExists(directories, parentId, childName)) {
        console.log("File already exists!");
        setIsExistAlready(true);
        return;
      }
      setIsFileOrFolder("none");
      // Added timeout so that there is setFileOrFolder will update and the dummyfileorfolder get removed first and then our new folder or file gets added to directory
      // if its not done then it will add file or folder to directory first and then dummyfileorfolder gets removed so there is wierd ui change
      setTimeout(() => {
        dispatch(
          addFileOrFolderToDirectory({
            parentId,
            name: childName.toLowerCase(),
            isFolder: isFileOrFolder === "folder",
          })
        );
      }, 20);
      setIsExistAlready(false);
    }, 60);
    if (setNewFileOrFolderDummyTimerId)
      setNewFileOrFolderDummyTimerId({
        isTimer: true,
        id: timerId,
      });
  };

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (
        isFileOrFolderAlreadyExists(directories, parentId, childName) ||
        !childName.trim().length
      ) {
        console.log("File already exists! key");
        setIsExistAlready(true);
        return;
      }
      setIsFileOrFolder("none");
      // Added timeout so that there is setFileOrFolder will update and the dummyfileorfolder get removed first and then our new folder or file gets added to directory
      // if its not done then it will add file or folder to directory first and then dummyfileorfolder gets removed so there is wierd ui change
      setTimeout(() => {
        dispatch(
          addFileOrFolderToDirectory({
            parentId,
            name: childName,
            isFolder: isFileOrFolder === "folder",
          })
        );
      }, 0);
      setIsExistAlready(false);
    }
  };

  if (isFileOrFolder === "none") return <></>;

  return (
    <div className="flex items-center justify-center gap-[3px]">
      {isFileOrFolder === "folder" ? (
        <>
          <VscChevronRight className="text-[17px]" />
          <FaFolder className="mr-[5px] text-[17px]" />
        </>
      ) : (
        <VscFile className="text-[#42A5F5] ml-[18.2px] text-[18px]" />
      )}
      <div className="relative w-full">
        <input
          ref={childRef}
          className={twMerge(
            "w-full overflow-clip p-[2px] bg-transparent outline-none select-none border  border-red-900  selection:bg-[color:var(--accent-color)]",
            isExistAlready ? "border-red-600" : ""
          )}
          onKeyDown={onKeyDownHandler}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          value={childName}
          autoFocus
        />
        {isExistAlready ? (
          <div className="absolute z-20 w-full p-1 break-words whitespace-normal bg-red-900 border-b border-red-600 border-x">
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
