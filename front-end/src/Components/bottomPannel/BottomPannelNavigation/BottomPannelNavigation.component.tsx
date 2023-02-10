import React from "react";
import { VscChevronUp, VscClose, VscEllipsis, VscTrash } from "react-icons/vsc";
import {
  resetBottomPannel,
  setBottomPannelHeight,
  setIsBottomPannelOpen,
  setIsMinimizeBottomPannel,
  setShowInBottomPannel,
} from "../../../Store/reducres/BottomPannel.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import BottomPannelButton from "../bottomPannelButtons.component";
import "./BottomPannelNavigation.component.css";

// constant
import { HEIGHT_OF_FILENAVIGATION_AND_FOOTER } from "../BottomPannel.Constant";

type bottomPannelContent = "input" | "output" | "terminal";

const BottomPannelNavigation = () => {
  const dispatch = useAppDispatch();
  const isMinimizeBottomPannel = useAppSelector(
    (state) => state.bottomPannel.isMinimizeBottomPannel
  );
  const showInBottomPannel = useAppSelector(
    (state) => state.bottomPannel.showInBottomPannel
  );

  const minMaxBottomPannelHandler = () => {
    if (!isMinimizeBottomPannel) {
      const maxHeightOfBottomPannel =
        document.body.clientHeight - HEIGHT_OF_FILENAVIGATION_AND_FOOTER;
      dispatch(setBottomPannelHeight(maxHeightOfBottomPannel));
      dispatch(setIsMinimizeBottomPannel(true));
      return;
    }
    dispatch(setBottomPannelHeight(208));
    dispatch(setIsMinimizeBottomPannel(false));
  };

  const hideBottomPannelHandler = () => {
    dispatch(setIsBottomPannelOpen(false));
  };

  const resetBottomPannelHandler = () => {
    console.log("reset");
    dispatch(resetBottomPannel());
  };

  const showInBottomPannelHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const name = event.currentTarget.getAttribute("data-name")!;
    dispatch(setShowInBottomPannel(name as bottomPannelContent)); // type assertion
  };

  return (
    <div className="flex items-center justify-between gap-6 mx-4 my-2 overflow-auto smd:gap-12 hidescrollbar1 hidescrollbar2">
      <div>
        <ul className="flex items-center gap-5 text-sm text-gray-400 justify-evenly mt-0.5">
          <BottomPannelButton
            className={
              showInBottomPannel === "input"
                ? "border-b border-gray-400 text-white"
                : ""
            }
            dataName="input"
            onClickHandler={showInBottomPannelHandler}
          />
          <BottomPannelButton
            className={
              showInBottomPannel === "output"
                ? "border-b border-gray-400 text-white"
                : ""
            }
            dataName="output"
            onClickHandler={showInBottomPannelHandler}
          />
          <BottomPannelButton
            className={
              showInBottomPannel === "terminal"
                ? "border-b border-gray-400 text-white"
                : ""
            }
            dataName="terminal"
            onClickHandler={showInBottomPannelHandler}
          />
          <BottomPannelButton
            className="flex items-start justify-center -translate-y-0.5"
            hoverBg={false}
            Icon={VscEllipsis}
            onClickHandler={() => {}}
          />
          {dropMenu()}
        </ul>
      </div>
      <div className="flex items-start gap-4 justify-evenly">
        <BottomPannelButton
          Icon={VscTrash}
          onClickHandler={resetBottomPannelHandler}
        />
        <BottomPannelButton
          Icon={VscChevronUp}
          className={isMinimizeBottomPannel ? "rotate-180" : ""}
          onClickHandler={minMaxBottomPannelHandler}
        />
        <BottomPannelButton
          Icon={VscClose}
          onClickHandler={hideBottomPannelHandler}
        />
      </div>
    </div>
  );
};

function dropMenu() {
  return (
    // <div className="absolute inline-flex bg-white border rounded-md">
    //     <div className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
    //         <button
    //           className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
    //         >
    //           ReactJS Dropdown 1
    //         </button>
    //         <button
    //           className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
    //         >
    //           ReactJS Dropdown 2
    //         </button>
    //         <button
    //           className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
    //         >
    //           ReactJS Dropdown 3
    //         </button>
    //   </div>
    // </div>
    <div></div>
  );
}
export default BottomPannelNavigation;
