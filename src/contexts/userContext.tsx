import React, { FC, ReactNode } from 'react';
const { createContext, useState, useCallback, useContext } = require('react');

const initialValue = {
  userInfo: null,
  updateUserInfo: () => {},
};

const userContext = createContext(initialValue);

const useUserInfo = () => useContext(userContext);

interface UserInfoProviderProps {
  children: ReactNode;
}

const UserInfoProvider: FC<UserInfoProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const updateUserInfo = useCallback((info: any) => {
    setUserInfo(info);
  }, []);

  return (
    <userContext.Provider
      value={{
        userInfo,
        updateUserInfo,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export { useUserInfo, UserInfoProviderProps };

export default UserInfoProvider;
