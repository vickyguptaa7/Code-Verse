import React from "react";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";

interface IPROPS extends React.InputHTMLAttributes<HTMLInputElement> {
  className: string;
  inputRef: React.RefObject<HTMLInputElement> | null;
  isTextArea?: boolean;
}

const Input: React.FC<IPROPS> = ({ className, inputRef, ...props }) => {
  return (
    <input
      ref={inputRef}
      className={mergeClass(["outline-none bg-inherit rounded-sm", className])}
      {...props}
    />
  );
};

export default Input;
