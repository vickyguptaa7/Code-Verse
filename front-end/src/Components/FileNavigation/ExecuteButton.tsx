import { VscDebugStart } from "react-icons/vsc";
import {
  SUPPORTED_LANGUAGES,
  editorLanguage,
} from "../../Assets/Data/editorLanguages.data";
import {
  setIsBottomPannelOpen,
  setOutputContent,
  setShowInBottomPannel,
} from "../../Store/reducres/BottomPannel/BottomPannel.reducer";
import {
  addNotification,
  removeNotification,
} from "../../Store/reducres/Notification/Notification.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { uniqueIdGenerator } from "../../library/uuid/uuid.lib";
import Button from "../UI/Button.component";

const URL = "https://vscode-s.onrender.com/api/execute";

const ExecuteButton = () => {
  const currentNavFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );
  const fileInformation = useAppSelector(
    (state) => state.Directory.filesInformation
  );
  const inputContent = useAppSelector(
    (state) => state.bottomPannel.inputContent
  );
  const outputContent = useAppSelector(
    (state) => state.bottomPannel.outputContent
  );

  const dispatch = useAppDispatch();

  const codeExecutionHandler = async () => {
    console.log("codeExecutionHandler");
    const language =
      editorLanguage[fileInformation[currentNavFile.id].language];
    console.log(language);

    if (!SUPPORTED_LANGUAGES.find((lang) => lang === language)) {
      dispatch(
        addNotification({
          id: uniqueIdGenerator(),
          type: "error",
          isWaitUntilComplete: false,
          description: "Language not supported",
        })
      );
      return;
    }
    const id = uniqueIdGenerator();
    dispatch(
      addNotification({
        id: id,
        type: "info",
        isWaitUntilComplete: true,
        description: "Executing Code...",
      })
    );
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        code: fileInformation[currentNavFile.id].body,
        language: language,
        input: inputContent,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": process.env.REACT_APP_BACKEND_API_KEY || "",
      },
    });
    const data = await response.json();
    const { error, output } = data;
    const toShow = error.length ? "Error : " + error : output;
    dispatch(setIsBottomPannelOpen(true));
    dispatch(setShowInBottomPannel("output"));

    dispatch(
      setOutputContent(
        outputContent.length ? outputContent + "\n" + toShow : toShow
      )
    );

    dispatch(removeNotification({ id: id }));
  };
  return (
    <Button
      className="flex items-center justify-center mr-4 rounded-lg hover:bg-[color:var(--hover-text-color)]"
      onClick={codeExecutionHandler}
    >
      <VscDebugStart className="text-2xl p-0.5" />
    </Button>
  );
};

export default ExecuteButton;
