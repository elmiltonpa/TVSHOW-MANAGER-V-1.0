import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface AuthContextType {
  user: Pick<User, "username"> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, username: string) => void;
  logout: () => void;
}

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Pick<User, "username"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const checkSession = () => {
      const sessionStr = window.localStorage.getItem("session");
      if (sessionStr) {
        try {
          const session = JSON.parse(sessionStr);
          if (session && session.token) {
            const decoded = jwtDecode<DecodedToken>(session.token);
            // exp is in seconds, Date.now() in milliseconds
            if (decoded.exp * 1000 > Date.now()) {
              setUser({ username: session.username });
            } else {
              // Token expired
              window.localStorage.removeItem("session");
              toast.error(t("notifications.session_expired"));
              setUser(null);
            }
          } else {
            window.localStorage.removeItem("session");
            setUser(null);
          }
        } catch (e) {
          console.error("Invalid token or session", e);
          window.localStorage.removeItem("session");
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, [t]);

  const login = (token: string, username: string) => {
    const session = {
      token,
      username,
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
