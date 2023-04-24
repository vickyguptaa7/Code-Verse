import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAppSelector } from "../../../Store/store";
import { ErrorFallback } from "../../ErrorBoundary/ErrorBoundary";
import { BOTTOM_PANNEL_NAVIGATION_HEIGHT_SIZE_PX } from "../BottomPannel.Constant";
import Debug from "./Debug/Debug.component";
import Input from "./Input/Input.component";
import Output from "./Output/Output.component";
import Terminal from "./Terminal/Terminal.component";
import { useTerminal } from "./Terminal/hook/useTerminal.hook";

const ShowInBottomPannel = () => {
  const bottomPannelHeight = useAppSelector(
    (state) => state.bottomPannel.bottomPannelHeight
  );
  const showInBottomPannel = useAppSelector(
    (state) => state.bottomPannel.showInBottomPannel
  );
  const contentShowInBottomPannelHeight =
    bottomPannelHeight - BOTTOM_PANNEL_NAVIGATION_HEIGHT_SIZE_PX;

  const { terminalActions } = useTerminal();

  // show the component that is selected in the bottom pannel navigation
  let show = <Debug />;
  if (showInBottomPannel === "input")
    show = <Input mainDivHeight={contentShowInBottomPannelHeight} />;
  if (showInBottomPannel === "output")
    show = <Output mainDivHeight={contentShowInBottomPannelHeight} />;
  if (showInBottomPannel === "terminal")
    show = <Terminal terminalActions={terminalActions} />;

  return (
    <div
      className="p-1 mx-4 mt-2 text-[color:var(--tertiary-text-color)] font-[400] font-cascadia"
      style={{
        height: contentShowInBottomPannelHeight,
      }}
    >
      {/* on reset will perform some task when there will be some error so we can reload the page or we can change the state that is causing the error or something else */}
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        <Suspense fallback={<div>Loading...</div>}>{show}</Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ShowInBottomPannel;
