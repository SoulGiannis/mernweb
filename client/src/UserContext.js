import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;
