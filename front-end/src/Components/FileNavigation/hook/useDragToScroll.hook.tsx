import { useEffect } from "react";

const useDragToScroll = (cotainerRef: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const container = cotainerRef.current;
      if (container === null) return;
      const mouseDownHandler = (event: MouseEvent) => {
        const startX = event.pageX - container.offsetLeft;
        const scrollLeft = container.scrollLeft;
        const mouseMoveHandler = (event: MouseEvent) => {
          const x = event.pageX - container.offsetLeft;
          const walk = (x - startX) * 2; //scroll-fast
          container.scrollLeft = scrollLeft - walk;
        };
        const mouseUpHandler = (event: MouseEvent) => {
          document.removeEventListener("mousemove", mouseMoveHandler);
          document.removeEventListener("mouseup", mouseUpHandler);
        };
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
      };
      document.addEventListener("mousedown", mouseDownHandler);
      return () => {
        document.removeEventListener("mousedown", mouseDownHandler);
      };
    }, [cotainerRef]);
  };
export default useDragToScroll;  