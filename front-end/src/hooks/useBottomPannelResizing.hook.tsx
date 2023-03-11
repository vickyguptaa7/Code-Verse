import { useEffect } from "react";
import {
  BOTTOM_PANNEL_MINIMIZE_PERCENTAGE,
  BOTTOM_PANNEL_MIN_SIZE_PX,
  FOOTER_HIGHT,
  HEIGHT_OF_FILENAVIGATION_AND_FOOTER,
} from "../Components/bottomPannel/BottomPannel.Constant";
import {
  setBottomPannelHeight,
  setIsMinimizeBottomPannel,
} from "../Store/reducres/BottomPannel/BottomPannel.reducer";
import { useAppDispatch, useAppSelector } from "../Store/store";

const EDITOR_MIN_HEIGHT = 480;

const useBottomPannelResizing = (
  setIsBottomPannelResizing: Function,
  refBottomPannel: React.RefObject<HTMLDivElement>,
  refResizer: React.RefObject<HTMLDivElement>
) => {
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
        Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) -
        HEIGHT_OF_FILENAVIGATION_AND_FOOTER;
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
  }, [dispatch, bottomPannelHeight, isBottomPannelHeightMoreThan90Percent]);

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
          Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) -
            HEIGHT_OF_FILENAVIGATION_AND_FOOTER
      ) {
        height = change_y + height;
        y_cord = event.clientY;
      } else if (change_y + height < BOTTOM_PANNEL_MIN_SIZE_PX) {
        height = BOTTOM_PANNEL_MIN_SIZE_PX;
        y_cord =
          document.body.clientHeight - BOTTOM_PANNEL_MIN_SIZE_PX - FOOTER_HIGHT;
      } else if (
        change_y + height >
        Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) -
          HEIGHT_OF_FILENAVIGATION_AND_FOOTER
      ) {
        height =
          Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) -
          HEIGHT_OF_FILENAVIGATION_AND_FOOTER;
        y_cord = HEIGHT_OF_FILENAVIGATION_AND_FOOTER - FOOTER_HIGHT;
      }
      resizableBottomPannel.style.height = `${height}px`;
      // update the new height in the store so that we open the bottom pannel again we get the prev height
      dispatch(
        setBottomPannelHeight(parseFloat(resizableBottomPannel.style.height))
      );
    };

    const onPointerUpBottomPannelResize = (event: PointerEvent) => {
      document.removeEventListener(
        "pointermove",
        onPointerMoveBottomPannelResize
      );
      const maxHeightOfBottomPannel =
        Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) -
        HEIGHT_OF_FILENAVIGATION_AND_FOOTER;
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
  }, [
    dispatch,
    refBottomPannel,
    refResizer,
    isBottomPannelHeightMoreThan90Percent,
    setIsBottomPannelResizing,
  ]);
};
export default useBottomPannelResizing;
