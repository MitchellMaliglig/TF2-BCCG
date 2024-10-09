import { saveEntry } from '../lib/data';
import { useNavigate } from 'react-router-dom';

/*
  pageType can be "Create Entry" or "???"
*/
type entryPageProps = {
  pageType: string;
};

export function EntryPage({ pageType }: entryPageProps) {
  const navigate = useNavigate();

  async function handleSave() {
    const newEntry = {
      title: 'Pizza Time Five',
      description:
        'Pizza pizza pizza pizza pizza' +
        ' pizza pizza pizza pizza pizza pizza pizza' +
        ' pizza pizza pizza pizza pizza pizza pizza',
      commands: 'tf_bot_add 1 medic red expert;',
    };
    try {
      await saveEntry(newEntry);
    } catch (err) {
      console.error(err);
    } finally {
      {
        /*
        the "/" in navigate() is required to
        navigate to "/entries" instead of
        "/create-entry/entries"
      */
      }
      navigate('/entries');
    }
  }

  return (
    <>
      <h2 className="page-heading">{pageType} Page</h2>
      <button onClick={handleSave}>Save</button>
    </>
  );
}
