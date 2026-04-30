import { useState, useEffect } from 'react';

/**
 * useDebounce - Custom hook that debounces a value.
 * Useful for search inputs to avoid firing API calls on every keystroke.
 * @param {*} value - The value to debounce.
 * @param {number} delay - Delay in milliseconds (default: 500ms).
 * @returns {*} - The debounced value.
 */
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
