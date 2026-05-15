import React, { createContext, useContext, useState } from 'react';
import { useData } from './DataContext';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { data } = useData();
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem('currentUser');
    return localUser ? JSON.parse(localUser) : null;
  });
  const [error, setError] = useState(null);

  const login = (username, password) => {
    setError(null);
    const foundUser = data.users.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return { success: true, role: foundUser.role };
    } else {
      setError('Invalid username or password');
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
