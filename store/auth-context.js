import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => { },
  logout: () => { },
});

function AuthContentProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);

  function authenticateHandler(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }

  function logoutHandler() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticateHandler,
    logout: logoutHandler,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContentProvider;