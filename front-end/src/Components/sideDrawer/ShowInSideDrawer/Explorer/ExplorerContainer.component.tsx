import ExplorerFolder from "./explorerFolder.component";

import CollapsibleMenu from "../../../UI/CollapsibleMenu.component";
import { mergeClass } from "../../../../library/tailwindMerge/tailwindMerge.lib";

const Explorer = () => {
  return (
    <div className="flex flex-col justify-start h-full pt-2 text-sm whitespace-nowrap ">
      <div className="pl-5 mt-1.5 mb-2">
        <h2>EXPLORER</h2>
      </div>
      <div className={mergeClass(["flex flex-col h-full"])}>
        <ExplorerFolder />
        <CollapsibleMenu menuName="OUTLINE" children={null}/>
        <CollapsibleMenu menuName="TIMELINE" children={null}/>
      </div>
    </div>
  );
};

export default Explorer;
