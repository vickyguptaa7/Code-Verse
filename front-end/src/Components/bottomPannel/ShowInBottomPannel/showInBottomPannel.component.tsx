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
  const contentShowInBottomPannelHeight =
    bottomPannelHeight - BOTTOM_PANNEL_NAVIGATION_HEIGHT_SIZE_PX;
  let show = <Debug />;
  if (showInBottomPannel === "input")
    show = <Input mainDivHeight={contentShowInBottomPannelHeight} />;
  if (showInBottomPannel === "output") show = <Output mainDivHeight={contentShowInBottomPannelHeight} />;
  if (showInBottomPannel === "terminal") show = <Terminal />;
  return (
    <div
      className="p-1 mx-4 mt-2 overflow-scroll "
      style={{
        height: contentShowInBottomPannelHeight,
      }}
    >
      {show}
    </div>
  );
};

export default ShowInBottomPannel;
