import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { EditUserRegular } from "../interfaces/EditUserRegular";

interface User {
  id: number;
  name:string,
  email: string;
  role: string;
  lastLogin: Date
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  role: string | null
  editUser: (userEdit: EditUserRegular)=>void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const login = (token: string, user: User) => {
    setToken(token);
    setUser(user);
    setRole(user.role)
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };


  const editUser = (userEdit: EditUserRegular) => {
    if (!user) return;
    setUser(prevUser => {
      const updatedUser = {
        ...prevUser!,
        ...userEdit
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null)
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };


  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: Boolean(token),
        role,
        editUser
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
