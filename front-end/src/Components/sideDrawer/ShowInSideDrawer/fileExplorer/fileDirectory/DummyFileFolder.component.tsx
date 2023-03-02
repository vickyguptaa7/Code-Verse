import { FaFileAlt, FaFolder } from "react-icons/fa";
import { VscChevronRight } from "react-icons/vsc";

interface IPROPS {
  addFileOrFolder: "file" | "folder" | "none";
  setAddFileOrFolder: Function;
  childName: string;
  setChildName: Function;
}

const DummyFileFolder: React.FC<IPROPS> = ({
  addFileOrFolder,
  setAddFileOrFolder,
  childName,
  setChildName,
}) => {
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChildName(event.target.value);
  };

  const inputBlurHandler = () => {
    if (childName.length === 0) {
      setAddFileOrFolder("none");
    }
    // TODO: Check for the name duplication here and add to the directory
  };

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      // TODO: ADD To The Directory
    }
  };
  if (addFileOrFolder === "none") return <></>;
  return (
    <div className="flex gap-1">
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
