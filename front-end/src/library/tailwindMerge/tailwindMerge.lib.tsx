import { twMerge } from "tailwind-merge";

export const mergeClass = ([...props]) => {
  return twMerge([...props]);
};
