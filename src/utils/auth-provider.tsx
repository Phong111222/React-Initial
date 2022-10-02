import React, { useUserInfo } from 'contexts/userContext';
import { FC, ReactNode, useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';

import authService from '../config/auth';
import { TOKEN } from '../constants/index';

export interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
 
  return <>{children}</>;
};

export default AuthProvider;
