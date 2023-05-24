import { themesNameArray } from "../Assets/Data/theme.data";
import { TTheme } from "../Interface/Types";

/**
 * This function retrieves a value from local storage by its key and returns it as a parsed JSON
 * object.
 * @param {string} key - The key parameter is a string that represents the key of the item to be
 * retrieved from the local storage.
 * @returns The function `getFromLocalStorage` returns the value stored in the local storage
 * corresponding to the given key after parsing it from JSON format. If the value is not found, it
 * returns `null`.
 */
export const getFromLocalStorage = (key: string) => {
  const localStorage = window.localStorage;
  const value = localStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value);
};

/**
 * This function stores data to local storage in JSON format.
 * @param {string} key - A string representing the key under which the data will be stored in the local
 * storage.
 * @param {Object | string} data - The `data` parameter is of type `Object` or `string`. It represents
 * the data that needs to be stored in the local storage. If it is an object, it will be converted to a
 * JSON string before being stored in the local storage.
 * @returns The `setItem` method of the `localStorage` object is being called with the `key` and `data`
 * parameters, and the result of this method call is being returned. The `setItem` method sets the
 * value of the specified `key` in the `localStorage` object to the stringified version of the `data`
 * object.
 */
export const storeToLocalStorage = (key: string, data: Object | string) => {
  const localStorage = window.localStorage;
  return localStorage.setItem(key, JSON.stringify(data));
};

/**
 * This function removes an item from the local storage using a specified key.
 * @param {string} key - The key parameter is a string that represents the key of the item that needs
 * to be removed from the local storage.
 * @returns The `removeItem()` method of the `localStorage` object is being called with the `key`
 * parameter passed in as an argument. This method removes the item with the specified key from the
 * `localStorage`. The method returns `undefined`. Therefore, the `removeFromLocalStorage()` function
 * returns `undefined`.
 */
export const removeFromLocalStorage = (key: string) => {
  const localStorage = window.localStorage;
  return localStorage.removeItem(key);
};

/**
 * This function retrieves the previously selected theme from local storage and returns it, or defaults
 * to "vs-dark" if the previous theme is not found in a list of available themes.
 * @returns the previously selected theme from local storage. If the previously selected theme is not
 * found in the `themesNameArray`, it will return the `"vs-dark"` theme. The return type is `TTheme`.
 */
export const getPrevThemes = (): TTheme => {
  let prevTheme = getFromLocalStorage("vscode-color-theme");
  if (!themesNameArray.find((theme) => theme === prevTheme))
    prevTheme = "vs-dark";
  return prevTheme;
};

/**
 * This function retrieves the previously set font size from local storage or returns a default value
 * of 16 if none is found.
 * @returns The function `getPrevFontSize` returns a number which is the previously saved font size
 * from local storage. If there is no previously saved font size or the saved font size is not within
 * the range of 6 to 40, the function returns the default font size of 16.
 */
export const getPrevFontSize = () => {
  let prevFontSize = parseInt(getFromLocalStorage("vscode-font-size"));
  if (isNaN(prevFontSize) || prevFontSize < 6 || prevFontSize > 40)
    prevFontSize = 16;
  return prevFontSize;
};

/**
 * This function retrieves the previously saved tab size from local storage or returns a default value
 * of 4 if none is found.
 * @returns The function `getPrevTabSize` returns a number which is the value of the `prevTabSize`
 * variable. This value is obtained by parsing an integer from the value retrieved from local storage
 * using the `getFromLocalStorage` function. If the parsed value is not a number or is less than 2 or
 * greater than 6, the function sets the `prevTabSize` variable to
 */
export const getPrevTabSize = () => {
  let prevTabSize = parseInt(getFromLocalStorage("vscode-tab-size"));
  if (isNaN(prevTabSize) || prevTabSize < 2 || prevTabSize > 6) prevTabSize = 4;
  return prevTabSize;
};

/**
 * This function retrieves the previous word wrap setting from local storage and returns it, defaulting
 * to "on" if the value is not recognized.
 * @returns The function `getPrevWordWrap` returns the value of the `prevWordWrap` variable, which is
 * either the value of the "vscode-word-wrap" key in the local storage or "on" if the value is not one
 * of the accepted values ("on", "off", "wordWrapColumn", "bounded").
 */
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

/**
 * This function retrieves the previous value of a setting called "vscode-is-scroll-beyond-last-line"
 * from local storage and returns it, defaulting to false if the value is not a boolean.
 * @returns The function `getPrevScrollBeyondLastLine` returns the value of the
 * `prevScrollBeyondLastLine` variable, which is retrieved from local storage using the
 * `getFromLocalStorage` function. If the retrieved value is not a boolean `true` or `false`, the
 * function sets `prevScrollBeyondLastLine` to `false` and returns it.
 */
export const getPrevScrollBeyondLastLine = () => {
  let prevScrollBeyondLastLine = JSON.parse(
    getFromLocalStorage("vscode-is-scroll-beyond-last-line")
  );
  if (prevScrollBeyondLastLine !== true && prevScrollBeyondLastLine !== false)
    prevScrollBeyondLastLine = false;
  return prevScrollBeyondLastLine;
};

/**
 * This function retrieves the previous state of the minimap from local storage and returns it,
 * defaulting to true if no previous state is found.
 * @returns The function `getPrevMinimapEnabled` returns the value of the `prevMinimapEnabled`
 * variable, which is either the boolean value stored in the "vscode-is-minimap-enabled" key in local
 * storage, or `true` if the value is not a boolean.
 */
export const getPrevMinimapEnabled = () => {
  let prevMinimapEnabled = JSON.parse(
    getFromLocalStorage("vscode-is-minimap-enabled")
  );
  if (prevMinimapEnabled !== true && prevMinimapEnabled !== false)
    prevMinimapEnabled = true;
  return prevMinimapEnabled;
};

/**
 * This function retrieves a boolean value from local storage and returns it, defaulting to true if the
 * value is not a valid boolean.
 * @returns The function `getPrevIsDeleteWarningEnable` returns the value of the
 * `prevIsDeleteWarningEnable` variable, which is either the boolean value `true` or `false`. This
 * value is obtained by parsing the JSON string retrieved from the local storage using the
 * `getFromLocalStorage` function. If the retrieved value is not a boolean, the function sets
 * `prevIsDeleteWarningEnable` to
 */
export const getPrevIsDeleteWarningEnable = () => {
  let prevIsDeleteWarningEnable = JSON.parse(
    getFromLocalStorage("vscode-is-delete-warning-enable")
  );
  if (prevIsDeleteWarningEnable !== true && prevIsDeleteWarningEnable !== false)
    prevIsDeleteWarningEnable = true;
  return prevIsDeleteWarningEnable;
};

/**
 * This function retrieves the previous position of a side panel from local storage and returns an
 * object indicating whether the panel is on the left or right and whether the drawer is open on the
 * left or right.
 * @returns An object with two boolean properties: `isSidePannelPositionOnLeft` and
 * `isDrawerOpenSideIsLeft`. The value of `isSidePannelPositionOnLeft` is `true` if the previous
 * position was "left" and `false` otherwise. The value of `isDrawerOpenSideIsLeft` is `false` if the
 * previous position was "left" and `
 */
export const getPrevPosition = () => {
  let prevPosition = getFromLocalStorage("vscode-sidedrawer-position");
  if (prevPosition !== "left" && prevPosition !== "right")
    prevPosition = "left";
  return {
    isSidePannelPositionOnLeft: prevPosition === "left" ? true : false,
    isDrawerOpenSideIsLeft: prevPosition === "left" ? false : true,
  };
};

/**
 * This function retrieves the previous state of a drawer from local storage and returns it, defaulting
 * to true if no previous state is found.
 * @returns The function `getPrevIsDrawerOpen` returns the value of the `prevIsDrawerOpen` variable,
 * which is either `true`, `false`, or `true` by default if the value retrieved from local storage is
 * not a boolean.
 */
export const getPrevIsDrawerOpen = () => {
  let prevIsDrawerOpen = JSON.parse(
    getFromLocalStorage("vscode-is-drawer-open")
  );
  if (prevIsDrawerOpen !== true && prevIsDrawerOpen !== false)
    prevIsDrawerOpen = true;
  return prevIsDrawerOpen;
};

/**
 * This function retrieves the value of a boolean variable from local storage and returns it,
 * defaulting to false if the value is not a valid boolean.
 * @returns The function `getIsBottomPannelOpen` returns a boolean value indicating whether the bottom
 * panel is open or not. It retrieves the value from local storage using the key
 * "vscode-is-bottom-pannel-open" and parses it as a boolean. If the value is not a boolean, it
 * defaults to false.
 */
export const getIsBottomPannelOpen = () => {
  let isBottomPannelOpen = JSON.parse(
    getFromLocalStorage("vscode-is-bottom-pannel-open")
  );
  if (isBottomPannelOpen !== true && isBottomPannelOpen !== false)
    isBottomPannelOpen = false;
  return isBottomPannelOpen;
};
