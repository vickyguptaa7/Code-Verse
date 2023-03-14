import ExplorerFolder from "./explorerFolder.component";

import { twMerge } from "tailwind-merge";
import CollapsibleMenu from "../../../UI/CollapsibleMenu.component";

const Explorer = () => {
  return (
    <div className="flex flex-col justify-start h-full py-2 text-sm whitespace-nowrap ">
      <div className="pl-3.5 mt-1.5 mb-2">
        <h2>EXPLORER</h2>
      </div>
      <div className={twMerge("flex flex-col h-full")}>
        <ExplorerFolder />
        <CollapsibleMenu menuName="OUTLINE" children={null}/>
        <CollapsibleMenu menuName="TIMELINE" children={null}/>
      </div>
    </div>
  );
};

export default Explorer;
