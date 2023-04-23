import CollapsibleMenu from "../../../UI/CollapsibleMenu.component";
import Run from "./Run.component";

const DebugContainer = () => {
  return (
    <div className="flex flex-col justify-start h-full pt-2 text-sm whitespace-nowrap text-[color:var(--highlight-text-color)]">
      <div className="pl-5 mt-1.5 mb-2">
        <h2>RUN AND DEBUG</h2>
      </div>
      <div className="flex flex-col h-full">
        <Run />
        <div className="ml-1 border-t border-[color:var(--border-color)] my-0.5"></div>
        <CollapsibleMenu menuName="BREAKPOINTS" children={null} />
      </div>
    </div>
  );
};

export default DebugContainer;
