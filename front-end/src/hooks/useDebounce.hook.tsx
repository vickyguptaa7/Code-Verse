import { useState, useEffect } from 'react';

/**
 * This is a custom hook that returns a debounced callback function which delays the execution of the
 * original callback function until a specified delay time has passed.
 * @param {Function} callback - The function that needs to be debounced.
 * @param {number} delay - The delay parameter is the amount of time in milliseconds that the debounced
 * function should wait before executing.
 * @returns The `useDebounce` function returns a debounced callback function that can be used to delay
 * the execution of a given callback function by a specified amount of time. The returned function will
 * only execute after the specified delay has passed without any further calls to the function.
 */
function useDebounce(callback: Function, delay: number) {
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    // Clear the timer on unmount
    return () => clearTimeout(timer as NodeJS.Timeout);
  }, [timer]);

  function debouncedCallback(...args: any[]) {
    // Clear the timer before setting a new one
    clearTimeout(timer as NodeJS.Timeout);
    // Set a new timer with the specified delay
    setTimer(setTimeout(() => callback(...args), delay));
  }

  // Return the debounced callback
  return debouncedCallback;
}

export default useDebounce;
