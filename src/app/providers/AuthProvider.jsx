import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const apiBaseUrl = "https://rpgapi.taderlafe.com:8080";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔄 Vérifie la session via API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/me`, {
          credentials: "include", // 🔥 IMPORTANT (cookies)
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔐 Login
  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        credentials: "include", // 🔥 pour cookie
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const userData = await res.json();
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  // 🚪 Logout
  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
