import { createContext, ReactNode, useEffect, useState } from "react";
import { recoverUserInformation, signInRequest } from "../services/auth";
import Router from 'next/router'

import { setCookie, parseCookies } from 'nookies'
import { api } from "../services/api";

type User = {
  name: string;
  email: string;
  avatar_url: string;
}

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderProps = {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => { 
    const {'next-auth.token' : token} = parseCookies()

    if(token){
      recoverUserInformation().then(response => setUser(response.user))
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({
      email,
      password
    })

    setCookie(undefined, 'next-auth.token', token, {
      maxAge: 60 * 60 * 1 // 1 hour

    });

    api.defaults.headers['Authorizaton'] = `Bearer ${token}`;

    setUser(user);

    Router.push('/dashboard');
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
