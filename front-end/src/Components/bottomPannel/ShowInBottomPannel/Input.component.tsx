import React, { useEffect, useRef } from "react";

interface PROPS_INTEFACE {
  mainDivHeight: number;
}

const Input: React.FC<PROPS_INTEFACE> = ({ mainDivHeight }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  return (
    <div className="text-white">
      <textarea
        ref={inputRef}
        name="input"
        id="input"
        className="w-full outline-none resize-none bg-inherit font-cascadia"
        // here 18px subtracted as the parent div have margins and padding so to remove scrolling
        style={{ height: mainDivHeight - 18 }}
      ></textarea>
    </div>
  );
};

export default Input;
