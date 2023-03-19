import React, { useEffect } from "react";

const useInputFocus = (inputRef: React.RefObject<HTMLInputElement>) => {
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return [];
};

export default useInputFocus;
