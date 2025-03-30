import { useEffect } from "react";
import { useAppSelector } from "../../Store/store";

const useDrag = (ref: React.RefObject<HTMLElement>) => {
  const isBrowserMinimized = useAppSelector(
    (state) => state.browser.isBrowserMinimized
  );
  const isBrowserOpen = useAppSelector((state) => state.browser.isBrowserOpen);
  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    let isDragging = false;
    let startX: number, startY: number, initialX: number, initialY: number;

    const handleMouseDown = (e: MouseEvent) => {
      startX = e.clientX;
      startY = e.clientY;
      const rect = element.getBoundingClientRect();
      initialX = rect.left;
      initialY = rect.top;
      // this is to avoid the resize at the bottom of the browser window
      if (startY - initialY > 50) return;
      isDragging = true;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      element.style.transform = `translate(0px, 0px)`;
      element.style.left = `${initialX + dx}px`;
      element.style.top = `${initialY + dy}px`;
    };

    const handleMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    element.addEventListener("mousedown", handleMouseDown);

    return () => {
      element.removeEventListener("mousedown", handleMouseDown);
    };
  }, [ref, isBrowserOpen, isBrowserMinimized]);
};

export default useDrag;
