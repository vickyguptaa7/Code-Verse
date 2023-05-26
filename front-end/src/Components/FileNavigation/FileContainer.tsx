import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { INavFile } from "../../@types/file.d";
import {
  removeFileFromNavigation,
  setCurrentNavFile,
  updateNavFileList,
} from "../../Store/reducres/Navigation/FileNavigation.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import FileCard from "./FileCard";
import useDragToScroll from "./hook/useDragToScroll.hook";

interface IPROPS {
  navFilesList: Array<INavFile>;
}

const FileContainer: React.FC<IPROPS> = ({ navFilesList }) => {
  const navFileContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const currentNavFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );
  const filesInformation = useAppSelector(
    (state) => state.Directory.filesInformation
  );

  // only have the files that exist in the file information
  const newNavList = navFilesList.filter(
    (navFile) =>
      filesInformation[navFile.id] !== undefined || navFile.type !== "file"
  );

  useDragToScroll(navFileContainerRef);

  useEffect(() => {
    // if there is deletion in filesInformation table and that deletion affect the navFileList then
    // nav File list should be update accordingly
    if (newNavList.length !== navFilesList.length) {
      dispatch(updateNavFileList(newNavList));
    }
    if (newNavList.length === 0) {
      dispatch(setCurrentNavFile({ id: "null", type: "file" }));
      return;
    }
    if (filesInformation[currentNavFile.id] === undefined) {
      dispatch(setCurrentNavFile(newNavList[newNavList.length - 1]));
    }
    // eslint-disable-next-line
  }, [filesInformation, dispatch]);

  const removeFileHandler = (id: string) => {
    dispatch(removeFileFromNavigation({ id }));
  };

  const listOfFiles = newNavList.map((file) => (
    <FileCard
      key={file.id}
      fileId={file.id}
      fileName={filesInformation[file.id].name}
      fileIconUrl={filesInformation[file.id].iconUrls[0]}
      removeFileHandler={removeFileHandler}
    />
  ));

  return (
    <div
      ref={navFileContainerRef}
      className="flex overflow-x-auto file-container hidescrollbar1 hidescrollbar2"
    >
      <AnimatePresence>{listOfFiles}</AnimatePresence>
    </div>
  );
};

export default FileContainer;
