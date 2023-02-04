import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { setIsDrawerOpen } from "../../Store/reducres/SideDrawer.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";

interface IPROPS {
  Icon: React.ElementType;
  to?: string;
}

const PannelButtons: React.FC<IPROPS> = ({ Icon, to }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSidePannelPositionOnLeft = useAppSelector(
    (state) => state.sideDrawer.isSidePannelPositionOnLeft
  );
  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);
  const dispatch = useAppDispatch();
  const sideDrawerHandler = (showDrawer: boolean) => {
    dispatch(setIsDrawerOpen(showDrawer));
  };
  if (to) {
    // handling the opening and closing of the drawer based on the path to and the
    // current state of the drawer
    const handleSideDrawer = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      // match the current and old url depend on which we close or open the drawer
      if (to === location.pathname.substring(1)) {
        // when drawer is opne the only close and move to / url
        if (isDrawerOpen) sideDrawerHandler(false);
        navigate("/");
      } else {
        // when drawer is close then only open the drawer and move to new url
        if (!isDrawerOpen) sideDrawerHandler(true);
        navigate(to);
      }
    };
    const basicClassName =
      " flex items-center justify-center p-4 hover:text-white mx-[3px] ";
    let activeClassName = twMerge(
      basicClassName,
      "text-white",
      !isSidePannelPositionOnLeft
        ? "border-r-[3px] mr-0"
        : "border-l-[3px] ml-0"
    );
    return (
      <div className="text-gray-400 border-gray-700">
        <NavLink
          to={to}
          onClick={handleSideDrawer}
          className={({ isActive }) =>
            isActive ? activeClassName : basicClassName
          }
          // classNam=""
        >
          <Icon className="text-3xl" />
        </NavLink>
      </div>
    );
  }
  return (
    <div className="text-gray-400 border-gray-700">
      <button className="flex items-center justify-center p-4 hover:text-white">
        <Icon className="text-3xl" />
      </button>
    </div>
  );
};
/*
<div
          className={twMerge(
            " border-gray-700 text-gray-300",
            isDrawerOpen && " border-gray-100 text-white",
            !isSidePannelPositionOnLeft
              ? "border-r-[3px] ml-[3px]"
              : "border-l-[3px] mr-[3px]"
          )}
        >
          <button
            className="flex items-center justify-center p-4 hover:text-white"
            title="Explorer"
            onClick={sideDrawerHandler}
          >
            <VscFiles className="" />
          </button>
        </div>
*/

export default PannelButtons;
