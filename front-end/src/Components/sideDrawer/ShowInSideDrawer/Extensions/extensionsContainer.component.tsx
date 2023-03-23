import React from "react";
import { useAppSelector } from "../../../../Store/store";
import VirtualizedList from "./Basic/VirtualizedList.component";
import InstalledAndRecommended from "./InstalledAndRecommended.component";
import SearchExtension from "./SearchExtension.component";

const EDITOR_MIN_HEIGHT = 480;
const ExtensionsContainer = () => {
  const extensionSearchedText = useAppSelector(
    (state) => state.extension.extensionSearchedText
  );
  const isInstalledAndRecommendedVisible = extensionSearchedText.length === 0;
  let height = Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) - 120;
  return (
    <div className="flex flex-col justify-start h-full py-2 text-sm whitespace-nowrap">
      <div className="pl-5 mt-1.5 mb-2">
        <h2>EXTENSIONS</h2>
      </div>
      <div className="flex flex-col h-full gap-3 ">
        <SearchExtension />
        {isInstalledAndRecommendedVisible ? (
          <div>
            <InstalledAndRecommended />
          </div>
        ) : (
          <div className="overflow-y-scroll" style={{ height: height }}>
            <VirtualizedList />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtensionsContainer;
