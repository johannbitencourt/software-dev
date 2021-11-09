import React, { useCallback, useContext, useState } from 'react';

import { isBrowser } from '@/utils/ssr';

interface AuthContextValue {
  isAuthenticated: boolean;
  updateToken(string): void;
}

const AuthContext = React.createContext<AuthContextValue>(null);

const updateToken = (newToken) => {
  if (!isBrowser) {
    return () => undefined;
  }

  if (!newToken) {
    localStorage.removeItem(process.env.JWT_HASH);
  } else {
    localStorage.setItem(process.env.JWT_HASH, newToken);
  }
};

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    (isBrowser && localStorage.getItem(process.env.JWT_HASH)) ?? null
  );

  const handleUpdateToken = useCallback(
    (newToken) => {
      setToken(newToken);
      updateToken(newToken);
    },
    [setToken]
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        updateToken: handleUpdateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
