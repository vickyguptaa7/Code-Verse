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
  const currentDirectory = useAppSelector(
    (state) => state.bottomPannel.currentDirectory
  );
  const directories = useAppSelector((state) => state.Directory.directories);
  const { folderContent } = useDirectory();
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
    if (currentDirectory !== "root") {
      contents = folderContent(directories, currentDirectory);
    }
    console.log(contents);

    let output = "";
    for (const content of contents) {
      output += content.isFolder ? "/" + content.name : content.name;
      output +=  "\t\t";
    }
    addToTerminalContent("ls\n" + output);
  };
  return {
    clearTerminalContent,
    addToTerminalContent,
    closeTerminal,
    listCurrentDirectoryContent,
  };
};
