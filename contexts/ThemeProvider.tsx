'use client';

import { createContext, useEffect, useState } from 'react';

interface ThemeProvider {
  color: 'evaluation' | 'diagnostic' | 'therapeutic';
  isCompleted: boolean;
  setIsCompleted: (isCompleted: boolean) => void;
  setQuestionsStatus: (questionsStatus: boolean) => void;
  setPillStatus: (pillStatus: boolean) => void;
}

export const ThemeContext = createContext<ThemeProvider>({
  color: 'evaluation',
  isCompleted: false,
  setIsCompleted: () => {},
  setQuestionsStatus: () => {},
  setPillStatus: () => {},
});

export default function ThemeProvider({
  color,
  children,
}: {
  color: 'evaluation' | 'diagnostic' | 'therapeutic';
  children: React.ReactNode;
}) {
  const [questionsStatus, setQuestionsStatus] = useState<boolean>(false);
  const [pillStatus, setPillStatus] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    switch (color) {
      case 'evaluation':
        if (questionsStatus) {
          setIsCompleted(true);
        }
        break;
      case 'diagnostic':
        if (pillStatus) {
          setIsCompleted(true);
        }
        break;
      case 'therapeutic':
        if (questionsStatus) {
          setIsCompleted(true);
        }
        break;
    }
  }, [questionsStatus, pillStatus, color]);

  return (
    <ThemeContext.Provider
      value={{ color, isCompleted, setIsCompleted, setQuestionsStatus, setPillStatus }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
