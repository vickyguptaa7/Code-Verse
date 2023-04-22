import React from "react";
import {
  setIsInstalledExtensionOpen,
  setIsRecommendedExtensionOpen,
} from "../../../../Store/reducres/SideDrawer/Extensions/Extensions.reducer";
import { useAppSelector } from "../../../../Store/store";
import CollapsibleMenu from "../../../UI/CollapsibleMenu.component";
import ExtensionCard from "./Basic/ExtensionCard.component";
import { INSTALLED_EXTENSIONS } from "../../../../Assets/Data/extensions.data";


const EDITOR_MIN_HEIGHT = 480;

const InstalledAndRecommended = () => {
  const isInstalledExtensionOpen = useAppSelector(
    (state) => state.extension.isInstalledExtensionOpen
  );
  const isRecommendedExtensionOpen = useAppSelector(
    (state) => state.extension.isRecommendedExtensionOpen
  );
  let installedHeight =
    Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) - 180;
  let recommendedHeight =
    Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) - 180;
  if (isInstalledExtensionOpen && isRecommendedExtensionOpen) {
    installedHeight -= 256;
    recommendedHeight = 256;
  }
  return (
    <>
      <CollapsibleMenu
        menuName="INSTALLED"
        children={
          <div
            className="overflow-y-auto"
            style={{ height: installedHeight }}
          >
            {INSTALLED_EXTENSIONS.map((extension) => {
              return (
                <ExtensionCard
                  key={extension.id}
                  info={extension}
                />
              );
            })}
          </div>
        }
        sibbling={
          <div className="bg-[color:var(--accent-color)] mr-2 px-1.5 rounded-full flex items-center justify-center text-xs text-white">
            {INSTALLED_EXTENSIONS.length}
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
            {INSTALLED_EXTENSIONS.map((extension) => {
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
          <div className="bg-[color:var(--accent-color)] mr-2 px-1.5 rounded-full flex items-center justify-center text-xs text-white">
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