import React from "react";
import ReactDOM from "react-dom";

interface BackdropProps {
  onClick: Function;
}
const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
  const content = (
    <div
      className="w-screen h-screen z-10 fixed bg-black top-0 left-0 bg-opacity-70"
      onClick={() => onClick()}
    ></div>
  );
  const overlay = document.getElementById("backdrop-hook");
  return overlay ? ReactDOM.createPortal(content, overlay) : null;
};

export default Backdrop;
