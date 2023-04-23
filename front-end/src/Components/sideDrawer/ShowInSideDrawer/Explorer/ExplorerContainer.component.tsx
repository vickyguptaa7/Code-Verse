import { mergeClass } from "../../../../library/tailwindMerge/tailwindMerge.lib";
import CollapsibleMenu from "../../../UI/CollapsibleMenu.component";
import ExplorerFolder from "./explorerFolder.component";

const Explorer = () => {
  return (
    <div className="flex flex-col justify-start h-full pt-2 text-sm text-[color:var(--highlight-text-color)] whitespace-nowrap">
      <div className="pl-5 mt-1.5 mb-2">
        <h2>EXPLORER</h2>
      </div>
      <div className={mergeClass(["flex flex-col h-full"])}>
        <ExplorerFolder />
        <div className="ml-1 border-t border-[color:var(--border-color)] my-0.5"></div>
        <CollapsibleMenu menuName="OUTLINE" children={null} />
        <div className="ml-1 border-t border-[color:var(--border-color)] my-0.5"></div>
        <CollapsibleMenu menuName="TIMELINE" children={null} />
      </div>
    </div>
  );
};

export default Explorer;
