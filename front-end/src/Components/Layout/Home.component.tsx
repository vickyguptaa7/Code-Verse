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
        "flex flex-col flex-wrap items-center gap-4 text-white overflow-auto",
        height + 40 > HOME_CONTENT_MIN_SIZE ? "justify-center" : "",
      ])}
      style={{ height: height + 40 }}
    >
      <div>
        <img src={vscodeImage} className="w-48" alt="" />
      </div>
      <div className="text-[color:var(--primary-text-color)] flex justify-center items-center gap-1.5">
        <div className="flex flex-col items-end justify-center gap-3 text-sm">
          <h3 className="py-0.5">Go to File</h3>
          <h3 className="py-0.5">Find In Files</h3>
          <h3 className="py-0.5">Show Terminal</h3>
          <h3 className="py-0.5">Show Settings</h3>
        </div>
        <div className="flex flex-col items-start justify-center gap-3">
          <h3>
            <span className="ml-0.5 bg-[color:var(--hover-text-color)] px-1 py-0.5 text-xs rounded-sm text-[color:var(--highlight-text-color)]">
              ⌘
            </span>{" "}
            <span className="ml-0.5 bg-[color:var(--hover-text-color)] px-1 py-0.5 text-xs rounded-sm text-[color:var(--highlight-text-color)]">
              P
            </span>
          </h3>
          <h3>
            <span className="ml-0.5 bg-[color:var(--hover-text-color)] px-1 py-0.5 text-xs rounded-sm text-[color:var(--highlight-text-color)]">
              ⇧
            </span>{" "}
            <span className="ml-0.5 bg-[color:var(--hover-text-color)] px-1 py-0.5 text-xs rounded-sm text-[color:var(--highlight-text-color)]">
              ⌘
            </span>{" "}
            <span className="ml-0.5 bg-[color:var(--hover-text-color)] px-1 py-0.5 text-xs rounded-sm text-[color:var(--highlight-text-color)]">
              F
            </span>
          </h3>
          <h3>
            <span className="ml-0.5 bg-[color:var(--hover-text-color)] px-1 py-0.5 text-xs rounded-sm text-[color:var(--highlight-text-color)]">
              ⌃
            </span>{" "}
            <span className="ml-0.5 bg-[color:var(--hover-text-color)] px-1 py-0.5 text-xs rounded-sm text-[color:var(--highlight-text-color)]">
              ~
            </span>
          </h3>
          <h3>
            <span className="ml-0.5 bg-[color:var(--hover-text-color)] px-1 py-0.5 text-xs rounded-sm text-[color:var(--highlight-text-color)]">
              ⌘
            </span>{" "}
            <span className="ml-0.5 bg-[color:var(--hover-text-color)] px-1 py-0.5 text-xs rounded-sm text-[color:var(--highlight-text-color)]">
              &nbsp;,&nbsp;
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
