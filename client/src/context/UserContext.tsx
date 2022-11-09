import React, { useState, createContext } from "react";

export type AuthUser = {
  userId: string;
  name: string;
  email: string;
};

type UserContextType = {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  isUserLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

type UserContextProviderProps = {
  children: React.ReactNode;
  userId: string;
  name: string;
  email: string;
  isUserLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({
  userId,
  name,
  email,
  children,
  isUserLoggedIn,
  setUserLoggedIn,
}: UserContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>({ userId, name, email });
  return (
    <UserContext.Provider
      value={{ user, setUser, isUserLoggedIn, setUserLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};
