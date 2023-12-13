import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { login, logout } from '../services/authService';
import { getCurrentUser } from '../services/userService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('indicadores-user'));
    if (currentUser) {
      setUser(currentUser)
    } else {
      handleLogOut();
    }
  }, []);

  const handleLogin = async (payload, onSuccess, onError) => {
    setIsLoading(true);
    try {
      const currentUser = await login(payload.correo, payload.clave);
      setUser(currentUser);
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (error) {
      setUser(null);
      setHasError(true)
      if (onError && typeof onError === 'function') {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogOut = (callback) => {
    localStorage.removeItem('indicadores-user');
    logout();
    setUser(null);
    if (callback && typeof callback === 'function') {
      callback()
    }
  };

  const reloadCurrentUser = useCallback(async () => {
    const curr = await getCurrentUser();
    setUser(prev => ({ ...prev, ...curr }));
  }, [])

  useEffect(() => {
    localStorage.setItem('indicadores-user', JSON.stringify(user));
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        handleLogOut,
        isLoading,
        hasError,
        reloadCurrentUser
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };