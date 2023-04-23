import { CODE_EDITOR_MIN_HEIGHT } from "../../../../Pages/CodeEditor.page";
import { useAppSelector } from "../../../../Store/store";
import ExtensionCardContainer from "./Basic/ExtensionCardContainer.component";
import InstalledAndRecommended from "./InstalledAndRecommended.component";
import SearchExtension from "./SearchExtension.component";

const HIGHT_ADJUSTMENT = 120;

const ExtensionsContainer = () => {
  const extensionSearchedText = useAppSelector(
    (state) => state.extension.extensionSearchedText
  );
  const isInstalledAndRecommendedVisible = extensionSearchedText.length === 0;
  
  // height adjustment is done to make the extensions fit the side drawer
  let height =
    Math.max(document.body.clientHeight, CODE_EDITOR_MIN_HEIGHT) -
    HIGHT_ADJUSTMENT;
    
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
