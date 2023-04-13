import React from "react";

import vscodeImage from "../../Assets/images/visual-studio-code-icons/vscode-alt.svg";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";

const HOME_CONTENT_MIN_SIZE = 200;

interface IPROPS {
  height: number;
}

const Home: React.FC<IPROPS> = ({ height }) => {
  return (
    <div
      className={mergeClass([
        "flex flex-col flex-wrap items-center gap-6 text-white overflow-auto mx-2",
        height + 40 > HOME_CONTENT_MIN_SIZE ? "justify-center" : "",
      ])}
      style={{ height: height + 40 }}
    >
      <div>
        <img src={vscodeImage} className="w-48" alt="" />
      </div>
      <div className="font-sans text-[color:var(--primary-text-color)] flex justify-center items-center gap-1.5">
        <div className="flex flex-col items-end justify-center gap-3 text-sm">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <h3 className="pt-1 ">Go to File</h3>
            <h3>
              <span className="ml-0.5 bg-[color:var(--hover-text-color)] py-1 px-1.5 text-xs rounded-sm text-[color:var(--highlight-text-color)] shadow-sm shadow-[color:var(--primary-text-color)]">
                ⌘
              </span>{" "}
              <span className="ml-0.5 bg-[color:var(--hover-text-color)] py-1 px-1.5 text-xs rounded-sm text-[color:var(--highlight-text-color)] shadow-sm shadow-[color:var(--primary-text-color)]">
                ⇧
              </span>{" "}
              <span className="ml-0.5 bg-[color:var(--hover-text-color)] py-1 px-1.5 text-xs rounded-sm text-[color:var(--highlight-text-color)] shadow-sm shadow-[color:var(--primary-text-color)]">
                P
              </span>
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <h3 className="pt-1 ">Show Terminal</h3>
            <h3>
              <span className="ml-0.5 bg-[color:var(--hover-text-color)] py-1 px-1.5 text-xs rounded-sm text-[color:var(--highlight-text-color)] shadow-sm shadow-[color:var(--primary-text-color)]">
                ⌃
              </span>{" "}
              <span className="ml-0.5 bg-[color:var(--hover-text-color)] py-1 px-1.5 text-xs rounded-sm text-[color:var(--highlight-text-color)] shadow-sm shadow-[color:var(--primary-text-color)]">
                `
              </span>
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <h3 className="pt-1 ">Show Settings</h3>
            <h3>
              <span className="ml-0.5 bg-[color:var(--hover-text-color)] py-1 px-1.5 text-xs rounded-sm text-[color:var(--highlight-text-color)] shadow-sm shadow-[color:var(--primary-text-color)]">
                ⌘
              </span>{" "}
              <span className="ml-0.5 bg-[color:var(--hover-text-color)] py-1 px-1.5 text-xs rounded-sm text-[color:var(--highlight-text-color)] shadow-sm shadow-[color:var(--primary-text-color)]">
                ,
              </span>
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <h3 className="pt-1 ">Full Screen</h3>
            <h3>
              <span className="ml-0.5 bg-[color:var(--hover-text-color)] py-1 px-1.5 text-xs rounded-sm text-[color:var(--highlight-text-color)] shadow-sm shadow-[color:var(--primary-text-color)]">
                ⌃
              </span>{" "}
              <span className="ml-0.5 bg-[color:var(--hover-text-color)] py-1 px-1.5 text-xs rounded-sm text-[color:var(--highlight-text-color)] shadow-sm shadow-[color:var(--primary-text-color)]">
                ⌘
              </span>{" "}
              <span className="ml-0.5 bg-[color:var(--hover-text-color)] py-1 px-1.5 text-xs rounded-sm text-[color:var(--highlight-text-color)] shadow-sm shadow-[color:var(--primary-text-color)]">
                F
              </span>
            </h3>
          </div>
        </div>
        {/* <div className="flex flex-col items-start justify-center gap-3"></div> */}
      </div>
    </div>
  );
};

export default Home;
