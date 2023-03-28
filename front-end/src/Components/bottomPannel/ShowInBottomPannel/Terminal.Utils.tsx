import useDirectory from "../../../hooks/useDirectory.hook";
import IDirectory from "../../../Interface/directory.interface";
import {
  setIsBottomPannelOpen,
  setTerminalContent,
  setTerminalsCurrentDirectoryInfo,
} from "../../../Store/reducres/BottomPannel/BottomPannel.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";

export const useTerminal = () => {
  const dispatch = useAppDispatch();
  const terminalContent = useAppSelector(
    (state) => state.bottomPannel.terminalContent
  );
  const terminalsCurrentDirectoryInfo = useAppSelector(
    (state) => state.bottomPannel.terminalsCurrentDirectoryInfo
  );
  const directories = useAppSelector((state) => state.Directory.directories);
  const { findDirectory, findDirectoryPath } = useDirectory();

  const clearTerminalContent = () => {
    dispatch(setTerminalContent(""));
  };
  const addToTerminalContent = (terminalInput: string) => {
    console.log(terminalContent);

    dispatch(
      setTerminalContent(
        `${terminalContent}${terminalsCurrentDirectoryInfo.name}:user$ ${terminalInput}\n`
      )
    );
  };
  const closeTerminal = () => {
    dispatch(setIsBottomPannelOpen(false));
  };
  const listCurrentDirectoryContent = () => {
    let contents: Array<IDirectory> = directories;
    if (terminalsCurrentDirectoryInfo.id !== "root") {
      const dir = findDirectory(directories, terminalsCurrentDirectoryInfo.id);
      contents = dir.children ? dir.children : [];
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
    if (terminalsCurrentDirectoryInfo.id !== "root") {
      path = findDirectoryPath(
        directories,
        terminalsCurrentDirectoryInfo.id,
        path
      );
    }
    addToTerminalContent("pwd\n" + path);
  };

  const changeDirectoryToRoot = () => {
    dispatch(setTerminalsCurrentDirectoryInfo({ id: "root", name: "root" }));
    addToTerminalContent("cd");
  };

  const changeDirectory = (target: string) => {
    let directory = findDirectory(
      directories,
      terminalsCurrentDirectoryInfo.id
    );
    addToTerminalContent("cd " + target+"\ncurrent directory does not exist");
    if (!directory.id) return;
    if (target === "..") {
      addToTerminalContent("cd ..");
      if (terminalsCurrentDirectoryInfo.id === "root") return;
      dispatch(
        setTerminalsCurrentDirectoryInfo({
          id: directory.parentId,
          name: directory.name,
        })
      );
    } else {
      let targetIndx;
      if (terminalsCurrentDirectoryInfo.id === "root") {
        targetIndx = directories.findIndex((dir) => dir.name === target);
      } else {
        targetIndx = directory.children.findIndex((dir) => dir.name === target);
      }
      console.log(targetIndx);

      if (targetIndx !== -1) {
        dispatch(
          setTerminalsCurrentDirectoryInfo(
            terminalsCurrentDirectoryInfo.id === "root"
              ? {
                  id: directories[targetIndx].id,
                  name: directories[targetIndx].name,
                }
              : {
                  id: directory.children[targetIndx].id,
                  name: directory.children[targetIndx].name,
                }
          )
        );
        addToTerminalContent("cd " + target);
      } else {
        addToTerminalContent(
          "cd " +
            target +
            `\nbash: ${"cd " + target}: target location not found`
        );
      }
    }
  };

  return {
    clearTerminalContent,
    addToTerminalContent,
    closeTerminal,
    listCurrentDirectoryContent,
    printWorkingDirectory,
    changeDirectoryToRoot,
    changeDirectory,
  };
};
