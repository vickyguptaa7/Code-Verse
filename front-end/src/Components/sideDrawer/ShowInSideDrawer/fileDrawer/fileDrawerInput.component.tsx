import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface IPROPS {
  initialFileName: string;
  isInputInFocus: boolean;
  setIsInputInFocus: Function;
  inputRef: React.RefObject<HTMLInputElement>;
}

const FileDrawerInput: React.FC<IPROPS> = ({
  initialFileName,
  isInputInFocus,
  setIsInputInFocus,
  inputRef,
}) => {
  const [fileName, setfileName] = useState(initialFileName);
  const inputChangeHandler = () => {
    setfileName(inputRef.current?.value!);
  };

  const inputBlurHandler = () => {
    if (inputRef.current?.value.length === 0) {
      setfileName(initialFileName);
    }
    // check if the file with same name does'nt exist already
    setIsInputInFocus(false);
    inputRef.current?.setAttribute("disabled", "");
  };

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  return (
    <input
      ref={inputRef}
      className={twMerge(
        "min-w-16 w-full overflow-clip p-[2px] bg-transparent outline-none select-none border border-transparent selection:bg-transparent",
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

export default FileDrawerInput;
