import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedSession = localStorage.getItem('travelMateSession');
    if (savedSession) {
      setUser(JSON.parse(savedSession));
    }
  }, []);

  const signup = (name, email, password) => {
    const userData = { name, email, password };
    localStorage.setItem('travelMateUserDB_' + email, JSON.stringify(userData));
    
    setUser({ name, email });
    localStorage.setItem('travelMateSession', JSON.stringify({ name, email }));
    return true;
  };

  const login = (email, password) => {
    const savedUser = localStorage.getItem('travelMateUserDB_' + email);
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.password === password) {
        setUser({ name: parsedUser.name, email });
        localStorage.setItem('travelMateSession', JSON.stringify({ name: parsedUser.name, email }));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travelMateSession');
  };

  const deleteAccount = () => {
    if (user) {
      localStorage.removeItem('travelMateUserDB_' + user.email);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};