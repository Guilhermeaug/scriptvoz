'use client';

import { createContext, useContext, useState } from 'react';

interface Provider {
  completionSet: Set<number>;
  setCompletionSet: (completionSet: Set<number>) => void;
}

const ProviderContext = createContext<Provider>({} as Provider);

export default function Provider({ children }: { children: React.ReactNode }) {
  const [completionSet, setCompletionSet] = useState<Set<number>>(new Set());

  return (
    <ProviderContext.Provider
      value={{
        completionSet,
        setCompletionSet,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
}

export const useProvider = () => useContext(ProviderContext);
