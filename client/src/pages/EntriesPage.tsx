import { useEffect, useState } from 'react';
import { Entry, readEntries } from '../lib/data';
import { useUser } from '../components/useUser';
import { EntryCard } from '../components/EntryCard';

export function EntriesPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    async function fetchEntries() {
      try {
        setEntries(await readEntries());
      } catch (err) {
        throw new Error(`Error: ${err}`);
      } finally {
        setIsLoading(false);
      }
    }
    if (user) fetchEntries();
    else setIsLoading(false);
  }, [user]);

  return (
    <>
      <h2 className="page-heading">Entries Page</h2>
      <button id="entry-button">New</button>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <>
          {!user && <p>Please log in to create / view entries.</p>}
          {user && entries.length === 0 && (
            <p>No entries found. Please click "new" to get started.</p>
          )}
          <ul id="entries-list">
            {entries.map((e) => (
              <EntryCard entry={e} key={e.entryId} />
            ))}
          </ul>
        </>
      )}
    </>
  );
}
