import { CODE_EDITOR_MIN_HEIGHT } from "../../../../Pages/CodeEditor.page";
import Button from "../../../UI/Button.component";
import CollapsibleMenu from "../../../UI/CollapsibleMenu.component";

const CODEVERSE_INTRO_TO_GIT_URL =
  "https://code.visualstudio.com/docs/sourcecontrol/intro-to-git";
// height adjustment is used to adjust the height of the source control component to fit the side drawer
const HIGHT_ADJUSTMENT = 100;

const SourceControl = () => {

  // height adjustment is done to make the source fit the side drawer
  const height =
    Math.max(document.body.clientHeight, CODE_EDITOR_MIN_HEIGHT) -
    HIGHT_ADJUSTMENT;

  const readDocsHandler = () => {
    window.open(CODEVERSE_INTRO_TO_GIT_URL, "_blank");
  };

  return (
    <div className="flex flex-col">
      <CollapsibleMenu menuName="SOURCE CONTROL" initialState={true}>
        <div
          className="flex flex-col justify-start overflow-y-auto gap-6 break-words whitespace-normal px-4 py-4 text-[color:var(--highlight-text)]"
          style={{ height: height }}
        >
          <Button
            className="bg-[color:var(--primary-color)] w-full py-1.5 px-2 hover:scale-105 duration-300 max-w-xs text-white"
            onClick={() => window.open("http://github.com/", "_blank")}
            title="comming soon..."
          >
            Open Folder
          </Button>
          <div className="flex flex-col gap-4 text-[0.85rem] ">
            <p>
              In order to use git features, you can open a folder containing a
              git repository or clone from a URL.
            </p>
          </div>
          <Button
            className="bg-[color:var(--primary-color)] w-full py-1.5 px-2 hover:scale-105 duration-300 max-w-xs text-white"
            onClick={() => window.open("http://github.com/", "_blank")}
            title="comming soon..."
          >
            Clone Repository
          </Button>
          <div className="flex flex-col gap-4 text-[0.85rem] ">
            <p>
              To learn more about how to use git and source control is code{" "}
              <span
                className="text-[color:var(--accent-color)] cursor-pointer"
                onClick={readDocsHandler}
              >
                read our docs
              </span>
              .
            </p>
          </div>
        </div>
      </CollapsibleMenu>
    </div>
  );
};

export default SourceControl;
