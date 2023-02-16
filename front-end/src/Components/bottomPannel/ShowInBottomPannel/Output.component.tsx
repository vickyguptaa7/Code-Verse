import React from "react";
import { useAppSelector } from "../../../Store/store";

interface PROPS_INTEFACE {
  mainDivHeight: number;
}

const Output: React.FC<PROPS_INTEFACE> = ({ mainDivHeight }) => {
  const outputContent = useAppSelector(
    (state) => state.bottomPannel.outputContent
  );
  
  return (
    <div className="">
      <textarea
        name="output"
        id="output"
        className="w-full outline-none resize-none bg-inherit font-cascadia"
        // here 18px subtracted as the parent div have margins and padding so to remove scrolling
        style={{ height: mainDivHeight - 18 }}
        disabled
        placeholder="output will be displayed here..."
        value={outputContent}
      ></textarea>
    </div>
  );
};

export default Output;
