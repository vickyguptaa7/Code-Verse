import { useAppSelector } from "../../Store/store";
import Editor from "../Editor/editor.component";
import FileNavigation from "../FileNavigation/FileNavigation.component";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../ErrorBoundary/ErrorBoundary";

const BottomPannelContainer = lazy(
  () => import("../bottomPannel/BottomPannelContainer.component")
);

function Main() {
  const isBottomPannelOpen = useAppSelector(
    (state) => state.bottomPannel.isBottomPannelOpen
  );
  return (
    <>
      <FileNavigation />
      <Editor />
      {/* on reset will perform some task when there will be some error so we can reload the page or we can change the state that is causing the error or something else */}
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        <Suspense fallback={<div>Loading...</div>}>
          {isBottomPannelOpen && <BottomPannelContainer />}
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default Main;
