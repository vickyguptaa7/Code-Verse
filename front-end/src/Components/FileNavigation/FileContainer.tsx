import FileCard from "./FileCard";

import { removeFileFromNavigation } from "../../Store/reducres/File/FileNavigation.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";

const FileContainer = () => {
  const filesInNavigation = useAppSelector(
    (state) => state.fileNavigation.navFilesList
  );
  const filesInformation = useAppSelector(
    (state) => state.Directory.filesInformation
  );
  const dispatch = useAppDispatch();
  const removeFileHandler = (id: string) => {
    dispatch(removeFileFromNavigation({ id }));
  };

  const listOfFiles = filesInNavigation.map((file) => (
    <FileCard
      key={file.id}
      fileInfo={filesInformation[file.id]}
      removeFileHandler={removeFileHandler}
    />
  ));

  return (
    <div className="flex overflow-x-auto file-container hidescrollbar1 hidescrollbar2">
      {listOfFiles}
    </div>
  );
};

export default FileContainer;
