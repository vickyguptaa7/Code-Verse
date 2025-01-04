import { AiOutlineEye, AiOutlineStop } from "react-icons/ai";
import { CiStreamOn } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { VscBell, VscFeedback, VscRemote, VscWarning } from "react-icons/vsc";
import {
  editorLanguage,
  SUPPORTED_LANGUAGES_FOR_LIVE_SERVER,
} from "../../Assets/Data/editorLanguages.data";
import {
  setHtmlFileId,
  setHtmlFileParentPath,
  setIsBrowserOpen,
} from "../../Store/reducres/SideDrawer/Browser/Browser.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { getFileParentPath } from "../../utils/fileFolder.utils";
import Button from "../UI/Button.component";

const Footer = () => {
  const dispatch = useAppDispatch();
  const currentNavFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );
  const isBrowserOpen = useAppSelector((state) => state.browser.isBrowserOpen);
  const currHtmlFileId = useAppSelector((state) => state.browser.htmlFildId);
  const directories = useAppSelector((state) => state.Directory.directories);
  const tabSize = useAppSelector((state) => state.editor.tabSize);
  const views = useAppSelector((state) => state.editor.views);
  const fileInformation = useAppSelector(
    (state) => state.Directory.filesInformation
  );

  // get the language of the current file on the main view window
  const language = fileInformation[currentNavFile.id]
    ? fileInformation[currentNavFile.id].language
    : "home";

  const mappedLanguage = editorLanguage[language];

  const liveServerHandler = () => {
    if (currentNavFile.id === currHtmlFileId) {
      dispatch(setHtmlFileId(""));
      dispatch(setHtmlFileParentPath(""));
      return;
    }
    dispatch(setIsBrowserOpen(true));
    dispatch(setHtmlFileId(currentNavFile.id));
    dispatch(
      setHtmlFileParentPath(getFileParentPath(currentNavFile.id, directories))
    );
  };

  const browserHandler = () => {
    dispatch(setIsBrowserOpen(!isBrowserOpen));
  };

  return (
    <div className="flex items-center justify-between w-full h-[22px] bg-[color:var(--footer-color)] gap-1 border-t border-[color:var(--border-color)] overflow-hidden">
      <div className="flex h-full gap-1 left-container ">
        <div
          className="px-2.5 h-full flex items-center justify-center bg-[color:var(--primary-color)] hover:brightness-125"
          title="Remote Window"
        >
          <VscRemote className="text-sm text-white" />
        </div>
        <div
          className="flex text-[color:var(--highlight-text-color)] text-sm items-center justify-center gap-1 hover:bg-[color:var(--hover-text-color)] h-full px-1"
          title="Errors And Warnings"
        >
          <RxCrossCircled />
          <p className="text-xs">0</p>
          <VscWarning />
          <p className="text-xs">0</p>
        </div>
      </div>
      <div className="flex h-full gap-1 mr-2 right-container ">
        {SUPPORTED_LANGUAGES_FOR_LIVE_SERVER.includes(mappedLanguage) &&
          currHtmlFileId === currentNavFile.id && (
            <Button
              className="flex text-[color:var(--highlight-text-color)] text-xs items-center justify-center gap-1 hover:bg-[color:var(--hover-text-color)] h-full px-1 whitespace-nowrap"
              title="Browser"
              onClick={browserHandler}
            >
              Browser
            </Button>
          )}
        {SUPPORTED_LANGUAGES_FOR_LIVE_SERVER.includes(mappedLanguage) && (
          <Button
            className="flex text-[color:var(--highlight-text-color)] text-xs items-center justify-center gap-1 hover:bg-[color:var(--hover-text-color)] h-full px-1 whitespace-nowrap"
            title="Live Server"
            onClick={liveServerHandler}
          >
            {currHtmlFileId !== currentNavFile.id ? (
              <>
                <CiStreamOn /> Go Live
              </>
            ) : (
              <>
                {" "}
                <AiOutlineStop /> Port : 3000
              </>
            )}
          </Button>
        )}
        {currentNavFile.id !== "null" && currentNavFile.type === "file" ? (
          <>
            <div
              className="flex text-[color:var(--highlight-text-color)] text-xs items-center justify-center gap-1 hover:bg-[color:var(--hover-text-color)] h-full px-2 whitespace-nowrap"
              title="Spaces"
            >
              {`Spaces: ${tabSize}`}
            </div>
            <div
              className="flex text-[color:var(--highlight-text-color)] text-sm items-center justify-center gap-1 hover:bg-[color:var(--hover-text-color)] h-full px-2"
              title="Language"
            >
              <h3 className="whitespace-nowrap">
                {editorLanguage[language]
                  ? editorLanguage[language]
                  : "Plain Text"}
              </h3>
            </div>
          </>
        ) : null}
        <div
          className="flex text-[color:var(--highlight-text-color)] text-xs items-center justify-center gap-1 hover:bg-[color:var(--hover-text-color)] h-full px-1 whitespace-nowrap"
          title="Keyboard Layout"
        >
          Layout: U.S.
        </div>
        {views ? (
          <div
            className="flex text-[color:var(--highlight-text-color)] text-sm items-center justify-center gap-1 hover:bg-[color:var(--hover-text-color)] h-full px-1"
            title="Views"
          >
            <AiOutlineEye />
            <p className="text-xs">{views}</p>
          </div>
        ) : null}
        <div
          className="flex text-[color:var(--highlight-text-color)] text-sm items-center justify-center gap-1 hover:bg-[color:var(--hover-text-color)] h-full px-1"
          title="Tweet Feedback"
        >
          <VscFeedback />
        </div>
        <div
          className="flex text-[color:var(--highlight-text-color)] text-sm items-center justify-center gap-1 hover:bg-[color:var(--hover-text-color)] h-full px-1"
          title="Notification"
        >
          <VscBell />
        </div>
      </div>
    </div>
  );
};

export default Footer;
