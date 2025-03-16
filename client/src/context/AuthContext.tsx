import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

interface userProps {
  _id: string;
  username: string;
  email: string;
  avatar: string;
}

interface AuthProps {
  user: userProps | null;
  isAuth: boolean;
}

const initialUser: userProps | null = null;

const initialContext = {
  user: initialUser,
  isAuth: false,
};

const AuthContext = createContext<AuthProps>(initialContext);

interface childProp {
  children: React.ReactNode;
}
function AuthProvider({ children }: childProp) {
  const [user, setUser] = useState<userProps | null>(initialUser);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    api
      .get("/api/profile", { withCredentials: true })
      .then((res) => {
        setIsAuth(true);
        setUser(res.data);
        console.log(res);
      })
      .catch((e) => {
        console.log(e?.response?.data?.error || e);
        setIsAuth(false);
        setUser(null);
      });
  }, []);

  const authValue: AuthProps = { user, isAuth };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider };
export default { useAuth };
