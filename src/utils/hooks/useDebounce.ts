import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDeboucnedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDeboucnedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
