import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { VscBell, VscFeedback, VscRemote, VscWarning } from "react-icons/vsc";
import { useAppSelector } from "../../Store/store";
import { editorLanguage } from "../../Assets/Data/editorLanguages.data";

const Footer = () => {
  const currentNavFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );

  const tabSize = useAppSelector((state) => state.editor.tabSize);
  console.log(currentNavFile);
  const fileInformation = useAppSelector(
    (state) => state.Directory.filesInformation
  );
  let language = fileInformation[currentNavFile.id]
    ? fileInformation[currentNavFile.id].language
    : "home";

  return (
    <div className="flex items-center justify-between w-full h-[22px] bg-[color:var(--footer-color)] gap-1 border-t border-[color:var(--border-color)]">
      <div className="flex h-full gap-1 left-container ">
        <div
          className="px-2.5 h-full flex items-center justify-center bg-[color:var(--accent-color)] hover:brightness-125"
          title="Remote Window"
        >
          <VscRemote className="text-[color:var(--highlight-text-color)] text-sm" />
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
        {currentNavFile.id !== "null" && currentNavFile.type === "file" ? (
          <>
            <div
              className="flex text-[color:var(--highlight-text-color)] text-sm items-center justify-center gap-1 hover:bg-[color:var(--hover-text-color)] h-full px-2"
              title="Spaces"
            >
              Spaces : {tabSize}
            </div>
            <div
              className="flex text-[color:var(--highlight-text-color)] text-sm items-center justify-center gap-1 hover:bg-[color:var(--hover-text-color)] h-full px-2"
              title="Language"
            >
              <h3 className="">
                {editorLanguage[language]
                  ? editorLanguage[language]
                  : "Plain Text"}
              </h3>
            </div>
          </>
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
