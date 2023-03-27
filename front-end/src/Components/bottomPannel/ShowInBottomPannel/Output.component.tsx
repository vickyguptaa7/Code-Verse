import React from "react";
import { useAppSelector } from "../../../Store/store";
import TextArea from "../../UI/TextArea.component";

interface PROPS_INTEFACE {
  mainDivHeight: number;
}

const Output: React.FC<PROPS_INTEFACE> = ({ mainDivHeight }) => {
  const outputContent = useAppSelector(
    (state) => state.bottomPannel.outputContent
  );

  return (
    <div className="">
      <TextArea
        inputRef={null}
        name="output"
        className="w-full outline-none resize-none bg-inherit font-cascadia"
        // here 18px subtracted as the parent div have margins and padding so to remove scrolling
        style={{ height: mainDivHeight - 18 }}
        disabled
        placeholder=""
        value={outputContent}
      />
    </div>
  );
};

export default Output;
