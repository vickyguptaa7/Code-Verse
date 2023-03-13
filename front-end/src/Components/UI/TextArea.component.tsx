import React from "react";
import { twMerge } from "tailwind-merge";

interface IPROPS extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  className: string;
  inputRef: React.RefObject<HTMLTextAreaElement> | null;
  isTextArea?: boolean;
}

const TextArea: React.FC<IPROPS> = ({ className, inputRef, ...props }) => {
  return (
    <textarea
      ref={inputRef}
      className={twMerge("outline-none bg-inherit", className)}
      {...props}
    ></textarea>
  );
};

export default TextArea;
