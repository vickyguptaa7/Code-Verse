import { addFileToNavigation } from "../../../Store/reducres/Navigation/FileNavigation.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import DropMenu from "../../UI/DropMenu.component";
import DropMenuButton from "../../UI/DropMenuButton.component";
import {
  DrawerContent,
  setShowInSideDrawer,
  setIsDrawerOpen,
} from "./../../../Store/reducres/SideDrawer/SideDrawer.reducer";

import { fileDownloader } from "../../../utils/fileFolder.utils";
import { scrollToTarget } from "../../../utils/scrollToTargetId.util";
import {
  addNotification,
  removeNotification,
} from "../../../Store/reducres/Notification/Notification.reducer";
import { uniqueIdGenerator } from "../../../library/uuid/uuid.lib";
import { ERROR_NOTIFICATION_MESSAGE } from "../../Layout/Notification/notification.constant";

interface IPROPS {
  closeDropMenuHandler: Function;
}

export const DropMenuFile: React.FC<IPROPS> = ({ closeDropMenuHandler }) => {
  const dispatch = useAppDispatch();
  const currFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );
  const filesInformation = useAppSelector(
    (state) => state.Directory.filesInformation
  );
  const isSidePannelPositionOnLeft = useAppSelector(
    (state) => state.sideDrawer.isSidePannelPositionOnLeft
  );
  const directories = useAppSelector((state) => state.Directory.directories);

  const onDownloadFileHandler = () => {
    closeDropMenuHandler();
    const file = new Blob([filesInformation[currFile.id].body]);
    fileDownloader(file, filesInformation[currFile.id].name);
    dispatch(
      addNotification({
        id: uniqueIdGenerator(),
        description: "Files saved successfully",
        isWaitUntilComplete: false,
        type: "success",
      })
    );
  };

  const onDownloadAllFileAndFolderHandler = async () => {
    closeDropMenuHandler();
    const notificationId = uniqueIdGenerator();
    dispatch(
      addNotification({
        id: notificationId,
        description: "Saving all files and folders...",
        isWaitUntilComplete: true,
        type: "info",
      })
    );
    const downloadFileFolderWorker = new Worker(
      new URL("./../../../worker/downloadFileFolder.worker.ts", import.meta.url)
    );
    downloadFileFolderWorker.postMessage({ filesInformation, directories });

    downloadFileFolderWorker.onerror = (err) => {
      dispatch(
        addNotification({
          id: uniqueIdGenerator(),
          description: ERROR_NOTIFICATION_MESSAGE,
          isWaitUntilComplete: false,
          type: "error",
        })
      );
      dispatch(removeNotification({ id: notificationId }));
      downloadFileFolderWorker.terminate();
    };

    downloadFileFolderWorker.onmessage = (e) => {
      const { file } = e.data;
      fileDownloader(file, "All File And Folder");
      dispatch(
        addNotification({
          id: uniqueIdGenerator(),
          description: "All files and folders saved successfully",
          isWaitUntilComplete: false,
          type: "success",
        })
      );
      dispatch(removeNotification({ id: notificationId }));
      downloadFileFolderWorker.terminate();
    };
  };

  const showInSideDrawerHandler = (view: DrawerContent) => {
    dispatch(setIsDrawerOpen(true));
    dispatch(setShowInSideDrawer(view));
    closeDropMenuHandler();
  };

  const welcomeHandler = () => {
    dispatch(addFileToNavigation({ id: "welcome", type: "welcome" }));
    scrollToTarget("welcome");
    closeDropMenuHandler();
  };

  return (
    <DropMenu
      className={
        isSidePannelPositionOnLeft
          ? "w-40 -top-[54px] left-[54px]"
          : "w-40 -top-[54px] right-[54px]"
      }
      initialX={isSidePannelPositionOnLeft ? -175 : 15}
      initialY={20}
    >
      <OpenFileFolderDropMenuButtons
        closeDropMenuHandler={closeDropMenuHandler}
      />
      <div className="w-4/5 mx-auto h-[0.5px] bg-[color:var(--dropmenu-border-color)] my-1"></div>
      <DropMenuButton
        name="Save All"
        onClickHandler={onDownloadAllFileAndFolderHandler}
      />
      {currFile.type === "file" && currFile.id !== "null" && (
        <DropMenuButton
          name="Save File"
          onClickHandler={onDownloadFileHandler}
        />
      )}
      <div className="w-4/5 mx-auto h-[0.5px] bg-[color:var(--dropmenu-border-color)] my-1"></div>
      <DropMenuButton
        name="Explorer"
        onClickHandler={() => showInSideDrawerHandler("file")}
      />
      <DropMenuButton
        name="Search"
        onClickHandler={() => showInSideDrawerHandler("search")}
      />
      <DropMenuButton
        name="Source Control"
        onClickHandler={() => showInSideDrawerHandler("git")}
      />
      <DropMenuButton
        name="Run"
        onClickHandler={() => showInSideDrawerHandler("debug")}
      />
      <DropMenuButton
        name="Extensions"
        onClickHandler={() => showInSideDrawerHandler("extensions")}
      />
      <div className="w-4/5 mx-auto h-[0.5px] bg-[color:var(--dropmenu-border-color)] my-1"></div>
      <DropMenuButton name="Welcome" onClickHandler={welcomeHandler} />
    </DropMenu>
  );
};

function OpenFileFolderDropMenuButtons(props: {
  closeDropMenuHandler: Function;
}) {
  const { closeDropMenuHandler } = props;
  return (
    <>
      <label htmlFor="file" title="Add local files">
        <div
          className="cursor-pointer whitespace-nowrap block mx-1 my-0.5 px-4 py-0.5 text-sm text-start rounded-md hover:bg-[color:var(--hover-text-color)]"
          onClick={() => {
            // give time out to perform the task of label so that file selection popup will appear
            setTimeout(closeDropMenuHandler, 0);
          }}
        >
          <h1>Open Files</h1>
        </div>
      </label>

      <label htmlFor="folder" title="Add local files">
        <div
          className="cursor-pointer whitespace-nowrap block mx-1 my-0.5 px-4 py-0.5 text-sm text-start rounded-md hover:bg-[color:var(--hover-text-color)]"
          onClick={() => {
            setTimeout(closeDropMenuHandler, 0);
          }}
        >
          <h1>Open Folder</h1>
        </div>
      </label>
    </>
  );
}
