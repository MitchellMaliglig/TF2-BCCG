import React, { FormEvent, useState } from 'react';
//import { saveEntry } from '../lib/data';
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

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(commands);
    // const newEntry = {
    //   title: 'title',
    //   description: 'description',
    //   commands: 'tf_bot_add 1 medic red expert;',
    // };
    try {
      //await saveEntry(newEntry);
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
    const commandData = Object.fromEntries(formData);
    const command = `tf_bot_add ${commandData.count} ${commandData.class} ${commandData.team} ${commandData.difficulty}`;
    setCommands((c) => [...c, command]);
  }

  return (
    <>
      <h2 className="page-heading">{pageType} Page</h2>
      <EntryForm
        onSave={handleSave}
        onAddCommand={handleAddCommand}
        entryOptions={entryOptions}
        commands={commands}
      />
    </>
  );
}
