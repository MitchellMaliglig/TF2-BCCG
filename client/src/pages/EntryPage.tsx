import React, { useEffect, useState } from 'react';
import { readEntry, saveEntry } from '../lib/data';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { EntryForm } from '../components/EntryForm';

/*
  pageType can be "Create Entry" or "Modify Entry"
*/
type entryPageProps = {
  pageType: string;
};

export function EntryPage({ pageType }: entryPageProps) {
  const navigate = useNavigate();
  const [commands, setCommands] = useState([] as string[]);
  const [showToolTip, setShowToolTip] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { entryId } = useParams();
  const location = useLocation();
  const entryOptions = {
    classes: [
      'scout',
      'soldier',
      'pyro',
      'demoman',
      'heavyweapons',
      'engineer',
      'medic',
      'sniper',
      'spy',
    ],
    teams: ['blue', 'red'],
    difficulties: ['easy', 'normal', 'hard', 'expert'],
  };

  useEffect(() => {
    async function fetchEntry() {
      if (pageType === 'Modify Entry') {
        try {
          const entry = await readEntry(Number(entryId));
          setCommands(entry.commands.split(';').filter((c) => c.length > 0));
          setTitle(location.state.title);
          setDescription(location.state.description);
        } catch (err) {
          console.error(err);
        }
      }
    }
    fetchEntry();
  }, []);

  async function handleSave(entryTitle: string, entryDescription: string) {
    const newEntry = {
      title: entryTitle,
      description: entryDescription,
      commands: commands.map((c) => c + ';').join(''),
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

  function handleAddCommand(event: React.MouseEvent<HTMLButtonElement>) {
    const formData = new FormData(event.currentTarget.form!);
    const commandData = {
      count: formData.get('count')?.toString(),
      class: formData.get('class')?.toString(),
      team: formData.get('team')?.toString(),
      difficulty: formData.get('difficulty')?.toString(),
    };
    const command = `tf_bot_add ${commandData.count} ${commandData.class} ${commandData.team} ${commandData.difficulty}`;
    if (!commands.includes(command)) {
      setCommands((c) => [...c, command]);
    } else {
      setShowToolTip(true);
      setTimeout(() => setShowToolTip(false), 2000);
    }
  }

  function handleRemoveCommand(command: string) {
    setCommands((cmds) => cmds.filter((c) => c !== command));
  }

  return (
    <>
      <h2 className="page-heading">{pageType} Page</h2>
      <EntryForm
        onSave={handleSave}
        onAddCommand={handleAddCommand}
        onRemoveCommand={handleRemoveCommand}
        entryOptions={entryOptions}
        commands={commands}
        shouldShowTooltip={showToolTip}
        title={title}
        description={description}
      />
    </>
  );
}
