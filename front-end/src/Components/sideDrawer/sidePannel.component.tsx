import React from "react";
import {
  VscFiles,
  VscSettingsGear,
  VscAccount,
  VscSearch,
  VscGitMerge,
  VscDebugAlt,
  VscExtensions
} from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import { setIsDrawerOpen } from "../../Store/reducres/SideDrawer.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";

const Pannel = () => {
  const dispatch = useAppDispatch();
  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);
  const sideDrawerHandler = () => {
    dispatch(setIsDrawerOpen(!isDrawerOpen));
  };
  const isSidePannelPositionOnLeft = useAppSelector(
    (state) => state.sideDrawer.isSidePannelPositionOnLeft
  );

  return (
    <div className="h-full bg-gray-700 flex flex-col justify-between">
      <div className="flex flex-col">
        <div
          className={twMerge(
            " border-gray-700 text-gray-300",
            isDrawerOpen && " border-gray-100 text-white",
            !isSidePannelPositionOnLeft
              ? "border-r-[3px] ml-2"
              : "border-l-[3px] mr-2"
          )}
        >
          <button
            className="flex justify-center items-center p-4 hover:text-white"
            title="Explorer"
            onClick={sideDrawerHandler}
          >
            <VscFiles className=" text-3xl" />
          </button>
        </div>
        <div className="border-gray-700 text-gray-300">
          <button
            className="flex justify-center items-center p-4 hover:text-white"
            title="Explorer"
          >
            <VscSearch className=" text-3xl" />
          </button>
        </div>
        <div className="border-gray-700 text-gray-300">
          <button
            className="flex justify-center items-center p-4 hover:text-white"
            title="Explorer"
          >
            <VscGitMerge className=" text-3xl" />
          </button>
        </div>
        <div className="border-gray-700 text-gray-300">
          <button
            className="flex justify-center items-center p-4 hover:text-white"
            title="Explorer"
          >
            <VscDebugAlt className=" text-3xl" />
          </button>
        </div>
        <div className="border-gray-700 text-gray-300">
          <button
            className="flex justify-center items-center p-4 hover:text-white"
            title="Explorer"
          >
            <VscExtensions className=" text-3xl" />
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <button className="flex justify-center items-center p-4">
          <VscAccount className="text-gray-300 text-3xl" />
        </button>
        <button className="flex justify-center items-center p-4">
          <VscSettingsGear className="text-gray-300 text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default Pannel;
