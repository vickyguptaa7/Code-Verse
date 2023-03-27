import useDirectory from "../../../hooks/useDirectory.hook";
import IDirectory from "../../../Interface/directory.interface";
import {
  setIsBottomPannelOpen,
  setTerminalContent,
} from "../../../Store/reducres/BottomPannel/BottomPannel.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";

export const useTerminal = () => {
  const dispatch = useAppDispatch();
  const terminalContent = useAppSelector(
    (state) => state.bottomPannel.terminalContent
  );
  const terminalsCurrentDirectoryId = useAppSelector(
    (state) => state.bottomPannel.terminalsCurrentDirectoryId
  );
  const directories = useAppSelector((state) => state.Directory.directories);
  const { findDirectoryChildren, findDirectoryPath } = useDirectory();

  const clearTerminalContent = () => {
    dispatch(setTerminalContent(""));
  };
  const addToTerminalContent = (terminalInput: string) => {
    console.log(terminalContent);

    dispatch(
      setTerminalContent(terminalContent + "user$ " + terminalInput + "\n")
    );
  };
  const closeTerminal = () => {
    dispatch(setIsBottomPannelOpen(false));
  };
  const listCurrentDirectoryContent = () => {
    let contents: Array<IDirectory> = directories;
    if (terminalsCurrentDirectoryId !== "root") {
      contents = findDirectoryChildren(directories, terminalsCurrentDirectoryId);
    }

    let output = "";
    for (const content of contents) {
      output += content.isFolder ? "/" + content.name : content.name;
      output += "\t\t";
    }
    addToTerminalContent("ls\n" + output);
  };
  const printWorkingDirectory = () => {
    let path = "/root";
    if (terminalsCurrentDirectoryId !== "root") {
      path = findDirectoryPath(directories, terminalsCurrentDirectoryId, path);
    }
    addToTerminalContent("pwd\n" + path);
  };

  return {
    clearTerminalContent,
    addToTerminalContent,
    closeTerminal,
    listCurrentDirectoryContent,
    printWorkingDirectory,
  };
};
