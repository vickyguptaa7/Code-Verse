import React from "react";
import { useAppSelector } from "../../../Store/store";
import Debug from "./Debug.component";
import Input from "./Input.component";
import Output from "./Output.component";
import Terminal from "./Terminal.component";

//constant
import { BOTTOM_PANNEL_NAVIGATION_HEIGHT_SIZE_PX } from "../BottomPannel.Constant";

const ShowInBottomPannel = () => {
  const bottomPannelHeight = useAppSelector(
    (state) => state.bottomPannel.bottomPannelHeight
  );
  const showInBottomPannel = useAppSelector(
    (state) => state.bottomPannel.showInBottomPannel
  );
  if (showInBottomPannel === "input") return <Input />;
  if (showInBottomPannel === "output") return <Output />;
  if (showInBottomPannel === "terminal") return <Terminal />;
  return (
    <div
      className="p-1 mx-4 mt-2 overflow-scroll "
      style={{ height: bottomPannelHeight - BOTTOM_PANNEL_NAVIGATION_HEIGHT_SIZE_PX }}
    >
      <Debug />;
    </div>
  );
};

export default ShowInBottomPannel;
