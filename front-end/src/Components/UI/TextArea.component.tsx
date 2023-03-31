import React from "react";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";

interface IPROPS extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  className: string;
  inputRef: React.RefObject<HTMLTextAreaElement> | null;
  isTextArea?: boolean;
}

const TextArea: React.FC<IPROPS> = ({ className, inputRef, ...props }) => {
  return (
    <textarea
      ref={inputRef}
      className={mergeClass(["outline-none bg-inherit", className])}
      {...props}
    ></textarea>
  );
};

export default TextArea;
