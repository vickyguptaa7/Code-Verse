import React from "react";

import vscodeImage from "../../../Assets/images/visual-studio-code-icons/vscode-alt.svg";
import { mergeClass } from "../../../library/tailwindMerge/tailwindMerge.lib";

const HOME_CONTENT_MIN_SIZE = 200;

interface IPROPS {
  height: number;
}

const Home: React.FC<IPROPS> = ({ height }) => {
  return (
    <div
      className={mergeClass([
        "flex flex-col flex-wrap items-center gap-6 text-white overflow-auto",
        height + 40 > HOME_CONTENT_MIN_SIZE ? "justify-center" : "",
      ])}
      style={{ height: height + 40 }}
    >
      <div className="m-2">
        <img src={vscodeImage} className="w-48" alt="" />
      </div>
      <div className="font-sans text-[color:var(--primary-text-color)] flex justify-center items-center gap-1.5">
        <div className="flex flex-col items-end justify-center gap-3 m-4 text-sm">
          <ShortcutCard title="Show Terminal" shortcutKeys={["⌘", "⇧", "P"]} />
          <ShortcutCard title="Show Terminal" shortcutKeys={["⌃", "`"]} />
          <ShortcutCard title="Show Settings" shortcutKeys={["⌘", ","]} />
          <ShortcutCard title="Full Screen" shortcutKeys={["⌘", "⇧", "F"]} />
        </div>
      </div>
    </div>
  );
};

function ShortcutCard(props: { title: string; shortcutKeys: Array<string> }) {
  const { title, shortcutKeys } = props;
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <h3 className="pt-1 ">{title}</h3>
      <h3 className="flex gap-1">
        {shortcutKeys.map((key) => {
          return (
            <span
              id={key}
              className="ml-0.5 bg-[color:var(--hover-text-color)] py-1 px-1.5 text-xs rounded-sm text-[color:var(--highlight-text-color)] shadow-sm shadow-[color:var(--primary-text-color)]"
            >
              {key}
            </span>
          );
        })}
      </h3>
    </div>
  );
}

export default Home;