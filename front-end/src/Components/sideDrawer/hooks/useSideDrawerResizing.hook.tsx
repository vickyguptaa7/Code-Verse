import { useEffect } from "react";
import { setSideDrawerWidth } from "../../../Store/reducres/SideDrawer/SideDrawer.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import { SIDE_PANNEL_WIDTH } from "../../sidePannel/SidePannel.constants";
import {
  MAX_DRAWER_SIZE_IN_PERCENT,
  MIN_DRAWER_SIZE_PX,
} from "../sideDrawer.Constant";

const useSideDrawerResizing = (
  setIsDrawerResizing: Function,
  refResizer: React.RefObject<HTMLDivElement>,
  refDrawer: React.RefObject<HTMLDivElement>
) => {
  const dispatch = useAppDispatch();
  const sideDrawerWidth = useAppSelector(
    (state) => state.sideDrawer.sideDrawerWidth
  );
  const isSidePannelPositionOnLeft = useAppSelector(
    (state) => state.sideDrawer.isSidePannelPositionOnLeft
  );

  /* 
  when the screen size changes it manages the drawer size such that drawer is not on the full screen
  and it is not smaller than the minimum size
  */
  useEffect(() => {
    // this function is used to manage the drawer size when the screen size changes
    const manageDrawerWidth = () => {
      const percentChange = (sideDrawerWidth / document.body.clientWidth) * 100;
      const newWidth =
        (document.body.clientWidth * MAX_DRAWER_SIZE_IN_PERCENT) / 100;

      if (
        percentChange > MAX_DRAWER_SIZE_IN_PERCENT &&
        newWidth > MIN_DRAWER_SIZE_PX
      ) {
        dispatch(setSideDrawerWidth(newWidth));
      }
    };

    window.addEventListener("resize", manageDrawerWidth);
    return () => {
      window.removeEventListener("resize", manageDrawerWidth);
    };
  }, [dispatch, sideDrawerWidth]);

  // this is used to resize the drawer when the resizer is dragged left or right by the user
  useEffect(() => {
    const resizableDrawer = refDrawer.current!;

    // remove the px from the width thats why parseInt(,10)
    let width: number = parseFloat(
      window.getComputedStyle(resizableDrawer).width
    );

    let x_cord = 0;

    // when pointer move the drawer is resized (here move means drag + click)
    const onPointerMoveSideResize = (event: PointerEvent) => {
      // get the change in x cordinate
      const change_x = isSidePannelPositionOnLeft
        ? event.clientX - x_cord
        : x_cord - event.clientX;

      // get the percentage change in width
      const percentChange =
        ((change_x + width) / document.body.clientWidth) * 100;

      /*
      if change is in desired percentage then only update the width and x_cord
      else if change is less than minimum size then set the width to minimum size and update the x_cord accordingly
      else if change is more than maximum size then set the width to maximum size and update the x_cord accordingly
      x_cord is updated depending on the sideDrawer position left or right
      x_cord store's the position of the x coordinate where the resizing ends or the resizer element  position
      */
      if (
        change_x + width > MIN_DRAWER_SIZE_PX &&
        MAX_DRAWER_SIZE_IN_PERCENT > percentChange
      ) {
        width = change_x + width;
        x_cord = event.clientX;
      } else if (change_x + width < MIN_DRAWER_SIZE_PX) {
        width = MIN_DRAWER_SIZE_PX;
        x_cord = isSidePannelPositionOnLeft
          ? SIDE_PANNEL_WIDTH + MIN_DRAWER_SIZE_PX
          : document.body.clientWidth -
            (SIDE_PANNEL_WIDTH + MIN_DRAWER_SIZE_PX);
      } else if (MAX_DRAWER_SIZE_IN_PERCENT < percentChange) {
        width = (document.body.clientWidth * MAX_DRAWER_SIZE_IN_PERCENT) / 100;
        x_cord = isSidePannelPositionOnLeft
          ? SIDE_PANNEL_WIDTH + width
          : document.body.clientWidth - (SIDE_PANNEL_WIDTH + width);
      }

      // update the width of the drawer
      resizableDrawer.style.width = `${width}px`;

      // update the new widht in the store so that we open the drawer again we get the prev width
      dispatch(setSideDrawerWidth(width));
    };

    // when pointer up the resizing is stopped and remove the move and up event listeners
    const onPointerUpSideResize = (event: PointerEvent) => {
      document.removeEventListener("pointermove", onPointerMoveSideResize);
      document.removeEventListener("pointerup", onPointerUpSideResize);
      setIsDrawerResizing(false);
    };

    // when pointer down the resizing is started and add the move and up event listeners
    const onPointerDownSideResize = (event: PointerEvent) => {
      x_cord = event.clientX;
      document.addEventListener("pointerup", onPointerUpSideResize);
      document.addEventListener("pointermove", onPointerMoveSideResize);
      setIsDrawerResizing(true);
    };

    // add the pointer down event listener to the resizer element
    const resizerSideDiv = refResizer.current!;
    resizerSideDiv.addEventListener("pointerdown", onPointerDownSideResize);

    return () => {
      resizerSideDiv.removeEventListener(
        "pointerdown",
        onPointerDownSideResize
      );
    };
  }, [
    dispatch,
    refDrawer,
    refResizer,
    setIsDrawerResizing,
    isSidePannelPositionOnLeft,
  ]);
};

export default useSideDrawerResizing;
