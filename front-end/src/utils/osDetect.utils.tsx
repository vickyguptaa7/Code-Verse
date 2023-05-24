/**
 * This function returns the operating system of the user as either "mac" or "windows" based on the
 * user agent string.
 * @returns The function `getOperatingSystem` returns a string value of either "mac" or "windows" based
 * on the user agent string of the browser. If the user agent string contains the word "mac", the
 * function returns "mac", otherwise it returns "windows".
 */
export const getOperatingSystem = (): "mac" | "windows" => {
  if (navigator.userAgent.toLowerCase().indexOf("mac") !== -1) return "mac";
  return "windows";
};
