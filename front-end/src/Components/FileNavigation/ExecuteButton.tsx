import { useState } from "react";
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
import {
  ERROR_SERVER_NOTIFICATION_MESSAGE,
  EXECUTING_CODE_NOTIFICATION_MESSAGE,
  PENDING_NOTIFICATION_MESSAGE,
  UNSUPPORTED_LANGUAGE_NOTIFICATION_MESSAGE,
} from "../Layout/Notification/notification.constant";
import Button from "../UI/Button.component";

const URL = "https://code-verse.onrender.com/api/execute";

const ExecuteButton = () => {
  const [isRequestPending, setIsRequestPending] = useState(false);
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
  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );

  const dispatch = useAppDispatch();

  const codeExecutionHandler = async () => {
    if (isRequestPending) {
      // avoid unnecessary notifications of same type
      if (
        notifications.find(
          (notification) =>
            notification.description === PENDING_NOTIFICATION_MESSAGE
        )
      )
        return;
      dispatch(
        addNotification({
          id: uniqueIdGenerator(),
          type: "info",
          isWaitUntilComplete: false,
          description: PENDING_NOTIFICATION_MESSAGE,
        })
      );
      return;
    }

    const language =
      editorLanguage[fileInformation[currentNavFile.id].language];

    if (!SUPPORTED_LANGUAGES.find((lang) => lang === language)) {
      dispatch(
        addNotification({
          id: uniqueIdGenerator(),
          type: "error",
          isWaitUntilComplete: false,
          description: UNSUPPORTED_LANGUAGE_NOTIFICATION_MESSAGE,
        })
      );
      return;
    }
    setIsRequestPending(true);
    const id = uniqueIdGenerator();
    dispatch(
      addNotification({
        id: id,
        type: "info",
        isWaitUntilComplete: true,
        description: EXECUTING_CODE_NOTIFICATION_MESSAGE,
      })
    );

    let response;
    try {
      response = await fetch(URL, {
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
    } catch (err) {
      dispatch(removeNotification({ id: id }));
      setIsRequestPending(false);
      // avoid unnecessary notifications of same type
      if (
        notifications.find(
          (notification) =>
            notification.description === ERROR_SERVER_NOTIFICATION_MESSAGE
        )
      )
        return;
      dispatch(
        addNotification({
          id: uniqueIdGenerator(),
          type: "error",
          isWaitUntilComplete: false,
          description: ERROR_SERVER_NOTIFICATION_MESSAGE,
        })
      );
      return;
    }

    const data = await response?.json();
    const { id: submission_id } = data;
    setTimeout(() => getSubmissionStatus(submission_id, id), 5000);
  };

  const getSubmissionStatus = async (
    submission_id: string,
    notification_id: string
  ) => {
    let response;
    try {
      response = await fetch(`${URL}${submission_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-api-key": process.env.REACT_APP_BACKEND_API_KEY || "",
        },
      });
    } catch (err) {
      dispatch(setIsBottomPannelOpen(true));
      dispatch(setShowInBottomPannel("output"));
      dispatch(setOutputContent(JSON.stringify(err)));
      dispatch(removeNotification({ id: notification_id }));
      setIsRequestPending(false);
      return;
    }

    const data = await response?.json();
    const { status } = data;
    if (status === "pending") {
      setTimeout(
        () => getSubmissionStatus(submission_id, notification_id),
        5000
      );
      return;
    }
    const { error, output } = data;
    const toShow = error.length
      ? `Error : ${error.trimEnd()}\n`
      : `${output.trimEnd()}`;

    dispatch(setIsBottomPannelOpen(true));
    dispatch(setShowInBottomPannel("output"));

    // avoid adding more than 10000 characters in output
    let newOutputContent = outputContent.length
      ? outputContent + "\n" + toShow
      : toShow;
    newOutputContent = newOutputContent?.slice(
      -Math.min(newOutputContent?.length, 10000)
    );
    console.log(newOutputContent);

    dispatch(setOutputContent(newOutputContent));
    setIsRequestPending(false);
    dispatch(removeNotification({ id: notification_id }));
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
