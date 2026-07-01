import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchMe } from "../api/authApi.js";
import { getToken, setToken as persistToken, clearToken } from "../utils/authStorage.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!getToken());

  useEffect(() => {
    let ignore = false;

    if (!getToken()) {
      setLoading(false);
      return undefined;
    }

    fetchMe()
      .then(({ user: fetchedUser }) => {
        if (!ignore) setUser(fetchedUser);
      })
      .catch(() => {
        if (!ignore) {
          clearToken();
          setUser(null);
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const login = ({ user: loggedInUser, token }) => {
    persistToken(token);
    setUser(loggedInUser);
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, loading, login, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
