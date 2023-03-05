import { useState } from "react";
import { FaFolder } from "react-icons/fa";
import { VscChevronRight, VscFile } from "react-icons/vsc";
import useDirectory from "../../../../../hooks/useDirectory.hook";
import { addFileOrFolderToDirectory } from "../../../../../Store/reducres/File/FileDirectory.reducer";
import { useAppDispatch, useAppSelector } from "../../../../../Store/store";

interface IPROPS {
  isFileOrFolder: "file" | "folder" | "none";
  setIsFileOrFolder: Function;
  parentId: string;
  setTimerId?: (val: {
    isTimer: boolean;
    id: ReturnType<typeof setTimeout>;
  }) => void;
  childRef: React.RefObject<HTMLInputElement>;
}

const DummyFileFolder: React.FC<IPROPS> = ({
  isFileOrFolder,
  setIsFileOrFolder,
  parentId,
  setTimerId,
  childRef,
}) => {
  const [childName, setChildName] = useState("");
  const dispatch = useAppDispatch();
  const directories = useAppSelector(
    (state) => state.fileDirectory.directories
  );
  const { isFileOrFolderAlreadyExists } = useDirectory();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChildName(event.target.value);
  };

  const inputBlurHandler = () => {
    if (!childName.trim().length) {
      const timerId = setTimeout(() => {
        setIsFileOrFolder("none");
        console.log("hello blur");
      }, 60);
      if (setTimerId)
        setTimerId({
          isTimer: true,
          id: timerId,
        });
      return;
    }
    if (isFileOrFolderAlreadyExists(directories, parentId, childName)) {
      console.log("File already exists!");
      return;
    }
    setIsFileOrFolder("none");
    // Added timeout so that there is setFileOrFolder will update and the dummyfileorfolder get removed first and then our new folder or file gets added to directory
    // if its not done then it will add file or folder to directory first and then dummyfileorfolder gets removed so there is wierd ui change
    setTimeout(
      () =>
        dispatch(
          addFileOrFolderToDirectory({
            parentId,
            name: childName,
            isFolder: isFileOrFolder === "folder",
          })
        ),
      0
    );
  };

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && childName.trim().length) {
      if (isFileOrFolderAlreadyExists(directories, parentId, childName)) {
        console.log("File already exists!");
        return;
      }
      setIsFileOrFolder("none");
      // Added timeout so that there is setFileOrFolder will update and the dummyfileorfolder get removed first and then our new folder or file gets added to directory
      // if its not done then it will add file or folder to directory first and then dummyfileorfolder gets removed so there is wierd ui change
      setTimeout(
        () =>
          dispatch(
            addFileOrFolderToDirectory({
              parentId,
              name: childName,
              isFolder: isFileOrFolder === "folder",
            })
          ),
        0
      );
    }
  };

  if (isFileOrFolder === "none") return <></>;

  return (
    <div className="flex gap-1">
      {isFileOrFolder === "folder" ? (
        <>
          <div className="flex items-center justify-center">
            <VscChevronRight className="" />
          </div>
          <div className="flex items-center justify-center mr-1">
            <FaFolder className="" />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center ml-[18.2px]">
          <VscFile className="text-[#42A5F5]" />
        </div>
      )}
      <input
        ref={childRef}
        className="w-full overflow-clip p-[2px] bg-transparent outline-none select-none border border-[color:var(--highlight-text-color)] selection:bg-[color:var(--accent-color)]"
        onKeyDown={onKeyDownHandler}
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
        value={childName}
        autoFocus
      />
    </div>
  );
};

export default DummyFileFolder;
