import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import FileNavigation from "../Components/FileNavigation/FileNavigation.component";
import SideDrawer from "../Components/sideDrawer/sideDrawer.component";
import { twMerge } from "tailwind-merge";

const CodeEditor = () => {
  const drawerRef = useRef<HTMLDivElement>(null);
  
  const [drawerWidth, setDrawerWidht] = useState<number>(0);

  useLayoutEffect(() => {
    setDrawerWidht(drawerRef.current ? drawerRef.current.clientWidth : 0);
  });

  console.log(drawerWidth);
  let newWidth = `w-[calc(100%-190px)]`;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex h-full">
        <div className="right w-fit" ref={drawerRef}>
          <SideDrawer />
        </div>
        <div
          className={twMerge("left flex flex-col justify-between", newWidth)}
        >
          <FileNavigation />
          <div className="code-here bg-gray-200  h-full grow"></div>
        </div>
      </div>
      <div className=" bg-gray-700 h-4"></div>
    </div>
  );
};

export default CodeEditor;
