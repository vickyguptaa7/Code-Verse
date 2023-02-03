import React from "react";
import { VscFiles, VscSettingsGear,VscAccount } from "react-icons/vsc";
const Pannel = () => {
  return (
    <div className=" w-16 h-full bg-gray-700 flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex justify-center items-center p-4">
          <VscFiles className="text-gray-300 text-3xl" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center items-center p-4">
          <VscAccount className="text-gray-300 text-3xl" />
        </div>
        <div className="flex justify-center items-center p-4">
          <VscSettingsGear className="text-gray-300 text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Pannel;
