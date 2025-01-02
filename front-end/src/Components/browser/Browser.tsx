import { useRef, useState } from "react";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";
import { useAppSelector } from "../../Store/store";
import BrowserNavbar from "./components/BrowserNavbar";
import useDrag from "./useDrag";

const Browser = () => {
  const ref = useRef(null);
  const [oldStateOfBrowser, setOldStateOfBrowser] = useState({
    x: "100px",
    y: "100px",
    width: "200px",
    height: "200px",
  });
  const isBrowserMinimized = useAppSelector(
    (state) => state.browser.isBrowserMinimized
  );
  const isBrowserOpen = useAppSelector((state) => state.browser.isBrowserOpen);
  const isFullScreen = useAppSelector((state) => state.browser.isFullScreen);

  useDrag(ref);

  if (!isBrowserMinimized || !isBrowserOpen) return null;

  return (
    <section
      ref={ref}
      className={mergeClass([
        isFullScreen
          ? "absolute z-50 top-0 left-0 w-full h-full"
          : "absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col overflow-hidden bg-white  rounded-br-sm resize rounded-bl-md rounded-t-md w-96 h-96",
      ])}
    >
      <BrowserNavbar
        parentRef={ref}
        oldStateOfBrowser={oldStateOfBrowser}
        setOldStateOfBrowser={setOldStateOfBrowser}
      />
      <iframe
        src="https://vickygupta.netlify.app/"
        className=""
        width="100%"
        height="93%"
      ></iframe>
    </section>
  );
};

export default Browser;
