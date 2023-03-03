import { useState } from "react";
import { FaFileAlt, FaFolder } from "react-icons/fa";
import { VscChevronRight } from "react-icons/vsc";
import useDirectory from "../../../../../hooks/useDirectory.hook";

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
  const { addFileOrFolderToDirectory } = useDirectory();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChildName(event.target.value);
  };

  const inputBlurHandler = () => {
    if (childName.trim().length === 0) {
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
    addFileOrFolderToDirectory(
      parentId,
      childName,
      isFileOrFolder === "folder"
    );
    setIsFileOrFolder("none");
  };

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && childName.trim().length) {
      setIsFileOrFolder("none");
      addFileOrFolderToDirectory(
        parentId,
        childName,
        isFileOrFolder === "folder"
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
        <div className="flex items-center justify-center ml-4">
          <FaFileAlt className="text-xs" />
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
