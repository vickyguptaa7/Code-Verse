import { FaFileAlt, FaFolder } from "react-icons/fa";
import { VscChevronRight } from "react-icons/vsc";
import directory from "../../../../../Interface/directory.interface";
import { useAppSelector } from "../../../../../Store/store";

interface IPROPS {
  addFileOrFolder: "file" | "folder" | "none";
  setAddFileOrFolder: Function;
  childName: string;
  setChildName: Function;
  parentId: string;
  setTimerId?: (val: {
    isTimer: boolean;
    id: ReturnType<typeof setTimeout>;
  }) => void;
  childRef: React.RefObject<HTMLInputElement>;
}

const DummyFileFolder: React.FC<IPROPS> = ({
  addFileOrFolder,
  setAddFileOrFolder,
  childName,
  setChildName,
  parentId,
  setTimerId,
  childRef,
}) => {
  const directories = useAppSelector(
    (state) => state.fileDirectory.directories
  );
  const { verifyThatSameNameFileOrFolderExists } = useDummyFileOrFolder();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChildName(event.target.value);
  };

  const inputBlurHandler = () => {
    if (childName.length === 0) {
      const timerId = setTimeout(() => {
        setAddFileOrFolder("none");
        console.log("hello blur");
      }, 60);
      if (setTimerId)
        setTimerId({
          isTimer: true,
          id: timerId,
        });
    }
    // TODO: Check for the name duplication here and add to the directory
  };

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      // TODO: ADD To The Directory
      console.log(parentId, childName);

      console.log(
        verifyThatSameNameFileOrFolderExists(directories, parentId, childName)
      );
    }
  };

  if (addFileOrFolder === "none") return <></>;

  return (
      <div
        className="flex gap-1"
      >
        {addFileOrFolder === "folder" ? (
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

function useDummyFileOrFolder() {
  const verifyThatSameNameFileOrFolderExists = (
    directories: Array<directory>,
    parentId: string,
    name: string
  ) => {
    for (const directory of directories) {
      if (
        (directory.parentId === parentId &&
          directory.name.toLowerCase() === name.toLowerCase()) ||
        (directory.isFolder &&
          verifyThatSameNameFileOrFolderExists(
            directory.children,
            parentId,
            name
          ))
      ) {
        return true;
      }
    }
    return false;
  };
  return {
    verifyThatSameNameFileOrFolderExists,
  };
}

export default DummyFileFolder;
