import { useEffect } from "react";

const useDragToScroll = (cotainerRef: React.RefObject<HTMLDivElement>) => {
  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it
    is used to add event listeners for mouse events (`mousedown`, `mousemove`, and `mouseup`) to the
    document object. When the `mousedown` event is triggered, it sets up two event listeners for
    `mousemove` and `mouseup` events. The `mousemove` event listener calculates the distance the
    mouse has moved horizontally and scrolls the container element accordingly. The `mouseup` event
    listener removes the `mousemove` and `mouseup` event listeners from the document object.
    Finally, the `useEffect` hook returns a cleanup function that removes the `mousedown` event
    listener from the document object. This hook is used to implement drag-to-scroll functionality
    for a container element. */
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
