import { createContext } from 'react';

export const ResultContext = createContext<{
  result: string | null;
  setResult: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);
