import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api, { setAuthToken } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const login = ({ token: incomingToken, user: incomingUser }) => {
    setToken(incomingToken);
    setUser(incomingUser);
    localStorage.setItem('token', incomingToken);
    localStorage.setItem('user', JSON.stringify(incomingUser));
    setAuthToken(incomingToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
  };

  const refreshProfile = async () => {
    if (!token) return;
    const { data } = await api.get('/auth/me');
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  const value = useMemo(() => ({ token, user, login, logout, refreshProfile }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
