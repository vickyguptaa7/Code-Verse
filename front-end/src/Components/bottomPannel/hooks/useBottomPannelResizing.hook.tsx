import { useEffect } from "react";
import { CODE_EDITOR_MIN_HEIGHT } from "../../../Pages/CodeEditor.page";
import {
  setBottomPannelHeight,
  setIsMinimizeBottomPannel,
} from "../../../Store/reducres/BottomPannel/BottomPannel.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import {
  BOTTOM_PANNEL_MINIMIZE_PERCENTAGE,
  BOTTOM_PANNEL_MIN_SIZE_PX,
  FOOTER_HIGHT,
  HEIGHT_OF_FILENAVIGATION_AND_FOOTER,
} from "../BottomPannel.Constant";

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
        Math.max(document.body.clientHeight, CODE_EDITOR_MIN_HEIGHT) -
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

    /**
     * This function updates the height of a resizable bottom panel based on the user's pointer
     * movement, with certain constraints on the minimum and maximum height.
     * @param {PointerEvent} event - PointerEvent - an event that is triggered when the pointer device
     * (such as a mouse or touch screen) moves over an element on the screen. It contains information
     * about the position and movement of the pointer, as well as other details such as the type of
     * pointer device being used.
     */
    const onPointerMoveBottomPannelResize = (event: PointerEvent) => {
      const change_y = y_cord - event.clientY;
      // if change is in desired percentage then only update
      if (
        change_y + height > BOTTOM_PANNEL_MIN_SIZE_PX &&
        change_y + height <
          Math.max(document.body.clientHeight, CODE_EDITOR_MIN_HEIGHT) -
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
        Math.max(document.body.clientHeight, CODE_EDITOR_MIN_HEIGHT) -
          HEIGHT_OF_FILENAVIGATION_AND_FOOTER
      ) {
        height =
          Math.max(document.body.clientHeight, CODE_EDITOR_MIN_HEIGHT) -
          HEIGHT_OF_FILENAVIGATION_AND_FOOTER;
        y_cord = HEIGHT_OF_FILENAVIGATION_AND_FOOTER - FOOTER_HIGHT;
      }
      resizableBottomPannel.style.height = `${height}px`;
      // update the new height in the store so that we open the bottom pannel again we get the prev height
      dispatch(
        setBottomPannelHeight(parseFloat(resizableBottomPannel.style.height))
      );
    };

    /**
     * This function handles the event when the user releases the pointer after resizing the bottom
     * panel.
     * @param {PointerEvent} event - A PointerEvent object representing the pointerup event that
     * triggered the function.
     */
    const onPointerUpBottomPannelResize = (event: PointerEvent) => {
      document.removeEventListener(
        "pointermove",
        onPointerMoveBottomPannelResize
      );
      const maxHeightOfBottomPannel =
        Math.max(document.body.clientHeight, CODE_EDITOR_MIN_HEIGHT) -
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

    /**
     * This function sets event listeners and a state variable to indicate that the bottom panel is
     * being resized by the user.
     * @param {PointerEvent} event - PointerEvent - a type of event that is triggered when a pointing
     * device (such as a mouse or touch screen) is used to interact with an element on the web page. In
     * this case, the event is being used to track the vertical position of the pointer when it is
     * clicked on the bottom panel
     */
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
