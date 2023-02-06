import React from "react";
import { VscChevronUp, VscClose, VscKebabVertical, VscTrash } from "react-icons/vsc";
import "./BottomPannelNavigation.component.css";

const BottomPannelNavigation = () => {
  return (
    <div className="flex items-center justify-between gap-6 mx-4 my-2 overflow-auto smd:gap-12 hidescrollbar1 hidescrollbar2">
      <div>
        <ul className="flex items-center gap-5 overflow-x-scroll text-sm text-gray-400 justify-evenly">
          <li className="hidden hover:text-white xs:block" title="Input">
            INPUT
          </li>
          <li className="hidden hover:text-white sm:block" title="Output">
            OUTPUT
          </li>
          <li className="hidden hover:text-white smd:block" title="Terminal">
            TERMINAL
          </li>
          <button className="flex items-center justify-center">
            <VscKebabVertical className="text-xl text-gray-300 rotate-90 translate-y-[2px]" />
          </button>
        </ul>
      </div>
      <div className="flex items-start gap-4 justify-evenly">
        <button className="flex items-center justify-center">
          <VscTrash className="text-xl text-gray-300 " />
        </button>
        <button className="flex items-center justify-center">
          <VscChevronUp className="text-xl text-gray-300 " />
        </button>
        <button className="flex items-center justify-center">
          <VscClose className="text-xl text-gray-300 " />
        </button>
      </div>
    </div>
  );
};

export default BottomPannelNavigation;
