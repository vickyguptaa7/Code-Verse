import React, { useState } from "react";
import "./FileNavigation.css";
import { GoPlus } from "react-icons/go";
import Backdrop from "../UI/Backdrop";
import FileList from "./FileContainer";


const FileNavigation = () => {

  const [fileSettings, setFileSettings] = useState(false);

  const showFileSetting = () => {
    setFileSettings(true);
  };
  const hideFileSetting = () => {
    setFileSettings(false);
  };
  // remove the file from the list of created files show in file navigation

  const addFileHandler = () => {};

  return (
    <>
      {fileSettings && <Backdrop onClick={hideFileSetting} />}
      <div className="pt-2 w-full  bg-slate-700 flex items-end gap-2">
        <FileList />
        <div className="flex item-start my-1 mr-2">
          <button
            className="rounded-full overflow-hidden hover:bg-gray-500 p-1"
            onClick={() => {
              showFileSetting();
              addFileHandler();
            }}
          >
            <GoPlus className="text-xl  duration-300 text-white " />
          </button>
        </div>
      </div>
    </>
  );
};

export default FileNavigation;
