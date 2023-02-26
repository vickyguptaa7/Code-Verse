import React, { useCallback, useEffect, useRef, useState } from "react";
import { setTerminalContent } from "../../../Store/reducres/BottomPannel.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";

const Terminal = () => {
  const terminalContent = useAppSelector(
    (state) => state.bottomPannel.terminalContent
  );
  const dispatch = useAppDispatch();

  const [terminalInput, setTerminalInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const setFocusHandler = useCallback(() => {
    inputRef.current?.blur();
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    setFocusHandler();
  }, [setFocusHandler]);

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      dispatch(
        setTerminalContent(terminalContent + "user$ " + terminalInput + "\n")
      );
      setTerminalInput("");
    }
  };

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setTerminalInput(event.currentTarget.value);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full items-start text-[0.9rem] overflow-y-scroll"
      onClick={setFocusHandler}
    >
      <div className="w-full text-left whitespace-pre-line terminal-output">
        {terminalContent}
      </div>
      <div className="flex w-full">
        <span className="whitespace-pre-wrap">user{"$ "}</span>
        <input
          ref={inputRef}
          type="text"
          className="w-full outline-none bg-inherit"
          value={terminalInput}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
      </div>
    </div>
  );
};

export default Terminal;
