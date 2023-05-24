import { twMerge } from "tailwind-merge";

/**
 * The function exports a utility for merging CSS classes using the twMerge function.
 * @param  - The function `mergeClass` takes in an array of `props` as its parameter. The spread
 * operator `...` is used to convert the array into individual elements. The function then calls the
 * `twMerge` function with the spread `props` as its argument and returns the result. `tw
 * @returns The `mergeClass` function is returning the result of calling the `twMerge` function with
 * the spread array of `props` as its argument.
 */
export const mergeClass = ([...props]) => {
  return twMerge([...props]);
};
