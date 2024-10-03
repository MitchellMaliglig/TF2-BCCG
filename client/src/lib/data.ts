export type User = {
  userId: number;
  username: string;
};

type Auth = {
  user: User;
  token: string;
};

const authKey = 'tf2-bccg.pizza.auth';

export function saveAuth(user: User, token: string): void {
  const auth: Auth = { user, token };
  localStorage.setItem(authKey, JSON.stringify(auth));
}

export function removeAuth(): void {
  localStorage.removeItem(authKey);
}
