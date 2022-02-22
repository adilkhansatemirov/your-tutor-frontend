import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [refererPage, setRefererPage] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userCredentials,
        setUserCredentials,
        authLoading,
        setAuthLoading,
        refererPage,
        setRefererPage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
