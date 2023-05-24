import React, { useEffect } from "react";

/**
 * This function sets focus on an input element using a React ref.
 * @param inputRef - inputRef is a React RefObject that refers to an HTMLInputElement. It is used to
 * focus on the input element when the component mounts.
 */
const useInputFocus = (inputRef: React.RefObject<HTMLInputElement>) => {
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);
};

export default useInputFocus;
