import React from "react";
import { twMerge } from "tailwind-merge";

interface IPROPS extends React.InputHTMLAttributes<HTMLInputElement> {
  className: string;
  inputRef: React.RefObject<HTMLInputElement>|null;
  isTextArea?: boolean;
}

const Input: React.FC<IPROPS> = ({ className, inputRef, ...props }) => {
  return (
    <input
      ref={inputRef}
      className={twMerge("outline-none bg-inherit", className)}
      {...props}
    />
  );
};

export default Input;
