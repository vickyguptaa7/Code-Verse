import React from "react";
import CollapsibleMenu from "../../../UI/CollapsibleMenu.component";
import SearchExtension from "./SearchExtension.component";

const ExtensionsContainer = () => {
  return (
    <div className="flex flex-col justify-start h-full py-2 text-sm whitespace-nowrap">
      <div className="pl-5 mt-1.5 mb-2">
        <h2>EXTENSIONS</h2>
      </div>
      <div className="flex flex-col h-full gap-3">
        <SearchExtension />
        <div>
          <CollapsibleMenu menuName="INSTALLED" children={null} />
          <CollapsibleMenu menuName="RECOMMENDED" children={null} />
        </div>
      </div>
    </div>
  );
};

export default ExtensionsContainer;
