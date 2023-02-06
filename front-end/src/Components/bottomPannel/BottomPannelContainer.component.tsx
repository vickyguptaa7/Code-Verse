import React, { useRef, useEffect } from "react";
import BottomPannelNavigation from "./BottomPannelNavigation.component";

const MIN_BOTTOM_PANNEL_SIZE_PX=40;

const BottomPannel = () => {
  const refBottomPannel = useRef<HTMLDivElement>(null);
  const refResizer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizableBottomPannel = refBottomPannel.current!;
    let height: number = parseFloat(
      window.getComputedStyle(resizableBottomPannel).height
    );
    let y_cord = 0;
    const onPointerMoveBottomPannelResize = (event: PointerEvent) => {
      const change_y = y_cord-event.clientY ;
      // if change is in desired percentage then only update
      if (
        change_y + height > MIN_BOTTOM_PANNEL_SIZE_PX
      ) {
        height = change_y + height;
        y_cord = event.clientY;
        resizableBottomPannel.style.height = `${height}px`;
      }
    };

    const onPointerUpBottomPannelResize = (event: PointerEvent) => {
      document.removeEventListener("pointermove", onPointerMoveBottomPannelResize);
      document.removeEventListener("pointerup", onPointerUpBottomPannelResize);
    };

    const onPointerDownBottomPannelResize = (event: PointerEvent) => {
      y_cord = event.clientY;
      document.addEventListener("pointerup", onPointerUpBottomPannelResize);
      document.addEventListener("pointermove", onPointerMoveBottomPannelResize);
    };
    const resizerSideDiv = refResizer.current!;
    resizerSideDiv.addEventListener("pointerdown", onPointerDownBottomPannelResize);

    return () => {
      resizerSideDiv.removeEventListener(
        "pointerdown",
        onPointerDownBottomPannelResize
      );
    };
  });
  return (
    <div
      className="flex flex-col bg-gray-900 border-t h-72 border-t-gray-500"
      ref={refBottomPannel}
    >
      <div
        className="w-full h-1 hover:bg-white hover:cursor-move"
        ref={refResizer}
      ></div>

      <BottomPannelNavigation />
    </div>
  );
};

export default BottomPannel;
