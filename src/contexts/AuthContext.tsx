import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import Router from "next/router";
import { api } from '../services/apiClient';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export const signOut = () => {
  try {
    destroyCookie(undefined, "@nextauth.token");
    Router.push("/");
  } catch (error) {
    console.log("Erro ao deslogar");
  }
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  const signIn = async ({ email, password }: SignInProps) => {
    try {
      const response = await api.post('/session', {
        email, password
      })

      // console.log(response.data)
      const { id, name, token } = response.data
      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24, // expira em 1 dia
        path: "/" // quais caminhos terao acesso ao cookie
      })

      setUser({ id, name, email });

      // passar o token para as proximas requests
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      // redirecionar o usuario para dashboard
      Router.push('/dashboard');
    } catch (err) {
      console.log('ERRO AO LOGAR: ', err)
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
