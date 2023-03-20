'use client';

import { createContext } from 'react';

interface ThemeProvider {
  color: 'evaluation' | 'diagnostic' | 'therapeutic';
}

export const ThemeContext = createContext<ThemeProvider>({
  color: 'evaluation',
});

export default function ThemeProvider({
  color,
  children,
}: {
  color: 'evaluation' | 'diagnostic' | 'therapeutic';
  children: React.ReactNode;
}) {
  return (
    <ThemeContext.Provider value={{ color }}>{children}</ThemeContext.Provider>
  );
}
