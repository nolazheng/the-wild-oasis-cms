import { useEffect, useRef } from 'react';

export const useCloseOutside = (handler: () => void, capturing = true) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };
    document.addEventListener('click', handleClickOutside, capturing);
    return () =>
      document.removeEventListener('click', handleClickOutside, capturing);
  }, [handler, capturing]);

  return { ref };
};
