import { FiMinimize2 } from "react-icons/fi";
import { GoDash } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import { TbReload } from "react-icons/tb";
import {
  setIsBrowserMinimized,
  setIsBrowserOpen,
  setIsFullScreen,
} from "../../../Store/reducres/SideDrawer/Browser/Browser.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import Button from "../../UI/Button.component";

interface IInterface {
  parentRef: React.RefObject<HTMLDivElement>;
  oldStateOfBrowser: {
    x: string;
    y: string;
    width: string;
    height: string;
  };
  setOldStateOfBrowser: React.Dispatch<
    React.SetStateAction<{
      x: string;
      y: string;
      width: string;
      height: string;
    }>
  >;
}

const BrowserNavbar = ({
  parentRef,
  oldStateOfBrowser,
  setOldStateOfBrowser,
}: IInterface) => {
  const dispatch = useAppDispatch();
  const isFullScreen = useAppSelector((state) => state.browser.isFullScreen);
  const browserCloseHandler = () => {
    dispatch(setIsBrowserOpen(false));
  };

  const browserMinimizedHandler = () => {
    dispatch(setIsBrowserMinimized(false));
  };

  const browserFullScreenHandler = () => {
    dispatch(setIsFullScreen(!isFullScreen));
    if (!isFullScreen && parentRef.current) {
      setOldStateOfBrowser({
        x: parentRef.current.style.left,
        y: parentRef.current.style.top,
        width: parentRef.current.style.width,
        height: parentRef.current.style.height,
      });
      parentRef.current.style.left = "0px";
      parentRef.current.style.top = "0px";
      parentRef.current.style.width = "100%";
      parentRef.current.style.height = "100%";
      parentRef.current.style.transform = `translate(0px, 0px)`;
    } else if (parentRef.current) {
      parentRef.current.style.left = oldStateOfBrowser.x;
      parentRef.current.style.top = oldStateOfBrowser.y;
      parentRef.current.style.width = oldStateOfBrowser.width;
      parentRef.current.style.height = oldStateOfBrowser.height;
      parentRef.current.style.transform = `translate(0px, 0px)`;
    }
  };

  return (
    <nav className="flex items-center justify-between gap-4 p-2.5 bg-white border-b border-b-gray-200">
      <div className="flex gap-x-1.5 group">
        <Button
          className="flex items-center justify-center w-3 h-3 bg-red-500 rounded-full"
          onClick={browserCloseHandler}
        >
          <MdOutlineClose
            className="invisible text-white group-hover:visible"
            size="10"
          />
        </Button>
        <Button
          className="flex items-center justify-center w-3 h-3 bg-yellow-500 rounded-full"
          onClick={browserMinimizedHandler}
        >
          <GoDash
            className="invisible text-white group-hover:visible"
            size="10"
          />
        </Button>
        <Button
          className="flex items-center justify-center w-3 h-3 bg-green-500 rounded-full"
          onClick={browserFullScreenHandler}
        >
          <FiMinimize2
            className="invisible text-white group-hover:visible"
            size="9"
          />
        </Button>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between w-full px-1.5 text-sm text-gray-500 bg-gray-100 rounded-md h-7">
          <p className="">localhost:3000</p>{" "}
          <Button className="p-1 rounded-md hover:bg-gray-200">
            <TbReload className="" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default BrowserNavbar;
