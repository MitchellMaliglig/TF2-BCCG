import React, { useState } from 'react';
import { saveEntry } from '../lib/data';
import { useNavigate } from 'react-router-dom';
import { EntryForm } from '../components/EntryForm';

/*
  pageType can be "Create Entry" or "???"
*/
type entryPageProps = {
  pageType: string;
};

export function EntryPage({ pageType }: entryPageProps) {
  const navigate = useNavigate();
  const [commands, setCommands] = useState([] as string[]);
  const [showToolTip, setShowToolTip] = useState(false);
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

  async function handleSave(Entryitle: string, entryDescription: string) {
    const newEntry = {
      title: Entryitle,
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
      />
    </>
  );
}
