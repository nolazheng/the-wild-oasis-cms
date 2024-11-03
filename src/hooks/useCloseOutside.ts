import { useEffect } from 'react';

export const useCloseOutside = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  handler: () => void,
  capturing = true
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };
    document.addEventListener('click', handleClickOutside, capturing);
    return () =>
      document.removeEventListener('click', handleClickOutside, capturing);
  }, [ref, handler, capturing]);

  return { ref };
};
