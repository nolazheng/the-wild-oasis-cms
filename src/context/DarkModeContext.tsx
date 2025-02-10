import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { createContext, useContext, ReactNode, useEffect } from 'react';

const DarkModeContext = createContext<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'isDarkMode'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev: boolean) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export { useDarkMode, DarkModeProvider };
