import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../Store/store";
import Input from "../../../UI/Input.component";
import { useTerminal } from "./Terminal.Utils";
import { scrollToTarget } from "../../../../utils/scrollToTargetId.util";

const Terminal = () => {
  const terminalContent = useAppSelector(
    (state) => state.terminal.terminalContent
  );
  const terminalsCurrentDirectoryInfo = useAppSelector(
    (state) => state.terminal.terminalsCurrentDirectoryInfo
  );
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

  const { terminalActions } = useTerminal(terminalInput);

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      console.log('before');
      terminalActions();
      console.log('after');
      scrollToTarget("terminalInput");
      setTerminalInput("");
    }
  };

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setTerminalInput(event.currentTarget.value);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full items-start text-[0.9rem] overflow-y-auto "
      onClick={setFocusHandler}
    >
      <div className="w-full text-left break-words whitespace-pre-wrap terminal-output ">
        {terminalContent}
      </div>
      <div className="flex w-full">
        <span className="whitespace-pre-wrap">
          {terminalsCurrentDirectoryInfo.name}:user{"$ "}
        </span>
        <Input
          id="terminalInput"
          inputRef={inputRef}
          type="text"
          className="w-full outline-none bg-inherit"
          value={terminalInput}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default Terminal;
