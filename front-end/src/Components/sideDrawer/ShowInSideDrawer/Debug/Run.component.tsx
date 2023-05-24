import { CODE_EDITOR_MIN_HEIGHT } from "../../../../Pages/CodeEditor.page";
import {
  setIsBottomPannelOpen,
  setShowInBottomPannel,
} from "../../../../Store/reducres/BottomPannel/BottomPannel.reducer";
import { useAppDispatch } from "../../../../Store/store";
import Button from "../../../UI/Button.component";
import CollapsibleMenu from "../../../UI/CollapsibleMenu.component";

const CODEVERSE_DEBUG_URL = "https://github.com/vickyguptaa7/Code-Verse";
// height adjustment is used to adjust the height of the run and debug component to fit the side drawer
const HIGHT_ADJUSTMENT = 120;

const Run = () => {
  const dispatch = useAppDispatch();
  
  // height adjustment is used to adjust the height of the debug component to fit the side drawer
  const height = Math.max(document.body.clientHeight, CODE_EDITOR_MIN_HEIGHT) - HIGHT_ADJUSTMENT;

  const openDebugerHandler = () => {
    dispatch(setShowInBottomPannel("debug"));
    dispatch(setIsBottomPannelOpen(true));
  };
  
  const debugDocsHandler = () => {
    window.open(CODEVERSE_DEBUG_URL, "_blank");
  };
  
  return (
    <div>
      <CollapsibleMenu menuName="RUN" initialState={true}>
        <div
          className="flex flex-col overflow-y-auto gap-6 break-words whitespace-normal px-4 py-4  text-[color:var(--highlight-text)]"
          style={{ height: height }}
        >
          <Button
            className="bg-[color:var(--primary-color)] w-full py-1.5 px-2 hover:scale-105 duration-300 max-w-xs text-white"
            onClick={openDebugerHandler}
            title="comming soon..."
          >
            Run and Debug
          </Button>
          <div className="flex flex-col gap-4 text-[0.85rem] ">
            <h3>
              To customize Run and Debug{" "}
              <span
                className="text-[color:var(--accent-color)] cursor-pointer"
                onClick={debugDocsHandler}
              >
                create a launch.json file
              </span>
              .
            </h3>
            <h3>
              <span
                className="text-[color:var(--accent-color)] cursor-pointer"
                onClick={debugDocsHandler}
              >
                Show
              </span>{" "}
              all automatic debug configurations.
            </h3>
          </div>
          <Button
            className="bg-[color:var(--primary-color)] w-full py-1.5 px-2 hover:scale-105 duration-300 max-w-xs text-white"
            onClick={openDebugerHandler}
            title="comming soon..."
          >
            JavaScript Debug Terminal
          </Button>
          <div className="flex flex-col gap-3">
            <p className="text-[0.85rem]">
              You can use the Javascript Debug Terminal to debug Node.js
              processes run on the command line.
            </p>
          </div>
          <Button
            className="bg-[color:var(--primary-color)] w-full py-1.5 px-2 hover:scale-105 duration-300 max-w-xs text-white"
            onClick={openDebugerHandler}
            title="comming soon..."
          >
            Debug URL
          </Button>
        </div>
      </CollapsibleMenu>
    </div>
  );
};

export default Run;
