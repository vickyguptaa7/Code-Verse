import {
  INSTALLED_EXTENSIONS,
  RECOMMENTED_EXTENSIONS,
} from "../../../../Assets/Data/extensions.data";
import { CODE_EDITOR_MIN_HEIGHT } from "../../../../Pages/CodeEditor.page";
import {
  setIsInstalledExtensionOpen,
  setIsRecommendedExtensionOpen,
} from "../../../../Store/reducres/SideDrawer/Extensions/Extensions.reducer";
import { useAppSelector } from "../../../../Store/store";
import CollapsibleMenu from "../../../UI/CollapsibleMenu.component";
import ExtensionCard from "./Basic/ExtensionCard.component";

// height adjustment is done to make the installed and recommended extensions fit the side drawer
const HIGHT_ADJUSTMENT = 180;
const RECOMMENTED_EXTENSIONS_HEIGHT = 256;

const InstalledAndRecommended = () => {
  const isInstalledExtensionOpen = useAppSelector(
    (state) => state.extension.isInstalledExtensionOpen
  );
  const isRecommendedExtensionOpen = useAppSelector(
    (state) => state.extension.isRecommendedExtensionOpen
  );
  
  let installedHeight =
    Math.max(document.body.clientHeight, CODE_EDITOR_MIN_HEIGHT) -
    HIGHT_ADJUSTMENT;
  let recommendedHeight =
    Math.max(document.body.clientHeight, CODE_EDITOR_MIN_HEIGHT) -
    HIGHT_ADJUSTMENT;

  // when isntalled and recommended extensions are open, the height of the installed extensions is reduced by 256 and the height of the recommended extensions is set to 256
  if (isInstalledExtensionOpen && isRecommendedExtensionOpen) {
    installedHeight -= RECOMMENTED_EXTENSIONS_HEIGHT;
    recommendedHeight = RECOMMENTED_EXTENSIONS_HEIGHT;
  }

  return (
    <>
      <CollapsibleMenu
        menuName="INSTALLED"
        children={
          <div className="overflow-y-auto" style={{ height: installedHeight }}>
            {INSTALLED_EXTENSIONS.map((extension) => {
              return <ExtensionCard key={extension.id} info={extension} />;
            })}
          </div>
        }
        sibbling={
          <div className="bg-[color:var(--primary-color)] mr-2 px-1.5 rounded-full flex items-center justify-center text-xs text-white">
            {RECOMMENTED_EXTENSIONS.length}
          </div>
        }
        initialState={isInstalledExtensionOpen}
        setIsCollpaisibleHandler={setIsInstalledExtensionOpen}
      />
      <div className="ml-1 border-t border-[color:var(--border-color)] my-0.5"></div>
      <CollapsibleMenu
        menuName="RECOMMENDED"
        children={
          <div
            className="h-64 overflow-y-auto "
            style={{ height: recommendedHeight }}
          >
            {RECOMMENTED_EXTENSIONS.map((extension) => {
              return (
                <ExtensionCard
                  key={extension.id}
                  info={extension}
                  isInstalled={false}
                  isRecommended={true}
                />
              );
            })}
          </div>
        }
        sibbling={
          <div className="bg-[color:var(--primary-color)] mr-2 px-1.5 rounded-full flex items-center justify-center text-xs text-white">
            6
          </div>
        }
        initialState={isRecommendedExtensionOpen}
        setIsCollpaisibleHandler={setIsRecommendedExtensionOpen}
      />
    </>
  );
};

export default InstalledAndRecommended;
