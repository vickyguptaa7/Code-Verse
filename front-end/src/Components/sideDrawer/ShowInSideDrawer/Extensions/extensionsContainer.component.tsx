import React from "react";
import { useAppSelector } from "../../../../Store/store";
import ExtensionCardContainer from "./Basic/ExtensionCardContainer.component";
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
    <div className="flex flex-col justify-start h-full py-2 text-sm whitespace-nowrap text-[color:var(--highlight-text-color)]">
      <div className="pl-5 mt-1.5 mb-2">
        <h2>EXTENSIONS</h2>
      </div>
      <div className="flex flex-col h-full gap-3 pr-1">
        <SearchExtension />
        {isInstalledAndRecommendedVisible ? (
          <div>
            <InstalledAndRecommended />
          </div>
        ) : (
          <div className="overflow-y-auto " style={{ height: height }}>
            <ExtensionCardContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtensionsContainer;
