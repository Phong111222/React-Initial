import React from 'contexts/userContext';
import { FC, ReactNode } from 'react';

export interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default AuthProvider;
