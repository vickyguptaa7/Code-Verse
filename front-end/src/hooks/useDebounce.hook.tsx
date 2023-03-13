import { useState, useEffect } from 'react';

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
