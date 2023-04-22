import React from "react";
import vscodeImg from "./../../../Assets/images/visual-studio-code-icons/vscode.svg";
import "./Loader.styles.css";
interface IPROPS {
  type: "spinner" | "loading" | "editorLoader";
}

const Loader: React.FC<IPROPS> = ({ type }) => {
  if (type === "spinner")
    return (
      <div className="flex items-center justify-center mt-5">
        <div className="loader animate-spin bg-red w-6 aspect-square border-[0.2rem] border-[color:var(--accent-color)] border-t-[0.4rem] border-t-transparent rounded-full"></div>
      </div>
    );
  if (type === "editorLoader") {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-4 bg-[color:var(--codeeditor-color)]">
        <img
          src={vscodeImg}
          className="w-16 animate-bounce"
          alt="Loading..."
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 bg-[color:var(--codeeditor-color)]">
      <img src={vscodeImg} className="" alt="Loading..." />
      <div className="w-32 overflow-hidden bg-gray-200 rounded-lg">
        <div className="rounded-full moving-div"></div>
      </div>
    </div>
  );
};

export default Loader;
