import { motion } from "framer-motion";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { VscFile } from "react-icons/vsc";
import { setCurrentNavFile } from "../../Store/reducres/Navigation/FileNavigation.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";
import Button from "../UI/Button.component";
import Image from "../UI/Image.component";
import { scrollToTarget } from "../../utils/scrollToTargetId.util";

interface IPROPS {
  fileId: string;
  fileName: string;
  fileIconUrl: string;
  removeFileHandler: Function;
}

const FileCard: React.FC<IPROPS> = ({
  fileId,
  fileName,
  fileIconUrl,
  removeFileHandler,
}) => {
  const dispatch = useAppDispatch();
  const currentNavFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );
  const isThisActiveNavFile = currentNavFile.id === fileId;

  const activeClassName = isThisActiveNavFile
    ? "bg-[color:var(--codeeditor-color)] border-b-[color:var(--primary-color)] "
    : "border-b-[color:var(--sidepannel-color)] ";

  let languageLogo = (
    <div className="max-w-[20px] min-w-[20px]">
      <Image
        fallback={
          <VscFile className="text-[18px] text-[color:var(--primary-color)] " />
        }
        src={fileIconUrl}
        className="object-contain"
        alt="icon"
      />
    </div>
  );

  const removeHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    removeFileHandler(fileId);
  };

  const changeCurrentFileInNavigationHandler = (event: React.MouseEvent) => {
    dispatch(
      setCurrentNavFile({
        id: fileId,
        type:
          fileId === "setting"
            ? "setting"
            : fileId === "extension"
            ? "extension"
            : fileId === "welcome"
            ? "welcome"
            : "file",
      })
    );
    scrollToTarget(fileId);
  };

  return (
    <motion.div
      className={mergeClass([
        "flex items-center cursor-pointer justify-between gap-2 px-2.5 py-1 pb-1  border-b-[1.6px]  group border-r border-r-[color:var(--border-color)]",
        activeClassName,
      ])}
      id={fileId}
      onClick={changeCurrentFileInNavigationHandler}
      style={{ originX: 0 }}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      exit={{ opacity: 0, scaleX: 0 }}
    >
      <div className="flex items-center justify-center w-full h-full language-logo">
        {languageLogo}
      </div>
      <div className="text-start whitespace-nowrap max-w-[10rem]">
        <h1
          className={mergeClass([
            "pr-3 text-[color:var(--primary-text-color)] text-ellipsis overflow-hidden text-sm",
            isThisActiveNavFile
              ? "text-[color:var(--highlight-text-color)]"
              : "",
          ])}
        >
          {fileName}
        </h1>
      </div>
      <div
        className={mergeClass([
          "close-logo pt-[2px] text-[color:var(--highlight-text-color)] group-hover:visible",
          isThisActiveNavFile ? "" : "invisible",
        ])}
      >
        <Button
          onClick={removeHandler}
          className="flex items-center justify-start"
        >
          <RxCross2 className="text-lg hover:bg-[color:var(--hover-text-color)] rounded-md duration-100 p-[2px] flex" />
        </Button>
      </div>
    </motion.div>
  );
};

export default FileCard;
