import React, { useState } from "react";
import { VscChevronRight } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import { useAppDispatch } from "../../../../Store/store";
import {
  setIsBottomPannelOpen,
  setShowInBottomPannel,
} from "../../../../Store/reducres/BottomPannel.reducer";
import Button from "../../../UI/Button.component";

const EDITOR_MIN_HEIGHT = 480;

const Run = () => {
  const [isRunOpen, setIsRunOpen] = useState(true);

  const toggleOutlineHandler = () => {
    setIsRunOpen(!isRunOpen);
  };
  const dispatch = useAppDispatch();
  const onClickHandler = () => {
    dispatch(setShowInBottomPannel("debug"));
    dispatch(setIsBottomPannelOpen(true));
  };
  const height = isRunOpen
    ? Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) - 120
    : 0;

  return (
    <div>
      <div
        className="flex cursor-pointer bg-[color:var(--sidepannel-color)] py-0.5"
        onClick={toggleOutlineHandler}
      >
        <div className="flex items-center justify-center p-1">
          <VscChevronRight className={twMerge(isRunOpen ? "rotate-90" : "")} />
        </div>
        <div className="flex items-center justify-center">
          <h3 className="font-semibold">RUN</h3>
        </div>
      </div>
      {isRunOpen ? (
        <div
          className="flex flex-col overflow-y-scroll gap-6 break-words whitespace-normal px-4 py-4  text-[color:var(--highlight-text)] max-w-2xl"
          style={{ height: height }}
        >
          <Button
            className="bg-[color:var(--accent-color)] w-full py-1.5 px-2 hover:scale-105 duration-300 max-w-xs"
            onClick={onClickHandler}
            title="comming soon..."
          >
            Run and Debug
          </Button>
          <div className="flex flex-col gap-4 text-[0.85rem] ">
            <h3>
              To customize Run and Debug{" "}
              <span className="text-[color:var(--accent-color)]">
                create a launch.json file
              </span>
              .
            </h3>
            <h3>
              <span className="text-[color:var(--accent-color)]">Show</span> all
              automatic debug configurations.
            </h3>
          </div>
          <Button
            className="bg-[color:var(--accent-color)] w-full py-1.5 px-2 hover:scale-105 duration-300 max-w-xs"
            onClick={onClickHandler}
            title="comming soon..."
          >
            JavaScript Debug Terminal
          </Button>
          <div className="flex flex-col gap-3">
            <p className="text-[0.85rem]">
              You can use the Javascript Debug Terminal to debug Node.js
              processes run on the command line.
            </p>
          </div>
          <Button
            className="bg-[color:var(--accent-color)] w-full py-1.5 px-2 hover:scale-105 duration-300 max-w-xs"
            onClick={onClickHandler}
            title="comming soon..."
          >
            Debug URL
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Run;
