export type User = {
  userId: number;
  username: string;
};

export type Auth = {
  user: User;
  token: string;
};

export type Entry = {
  entryId: number;
  userId: number;
  title: string;
  description: string;
  commands: string;
};

const authKey = 'tf2-bccg.pizza.auth';

export function saveAuth(user: User, token: string): void {
  const auth: Auth = { user, token };
  localStorage.setItem(authKey, JSON.stringify(auth));
}

export function removeAuth(): void {
  localStorage.removeItem(authKey);
}

export function readToken(): string | undefined {
  const auth = localStorage.getItem(authKey);
  if (!auth) return undefined;
  return (JSON.parse(auth) as Auth).token;
}

export async function readEntries(): Promise<Entry[]> {
  const res = await fetch('/api/entries', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${readToken()}`,
    },
  });
  if (!res.ok) throw new Error(`fetch error: ${res.status}`);
  return (await res.json()) as Entry[];
}
