'use client';

import { usePathname } from 'next/navigation';
import { createContext, useContext, useState } from 'react';

type Color = 'evaluation' | 'diagnostic' | 'therapeutic' | 'standard';
interface Provider {
  color: Color;
  isCompleted: boolean;
  setIsCompleted: (isCompleted: boolean) => void;
}

const ProviderContext = createContext<Provider>({} as Provider);

export default function Provider({ children }: { children: React.ReactNode }) {
  const [isCompleted, setIsCompleted] = useState(false);
  let color: Color = 'standard';

  const pathname = usePathname();
  if (pathname.includes('evaluation')) {
    color = 'evaluation';
  } else if (pathname.includes('diagnostic')) {
    color = 'diagnostic';
  } else if (pathname.includes('therapeutic')) {
    color = 'therapeutic';
  }

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
