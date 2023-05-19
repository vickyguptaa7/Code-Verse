import React from "react";
import logo from "../../../Assets/images/code-verse/code-verse-alt.png";
import { mergeClass } from "../../../library/tailwindMerge/tailwindMerge.lib";
import { getOperatingSystem } from "../../../utils/osDetect.utils";

const HOME_CONTENT_MIN_SIZE = 200;
const os = getOperatingSystem();

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
        <img src={logo} className="w-48" alt="" />
      </div>
      <div className="font-sans text-[color:var(--primary-text-color)] flex justify-center items-center gap-1.5">
        <div className="flex flex-col items-end justify-center gap-3 m-4 text-sm">
          <ShortcutCard
            title="Show Explorer"
            shortcutKeys={[os === "mac" ? "Cmd" : "Ctrl", "Shift", "P"]}
          />
          <ShortcutCard title="Show Terminal" shortcutKeys={["Ctrl", "`"]} />
          <ShortcutCard
            title="Show Settings"
            shortcutKeys={[os === "mac" ? "Cmd" : "Ctrl", ","]}
          />
          <ShortcutCard
            title="Full Screen"
            shortcutKeys={[os === "mac" ? "Cmd" : "Ctrl", "Shift", "F"]}
          />
        </div>
      </div>
    </div>
  );
};

function ShortcutCard(props: { title: string; shortcutKeys: Array<string> }) {
  const { title, shortcutKeys } = props;
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 font-cascadia">
      <h3 className="pt-1 ">{title}</h3>
      <h3 className="flex gap-1.5">
        {shortcutKeys.map((key, indx) => {
          return (
            <div>
              {indx !== 0 ? "+" : null}
              <span
                id={key}
                key={key}
                className="ml-1.5 bg-[color:var(--hover-text-color)] py-1 px-1.5 text-xs rounded-sm text-[color:var(--highlight-text-color)] shadow-sm shadow-[color:var(--primary-text-color)]"
              >
                {key}
              </span>
            </div>
          );
        })}
      </h3>
    </div>
  );
}

export default Home;
