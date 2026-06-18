import { useState } from 'react';

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  const set = (newVal) => {
    setValue(newVal);
    try {
      localStorage.setItem(key, JSON.stringify(newVal));
    } catch {}
  };

  return [value, set];
}
