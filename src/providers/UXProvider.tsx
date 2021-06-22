import React, { createContext, ReactNode, useState } from 'react';

export interface IUXContext {
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: (val: boolean) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

export interface IUXProps {
  children: ReactNode;
}

export const UXContext = createContext<IUXContext>({} as IUXContext);

export const UXProvider = ({ children }: IUXProps): JSX.Element => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const uxContext: IUXContext = {
    isSideMenuOpen: isSideMenuOpen,
    setIsSideMenuOpen: setIsSideMenuOpen,
    isLoading: isLoading,
    setIsLoading: setIsLoading,
  };

  return <UXContext.Provider value={uxContext}>{children}</UXContext.Provider>;
};
