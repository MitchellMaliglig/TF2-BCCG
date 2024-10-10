import { FormEvent } from 'react';
import { TeamBoxes } from './TeamBoxes';

type entryFormProps = {
  onSave: (event: FormEvent<HTMLFormElement>) => void;
  onAddCommand: (event: React.MouseEvent<HTMLButtonElement>) => void;
  entryOptions: {
    classes: string[];
    teams: string[];
    difficulties: string[];
  };
  commands: string[];
};

export function EntryForm({
  onSave,
  onAddCommand,
  entryOptions,
  commands,
}: entryFormProps) {
  return (
    <form onSubmit={onSave} id="entry-form">
      <div className="row">
        <label htmlFor="count">
          Count
          <input
            type="number"
            id="count"
            name="count"
            defaultValue={1}
            min={1}
          />
        </label>
        <label htmlFor="class">
          Class
          <select id="class" name="class">
            {entryOptions.classes.map((c, i) => (
              <option value={c} key={i}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="row">
        <label htmlFor="team">
          Team
          <select id="team" name="team">
            {entryOptions.teams.map((t, i) => (
              <option value={t} key={i}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="difficulty">
          Difficulty
          <select id="difficulty" name="difficulty">
            {entryOptions.difficulties.map((d, i) => (
              <option value={d} key={i}>
                {d}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="button" onClick={onAddCommand}>
        Add command
      </button>
      <TeamBoxes commands={commands} />
      <button type="submit">Save</button>
    </form>
  );
}
