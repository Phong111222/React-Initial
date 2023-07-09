import React, {
  FC,
  ReactNode,
  createContext,
  useState,
  useCallback,
  useContext,
} from 'react';

const initialValue = {
  userInfo: null,
  updateUserInfo: (...args: any[]) => {},
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
