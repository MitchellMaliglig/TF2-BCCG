import { useEffect, useState } from 'react';
import { Entry, readEntries } from '../lib/data';
import { useUser } from '../components/useUser';

export function EntriesPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  //const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  console.log('hi');

  useEffect(() => {
    async function fetchEntries() {
      try {
        setEntries(await readEntries());
      } catch (err) {
        throw new Error(`Error: ${err}`);
      }
    }
    if (user) fetchEntries();
  }, [user]);

  return (
    <>
      <h2 className="page-heading">Entries Page</h2>
      {!user && <p>Please log in to create / view entries</p>}
      {entries.map((e) => (
        <div key={e.entryId}>
          <p>{e.title}</p>
          <p>{e.description}</p>
          <p>{e.commands}</p>
        </div>
      ))}
    </>
  );
}
