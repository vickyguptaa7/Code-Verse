import React, { useEffect, useRef } from "react";
import { VscChevronRight } from "react-icons/vsc";

const Debug = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  return (
    <div className="flex items-end w-full h-full text-white ">
      <div className="flex items-center justify-center w-full gap-2">
        <VscChevronRight />
        <input
          ref={inputRef}
          type="text"
          className="w-full outline-none bg-inherit font-cascadia"
          placeholder="Please start a debug session to evaluate expressions"
        />
      </div>
    </div>
  );
};

export default Debug;
