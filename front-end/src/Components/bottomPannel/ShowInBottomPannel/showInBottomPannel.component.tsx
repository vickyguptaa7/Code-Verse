import React from "react";
import { useAppSelector } from "../../../Store/store";
import Debug from "./Debug.component";
import Input from "./Input.component";
import Output from "./Output.component";
import Terminal from "./Terminal.component";

const ShowInBottomPannel = () => {
  const showInBottomPannel = useAppSelector(
    (state) => state.bottomPannel.showInBottomPannel
  );
  if (showInBottomPannel === "input") return <Input />;
  if (showInBottomPannel === "output") return <Output />;
  if (showInBottomPannel === "terminal") return <Terminal />;
  return <Debug />;
};

export default ShowInBottomPannel;
