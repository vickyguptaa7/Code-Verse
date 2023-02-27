import React from "react";
import { useAppSelector } from "../../../../Store/store";
import FileDirectory from "./fileDirectory.compoent";

const FileDrawer = () => {
  const directories = useAppSelector(
    (state) => state.fileDirectory.directories
  );
  return (
    <div className="flex flex-col justify-start py-2 gap-0.5 whitespace-nowrap text-sm">
      <FileDirectory directoryInfo={directories} shiftAmount={0} />
    </div>
  );
};

export default FileDrawer;
