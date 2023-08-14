'use client';

import { createContext, useEffect, useState } from 'react';

interface Provider {
  color: 'evaluation' | 'diagnostic' | 'therapeutic' | 'standard';
  isCompleted: boolean;
  setIsCompleted: (isCompleted: boolean) => void;
  setQuestionsStatus: (questionsStatus: boolean) => void;
  setPillStatus: (pillStatus: boolean) => void;
}

export const ProviderContext = createContext<Provider>({
  color: 'standard',
  isCompleted: false,
  setIsCompleted: () => {},
  setQuestionsStatus: () => {},
  setPillStatus: () => {},
});

export default function Provider({
  color,
  children,
}: {
  color: 'evaluation' | 'diagnostic' | 'therapeutic' | 'standard';
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
    <ProviderContext.Provider
      value={{
        color,
        isCompleted,
        setIsCompleted,
        setQuestionsStatus,
        setPillStatus,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
}
