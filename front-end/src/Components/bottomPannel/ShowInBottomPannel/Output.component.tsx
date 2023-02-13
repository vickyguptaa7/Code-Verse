import React from "react";

interface PROPS_INTEFACE {
  mainDivHeight: number;
}

const Output: React.FC<PROPS_INTEFACE> = ({ mainDivHeight }) => {
  return (
    <div className="text-white">
      <textarea
        name="output"
        id="output"
        className="w-full outline-none resize-none bg-inherit font-cascadia"
        // here 18px subtracted as the parent div have margins and padding so to remove scrolling
        style={{ height: mainDivHeight - 18 }}
        disabled
      >
        Output Will Be Displayed Here...
      </textarea>
    </div>
  );
};

export default Output;
