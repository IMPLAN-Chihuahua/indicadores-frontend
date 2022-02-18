import React from 'react';
import { login, logout } from '../services/authService';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      setUser(currentUser)
    }
  }, []);

  const handleLogin = async (payload, onSuccess, onError) => {
    setIsLoading(true);
    try {
      const currentUser = await login(payload.correo, payload.clave);
      localStorage.setItem('user', JSON.stringify(currentUser));
      setUser(currentUser);
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message || error.toString()
      setUser(null);
      setHasError(true)
      if (onError && typeof onError === 'function') {
        onError(message);
      }

    } finally {
      setIsLoading(false);
    }
  };

  const handleLogOut = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogOut, isLoading, hasError }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };