import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setIsDrawerOpen } from "../../Store/reducres/SideDrawer.reducer";
import { useAppDispatch } from "../../Store/store";

const Drawer = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // initial value set depending on the url parameter
  useEffect(() => {
    if (location.pathname.includes("/side-drawer/")) {
      dispatch(setIsDrawerOpen(true));
    } else {
      navigate("/");
      dispatch(setIsDrawerOpen(false));
    }
  });

  return (
    <div className="text-white bg-black w-52">
      <Outlet />
    </div>
  );
};

export default Drawer;
