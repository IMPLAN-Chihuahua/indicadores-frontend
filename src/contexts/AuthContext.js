import React from 'react';
import { login, logout } from '../services/authService';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
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
      localStorage.setItem('indicadores-user', JSON.stringify(currentUser));
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

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogOut, isLoading, hasError }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };