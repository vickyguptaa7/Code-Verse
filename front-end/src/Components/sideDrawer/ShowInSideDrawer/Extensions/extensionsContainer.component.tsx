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
          <CollapsibleMenu
            menuName="INSTALLED"
            children={null}
            sibbling={
              <div className="bg-[color:var(--accent-color)] mr-2 px-1.5 rounded-full">
                46
              </div>
            }
          />
          <CollapsibleMenu
            menuName="RECOMMENDED"
            children={null}
            sibbling={
              <div className="bg-[color:var(--accent-color)] mr-2 px-1.5 rounded-full">
                6
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ExtensionsContainer;
