import React, { useState, useEffect } from 'react';

export const useMedia = (queries, values, defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    const mediaQueryLists = [queries]
      .flat()
      .map(q => globalThis.matchMedia?.(q))
      .filter(Boolean);
    const getValue = () =>
      values[mediaQueryLists.findIndex(mql => mql.matches)] ?? defaultValue;
    setValue(getValue);

    const handler = () => setValue(getValue);
    mediaQueryLists.forEach(mql => mql.addEventListener('change', handler)); // as it's a event callback, function may be invoked after init useEffect of React.
    return () =>
      mediaQueryLists.forEach(mql =>
        mql.removeEventListener('change', handler),
      );
  }, []);
  return value;
};
