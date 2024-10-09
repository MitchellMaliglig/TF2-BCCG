import React, { FormEvent } from 'react';
//import { saveEntry } from '../lib/data';
import { useNavigate } from 'react-router-dom';

/*
  pageType can be "Create Entry" or "???"
*/
type entryPageProps = {
  pageType: string;
};

export function EntryPage({ pageType }: entryPageProps) {
  const navigate = useNavigate();
  const classes = [
    'scout',
    'soldier',
    'pyro',
    'demoman',
    'heavyweapons',
    'engineer',
    'medic',
    'sniper',
    'spy',
  ];
  const teams = ['blue', 'red'];
  const difficulties = ['easy', 'normal', 'hard', 'expert'];

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
    const command = `tf_bot_add ${commandData.count} ${commandData.class} ${commandData.team} ${commandData.difficulty};`;
    console.log(command);
  }

  return (
    <>
      <h2 className="page-heading">{pageType} Page</h2>
      <form onSubmit={handleSave}>
        <label htmlFor="count">Count</label>
        <input type="number" id="count" name="count" defaultValue={1} min={1} />
        <label htmlFor="class">Class</label>
        <select id="class" name="class">
          {classes.map((c, i) => (
            <option value={c} key={i}>
              {c}
            </option>
          ))}
        </select>
        <label htmlFor="team">Team</label>
        <select id="team" name="team">
          {teams.map((t, i) => (
            <option value={t} key={i}>
              {t}
            </option>
          ))}
        </select>
        <label htmlFor="difficulty">Difficulty</label>
        <select id="difficulty" name="difficulty">
          {difficulties.map((d, i) => (
            <option value={d} key={i}>
              {d}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleAddCommand}>
          Add command
        </button>
        <button type="submit">Save</button>
      </form>
    </>
  );
}
