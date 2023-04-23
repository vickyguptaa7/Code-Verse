export const getOperatingSystem = (): "mac" | "windows" => {
  if (navigator.userAgent.toLowerCase().indexOf("mac") !== -1) return "mac";
  return "windows";
};
