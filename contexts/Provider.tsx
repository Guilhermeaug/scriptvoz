'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface Provider {
  color: 'evaluation' | 'diagnostic' | 'therapeutic' | 'standard';
  isCompleted: boolean;
  setIsCompleted: (isCompleted: boolean) => void;
}

const ProviderContext = createContext<Provider>({} as Provider);

export default function Provider({
  color,
  children,
}: {
  color: 'evaluation' | 'diagnostic' | 'therapeutic' | 'standard';
  children: ReactNode;
}) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <ProviderContext.Provider
      value={{
        color,
        isCompleted,
        setIsCompleted,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
}

export const useProvider = () => useContext(ProviderContext);
