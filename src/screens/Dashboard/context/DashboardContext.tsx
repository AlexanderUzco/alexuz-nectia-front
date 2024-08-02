import { createContext, FC, ReactNode, useEffect } from 'react';

export interface IDashboardContext {}

const initialDashboardContext: IDashboardContext = {};

export const DashboardContext = createContext<IDashboardContext>(
  initialDashboardContext
);

export const DashboardProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  useEffect(() => {}, []);

  return (
    <DashboardContext.Provider value={{}}>{children}</DashboardContext.Provider>
  );
};
