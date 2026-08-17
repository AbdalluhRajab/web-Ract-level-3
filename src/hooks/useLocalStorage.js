import { useEffect, useState } from "react";

export function useLocalStorage(key, fallbackValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored === null ? fallbackValue : JSON.parse(stored);
    } catch {
      return fallbackValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // The feature remains usable when storage is disabled or full.
    }
  }, [key, value]);

  return [value, setValue];
}
