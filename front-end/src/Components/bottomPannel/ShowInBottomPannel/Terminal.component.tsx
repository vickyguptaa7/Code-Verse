import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../Store/store";
import Input from "../../UI/Input.component";
import { useTerminal } from "./Terminal.Utils";

const Terminal = () => {
  const terminalContent = useAppSelector(
    (state) => state.bottomPannel.terminalContent
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
  const {
    clearTerminalContent,
    addToTerminalContent,
    closeTerminal,
    listCurrentDirectoryContent,
    printWorkingDirectory,
  } = useTerminal();
  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      const input = terminalInput.trim().toLowerCase();
      if (input === "clear") {
        clearTerminalContent();
      } else if (input === "exit") {
        closeTerminal();
      } else if (input === "ls") {
        listCurrentDirectoryContent();
      } else if (input === "pwd") {
        printWorkingDirectory();
      }else if(input==="cd"){
        //TODO:assign currentDirectoryId To root directory
      } else if (input.split(" ").length === 2) {
        const inputs=input.split(" ");
        if(inputs[0]==="cd"){
          //TODO:
        }
      } else {
        addToTerminalContent(
          `${terminalInput}\nbash: ${terminalInput}: command not found`
        );
      }
      setTerminalInput("");
    }
  };

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setTerminalInput(event.currentTarget.value);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full items-start text-[0.9rem] overflow-y-scroll "
      onClick={setFocusHandler}
    >
      <div className="w-full text-left break-words whitespace-pre-wrap terminal-output ">
        {terminalContent}
      </div>
      <div className="flex w-full">
        <span className="whitespace-pre-wrap">user{"$ "}</span>
        <Input
          inputRef={inputRef}
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
