import { Entry } from '../lib/data';
import { faPencilAlt, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';

type entryCardProps = {
  entry: Entry;
};

export function EntryCard({ entry }: entryCardProps) {
  const [showToolTip, setShowToolTip] = useState(false);
  const toolTipRef = useRef(null);

  // the last value of commands[] is an empty string ""
  const commands = entry.commands.split(';');
  const teams = {
    blue: [] as string[],
    red: [] as string[],
  };

  for (let i = 0; i < commands.length - 1; i++) {
    if (commands[i].includes('blue')) {
      teams.blue.push(commands[i]);
    } else if (commands[i].includes('red')) {
      teams.red.push(commands[i]);
    }
  }

  async function handleCopy() {
    let text =
      'sv_cheats 1;\n' +
      'tf_bot_keep_class_after_death 1;\n' +
      'tf_bot_reevaluate_class_in_spawnroom 0;\n' +
      'mp_teams_unbalance_limit 0;\n';
    try {
      for (let i = 0; i < commands.length - 1; i++) {
        text += commands[i] + ';\n';
      }
      await navigator.clipboard.writeText(text);
      setShowToolTip(true);
      setTimeout(() => setShowToolTip(false), 2000);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <li className="entry-card row">
      <div className="column-half">
        {teams.blue.length > 0 && (
          <ul className="blue-box">
            {teams.blue.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}
        {teams.red.length > 0 && (
          <ul className="red-box">
            {teams.red.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="column-half">
        <h3 className="text-box">
          {entry.title}
          <div className="copy">
            <FontAwesomeIcon
              icon={faCopy}
              className="icon"
              onClick={handleCopy}
              ref={toolTipRef}
            />
            {showToolTip && (
              <div ref={toolTipRef} className="tooltip">
                Copied!
              </div>
            )}
          </div>
          <FontAwesomeIcon
            icon={faPencilAlt}
            className="icon pencil"
            onClick={() => console.log('pencil')}
          />
        </h3>
        <p className="text-box">{entry.description}</p>
      </div>
    </li>
  );
}
