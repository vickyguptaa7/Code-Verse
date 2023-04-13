import React from "react";

interface IPROPS {
  height: number;
}

const Setting: React.FC<IPROPS> = ({ height }) => {
  return (
    <div
      className="text-[color:var(--highlight-text-color)] items-center justify-center flex"
      style={{ height: height }}
    >
      Setting
    </div>
  );
};

export default Setting;
