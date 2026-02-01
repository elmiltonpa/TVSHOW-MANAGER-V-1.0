import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types";

interface AuthContextType {
  user: Pick<User, "username"> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Pick<User, "username"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = () => {
      const sessionStr = window.localStorage.getItem("session");
      if (sessionStr) {
        try {
          const session = JSON.parse(sessionStr);
          if (session && session.expirationDate > Date.now()) {
            setUser({ username: session.username });
          } else {
            window.localStorage.removeItem("session");
            setUser(null);
          }
        } catch {
          window.localStorage.removeItem("session");
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const login = (token: string, username: string) => {
    const sessionDurationInSeconds = 950400;
    const expirationDate = Date.now() + sessionDurationInSeconds * 1000;

    const session = {
      token,
      username,
      expirationDate,
    };

    window.localStorage.setItem("session", JSON.stringify(session));
    setUser({ username });
  };

  const logout = () => {
    window.localStorage.removeItem("session");
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
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
