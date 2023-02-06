import React, { useRef, useEffect } from "react";
import { setBottomPannelHeight } from "../../Store/reducres/BottomPannel.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import BottomPannelNavigation from "./BottomPannelNavigation.component";

// the 56 substracted for the file navigations and the bottom small component
const MIN_BOTTOM_PANNEL_SIZE_PX = 40;
const HEIGHT_OF_FILENAVIGATION_AND_FOOTER = 56;

const BottomPannel = () => {
  const refBottomPannel = useRef<HTMLDivElement>(null);
  const refResizer = useRef<HTMLDivElement>(null);
  const bottomPannelHeight = useAppSelector(
    (state) => state.bottomPannel.bottomPannelHeight
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const manageBottomPannelHeight = () => {
      const currRemainingHeight =
        document.body.clientHeight - HEIGHT_OF_FILENAVIGATION_AND_FOOTER;
      if (currRemainingHeight <= bottomPannelHeight) {
        dispatch(setBottomPannelHeight(currRemainingHeight));
      }
    };
    window.addEventListener("resize", manageBottomPannelHeight);
    return () => {
      window.removeEventListener("resize", manageBottomPannelHeight);
    };
  });

  useEffect(() => {
    const resizableBottomPannel = refBottomPannel.current!;
    let height: number = parseFloat(
      window.getComputedStyle(resizableBottomPannel).height
    );
    let y_cord = 0;
    const onPointerMoveBottomPannelResize = (event: PointerEvent) => {
      const change_y = y_cord - event.clientY;
      // if change is in desired percentage then only update
      if (
        change_y + height > MIN_BOTTOM_PANNEL_SIZE_PX &&
        change_y + height <
          document.body.offsetHeight - HEIGHT_OF_FILENAVIGATION_AND_FOOTER
      ) {
        height = change_y + height;
        y_cord = event.clientY;
        resizableBottomPannel.style.height = `${height}px`;
        // update the new height in the store so that we open the bottom pannel again we get the prev height
        dispatch(
          setBottomPannelHeight(parseFloat(resizableBottomPannel.style.height))
        );
      }
    };

    const onPointerUpBottomPannelResize = (event: PointerEvent) => {
      document.removeEventListener(
        "pointermove",
        onPointerMoveBottomPannelResize
      );
      document.removeEventListener("pointerup", onPointerUpBottomPannelResize);
    };

    const onPointerDownBottomPannelResize = (event: PointerEvent) => {
      y_cord = event.clientY;
      document.addEventListener("pointerup", onPointerUpBottomPannelResize);
      document.addEventListener("pointermove", onPointerMoveBottomPannelResize);
    };
    const resizerSideDiv = refResizer.current!;
    resizerSideDiv.addEventListener(
      "pointerdown",
      onPointerDownBottomPannelResize
    );

    return () => {
      resizerSideDiv.removeEventListener(
        "pointerdown",
        onPointerDownBottomPannelResize
      );
    };
  });
  return (
    <div
    ref={refBottomPannel}
      className="flex flex-col bg-gray-900 border-t h-52 border-t-gray-500"
      style={{height:bottomPannelHeight}}
    >
      <div
        ref={refResizer}
        className="w-full h-1 hover:bg-white hover:cursor-move touch-none"
      ></div>

      <BottomPannelNavigation />
    </div>
  );
};

export default BottomPannel;
