export const getFromLocalStorage = (key: "historyInfo") => {
  const localStorage = window.localStorage;
  const value = localStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value);
};

export const storeToLocalStorage = (key: "historyInfo", data: Object) => {
  const localStorage = window.localStorage;
  return localStorage.setItem(key, JSON.stringify(data));
};

export const removeFromLocalStorage = (key: "historyInfo") => {
  const localStorage = window.localStorage;
  return localStorage.removeItem(key);
};
