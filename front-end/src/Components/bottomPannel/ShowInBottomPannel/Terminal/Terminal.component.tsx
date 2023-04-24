import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../Store/store";
import { scrollToTarget } from "../../../../utils/scrollToTargetId.util";
import Input from "../../../UI/Input.component";

interface IPROPS {
  terminalActions: (terminalInput: string) => void;
}

const Terminal: React.FC<IPROPS> = ({ terminalActions }) => {
  const terminalContent = useAppSelector(
    (state) => state.terminal.terminalContent
  );
  const terminalsCurrentDirectoryInfo = useAppSelector(
    (state) => state.terminal.terminalsCurrentDirectoryInfo
  );
  const [terminalInput, setTerminalInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const setFocusHandler = useCallback(() => {
    inputRef.current?.blur();
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    setFocusHandler();
  }, [setFocusHandler]);

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      terminalActions(terminalInput);
      scrollToTarget("terminalInput");
      setTerminalInput("");
    }
  };

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setTerminalInput(event.currentTarget.value);
  };

  return (
    <div
      className="flex flex-col h-full items-start text-[0.9rem] overflow-y-auto "
      onClick={setFocusHandler}
    >
      <div className="w-full text-left break-words whitespace-pre-wrap terminal-output ">
        {terminalContent}
      </div>
      <div className="flex items-end w-full">
        <span className="whitespace-nowrap">
          {terminalsCurrentDirectoryInfo.name}:root{"$"}&nbsp;
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
