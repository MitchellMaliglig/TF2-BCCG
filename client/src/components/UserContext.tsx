import { ReactNode, createContext, useState } from 'react';
import { User, removeAuth, saveAuth } from '../lib/data';

export type UserContextValues = {
  user: User | undefined;
  token: string | undefined;
  handleSignIn: (user: User, token: string) => void;
  handleSignOut: () => void;
};

export const UserContext = createContext<UserContextValues>({
  user: undefined,
  token: undefined,
  handleSignIn: () => undefined,
  handleSignOut: () => undefined,
});

type userProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: userProviderProps) {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();

  function handleSignIn(user: User, token: string) {
    setUser(user);
    setToken(token);
    saveAuth(user, token);
  }

  function handleSignOut() {
    setUser(undefined);
    setToken(undefined);
    removeAuth();
  }

  const contextValue = { user, token, handleSignIn, handleSignOut };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
