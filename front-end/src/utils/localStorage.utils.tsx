export const getFromLocalStorage = (key: string) => {
  const localStorage = window.localStorage;
  const value = localStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value);
};

export const storeToLocalStorage = (key: string, data: Object|string) => {
  const localStorage = window.localStorage;
  return localStorage.setItem(key, JSON.stringify(data));
};

export const removeFromLocalStorage = (key: string) => {
  const localStorage = window.localStorage;
  return localStorage.removeItem(key);
};
