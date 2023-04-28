import { themesNameArray } from "../Assets/Data/theme.data";
import { TTheme } from "../Interface/Types";

export const getFromLocalStorage = (key: string) => {
  const localStorage = window.localStorage;
  const value = localStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value);
};

export const storeToLocalStorage = (key: string, data: Object | string) => {
  const localStorage = window.localStorage;
  return localStorage.setItem(key, JSON.stringify(data));
};

export const removeFromLocalStorage = (key: string) => {
  const localStorage = window.localStorage;
  return localStorage.removeItem(key);
};

export const getPrevThemes = (): TTheme => {
  let prevTheme = getFromLocalStorage("vscode-color-theme");
  if (!themesNameArray.find((theme) => theme === prevTheme))
    prevTheme = "vs-dark";
  return prevTheme;
};

export const getPrevFontSize = () => {
  let prevFontSize = parseInt(getFromLocalStorage("vscode-font-size"));
  if (isNaN(prevFontSize) || prevFontSize < 6 || prevFontSize > 40)
    prevFontSize = 16;
  return prevFontSize;
};

export const getPrevTabSize = () => {
  let prevTabSize = parseInt(getFromLocalStorage("vscode-tab-size"));
  if (isNaN(prevTabSize) || prevTabSize < 2 || prevTabSize > 6) prevTabSize = 4;
  return prevTabSize;
};

export const getPrevWordWrap = () => {
  let prevWordWrap = getFromLocalStorage("vscode-word-wrap");
  if (
    prevWordWrap !== "on" &&
    prevWordWrap !== "off" &&
    prevWordWrap !== "wordWrapColumn" &&
    prevWordWrap !== "bounded"
  )
    prevWordWrap = "on";
  return prevWordWrap;
};

export const getPrevScrollBeyondLastLine = () => {
  let prevScrollBeyondLastLine = JSON.parse(
    getFromLocalStorage("vscode-is-scroll-beyond-last-line")
  );
  if (prevScrollBeyondLastLine !== true && prevScrollBeyondLastLine !== false)
    prevScrollBeyondLastLine = false;
  return prevScrollBeyondLastLine;
};

export const getPrevMinimapEnabled = () => {
  let prevMinimapEnabled = JSON.parse(
    getFromLocalStorage("vscode-is-minimap-enabled")
  );
  if (prevMinimapEnabled !== true && prevMinimapEnabled !== false)
    prevMinimapEnabled = true;
  return prevMinimapEnabled;
};

export const getPrevIsDeleteWarningEnable=()=>{
  let prevIsDeleteWarningEnable = JSON.parse(
    getFromLocalStorage("vscode-is-delete-warning-enable")
  );
  if (prevIsDeleteWarningEnable !== true && prevIsDeleteWarningEnable !== false)
    prevIsDeleteWarningEnable = true;
  return prevIsDeleteWarningEnable;
}

export const getPrevPosition = () => {
  let prevPosition = getFromLocalStorage("vscode-sidedrawer-position");
  if (prevPosition !== "left" && prevPosition !== "right")
    prevPosition = "left";
  return {
    isSidePannelPositionOnLeft: prevPosition === "left" ? true : false,
    isDrawerOpenSideIsLeft: prevPosition === "left" ? false : true,
  };
};

export const getPrevIsDrawerOpen = () => {
  let prevIsDrawerOpen = JSON.parse(
    getFromLocalStorage("vscode-is-drawer-open")
  );
  if (prevIsDrawerOpen !== true && prevIsDrawerOpen !== false)
    prevIsDrawerOpen = true;
  return prevIsDrawerOpen;
};
// isBottomPannelOpen
export const getIsBottomPannelOpen = () => {
  let isBottomPannelOpen = JSON.parse(
    getFromLocalStorage("vscode-is-bottom-pannel-open")
  );
  if (isBottomPannelOpen !== true && isBottomPannelOpen !== false)
    isBottomPannelOpen = false;
  return isBottomPannelOpen;
};
