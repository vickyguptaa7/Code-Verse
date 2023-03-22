import React from "react";
import { useAppSelector } from "../../../../Store/store";
import InstalledAndRecommended from "./InstalledAndRecommended.component";
import SearchExtension from "./SearchExtension.component";

const ExtensionsContainer = () => {
  const extensionSearchedText = useAppSelector(
    (state) => state.extension.extensionSearchedText
  );
  const isInstalledAndRecommendedVisible = extensionSearchedText.length === 0;
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
        ) : null}
      </div>
    </div>
  );
};

export default ExtensionsContainer;
