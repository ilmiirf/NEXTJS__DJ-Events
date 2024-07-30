import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL, NEXT_URL } from "@/config";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

interface LoginForm {
  email: string;
  password: string;
}

interface ContextDefaults {
  user: string | null;
  error: string | null;
  register: (user: RegisterForm) => void;
  login: ({ email, password }: LoginForm) => void;
  logout: () => void;
}

const defaultValues: ContextDefaults = {
  user: null,
  error: null,
  register: () => {},
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext(defaultValues);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const register = async ({ ...user }: RegisterForm) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    setError(null);

    if (res.ok) {
      setUser(data.user);
      router.push("/account/dashboard");
    } else {
      setError(data.message);
    }
  };

  const login = async ({ email: identifier, password }: LoginForm) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/account/dashboard");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  const logout = async () => {
    console.log("logout");
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    console.log(res);

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
