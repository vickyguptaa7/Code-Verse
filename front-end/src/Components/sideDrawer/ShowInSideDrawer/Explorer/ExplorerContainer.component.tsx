import Outline from "./outline.component";
import Timeline from "./timeline.component";
import ExplorerFolder from "./explorerFolder.component";

import { twMerge } from "tailwind-merge";

const Explorer = () => {
  return (
    <div className="flex flex-col justify-start h-full py-2 text-sm whitespace-nowrap ">
      <div className="pl-3.5 mt-1.5 mb-2">
        <h2>EXPLORER</h2>
      </div>
      <div className={twMerge("flex flex-col h-full")}>
        <ExplorerFolder />
        <Outline />
        <Timeline />
      </div>
    </div>
  );
};

export default Explorer;
