import React, { useRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  setBottomPannelHeight,
  setIsMinimizeBottomPannel,
} from "../../Store/reducres/BottomPannel.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import BottomPannelNavigation from "./BottomPannelNavigation/BottomPannelNavigation.component";
import ShowInBottomPannel from "./ShowInBottomPannel/showInBottomPannel.component";

// constants
import { BOTTOM_PANNEL_MIN_SIZE_PX } from "./BottomPannel.Constant";
import { HEIGHT_OF_FILENAVIGATION_AND_FOOTER } from "./BottomPannel.Constant";
import { BOTTOM_PANNEL_MINIMIZE_PERCENTAGE } from "./BottomPannel.Constant";

const BottomPannel = () => {
  const refBottomPannel = useRef<HTMLDivElement>(null);
  const refResizer = useRef<HTMLDivElement>(null);
  const bottomPannelHeight = useAppSelector(
    (state) => state.bottomPannel.bottomPannelHeight
  );
  const [isBottomPannelResizing, setIsBottomPannelResizing] = useState(false);

  // manages the resizing of the component
  useBottomPannelResizing(
    setIsBottomPannelResizing,
    refBottomPannel,
    refResizer
  );

  return (
    <div
      ref={refBottomPannel}
      className="flex flex-col bg-[color:var(--bottompannel-color)] border-t h-52 border-t-[color:var(--primary-text-color)]"
      style={{ height: bottomPannelHeight }}
    >
      <div
        ref={refResizer}
        className={twMerge(
          "w-full h-1 duration-300 hover:bg-[color:var(--accent-color)] hover:cursor-move touch-none",
          isBottomPannelResizing && "bg-[color:var(--accent-color)]"
        )}
      ></div>
      <BottomPannelNavigation />
      <ShowInBottomPannel />
    </div>
  );
};

function useBottomPannelResizing(
  setIsBottomPannelResizing: Function,
  refBottomPannel: React.RefObject<HTMLDivElement>,
  refResizer: React.RefObject<HTMLDivElement>
) {
  const dispatch = useAppDispatch();
  const isBottomPannelHeightMoreThan90Percent = useAppSelector(
    (state) => state.bottomPannel.isMinimizeBottomPannel
  );
  const bottomPannelHeight = useAppSelector(
    (state) => state.bottomPannel.bottomPannelHeight
  );
  // window resize event for the screen resize to adjust the pannel height
  useEffect(() => {
    const manageBottomPannelHeight = () => {
      const maxHeightOfBottomPannel =
        document.body.clientHeight - HEIGHT_OF_FILENAVIGATION_AND_FOOTER;
      if (maxHeightOfBottomPannel <= bottomPannelHeight) {
        dispatch(setBottomPannelHeight(maxHeightOfBottomPannel));
      } else {
        const percentChange =
          (bottomPannelHeight / maxHeightOfBottomPannel) * 100;

        // update the state only if requre
        if (
          percentChange > BOTTOM_PANNEL_MINIMIZE_PERCENTAGE &&
          !isBottomPannelHeightMoreThan90Percent
        )
          dispatch(setIsMinimizeBottomPannel(true));

        if (
          percentChange < BOTTOM_PANNEL_MINIMIZE_PERCENTAGE &&
          isBottomPannelHeightMoreThan90Percent
        )
          dispatch(setIsMinimizeBottomPannel(false));
      }
    };
    window.addEventListener("resize", manageBottomPannelHeight);
    return () => {
      window.removeEventListener("resize", manageBottomPannelHeight);
    };
  });

  // pointer events for resizing the pannel
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
        change_y + height > BOTTOM_PANNEL_MIN_SIZE_PX &&
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
      const maxHeightOfBottomPannel =
        document.body.clientHeight - HEIGHT_OF_FILENAVIGATION_AND_FOOTER;
      const percentChange = (height / maxHeightOfBottomPannel) * 100;
      // update the isBottomPannelHeightMoreThan90%
      if (
        percentChange > BOTTOM_PANNEL_MINIMIZE_PERCENTAGE &&
        !isBottomPannelHeightMoreThan90Percent
      ) {
        dispatch(setIsMinimizeBottomPannel(true));
      }
      if (
        percentChange < BOTTOM_PANNEL_MINIMIZE_PERCENTAGE &&
        isBottomPannelHeightMoreThan90Percent
      ) {
        dispatch(setIsMinimizeBottomPannel(false));
      }
      document.removeEventListener("pointerup", onPointerUpBottomPannelResize);
      setIsBottomPannelResizing(false);
    };

    const onPointerDownBottomPannelResize = (event: PointerEvent) => {
      y_cord = event.clientY;
      document.addEventListener("pointerup", onPointerUpBottomPannelResize);
      document.addEventListener("pointermove", onPointerMoveBottomPannelResize);
      setIsBottomPannelResizing(true);
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
}

export default BottomPannel;
