import { useAppDispatch } from "../../../../Store/store";
import {
  setIsBottomPannelOpen,
  setShowInBottomPannel,
} from "../../../../Store/reducres/BottomPannel/BottomPannel.reducer";
import Button from "../../../UI/Button.component";
import CollapsibleMenu from "../../../UI/CollapsibleMenu.component";

const EDITOR_MIN_HEIGHT = 480;
const VCSCODE_DEBUG_URL = "https://code.visualstudio.com/docs/editor/debugging";

const Run = () => {
  const dispatch = useAppDispatch();

  const openDebugerHandler = () => {
    dispatch(setShowInBottomPannel("debug"));
    dispatch(setIsBottomPannelOpen(true));
  };
  const debugDocsHandler = () => {
    window.open(VCSCODE_DEBUG_URL, "_blank");
  };
  const height = Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) - 120;

  return (
    <div>
      <CollapsibleMenu menuName="RUN" initialState={true}>
        <div
          className="flex flex-col overflow-y-scroll gap-6 break-words whitespace-normal px-4 py-4  text-[color:var(--highlight-text)]"
          style={{ height: height }}
        >
          <Button
            className="bg-[color:var(--accent-color)] w-full py-1.5 px-2 hover:scale-105 duration-300 max-w-xs"
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
            className="bg-[color:var(--accent-color)] w-full py-1.5 px-2 hover:scale-105 duration-300 max-w-xs"
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
            className="bg-[color:var(--accent-color)] w-full py-1.5 px-2 hover:scale-105 duration-300 max-w-xs"
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
