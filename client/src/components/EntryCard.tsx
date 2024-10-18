import { Entry } from '../lib/data';
import { faPencilAlt, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { TeamBoxes } from './TeamBoxes';
import { useNavigate } from 'react-router-dom';

type entryCardProps = {
  entry: Entry;
};

export function EntryCard({ entry }: entryCardProps) {
  const [showToolTip, setShowToolTip] = useState(false);
  const toolTipRef = useRef(null);
  const navigate = useNavigate();
  const commands = entry.commands.split(';').filter((c) => c.length > 0);

  async function handleCopy() {
    let text =
      'sv_cheats 1;\n' +
      'tf_bot_keep_class_after_death 1;\n' +
      'tf_bot_reevaluate_class_in_spawnroom 0;\n' +
      'mp_teams_unbalance_limit 0;\n' +
      'tf_bot_kick all;\n';
    try {
      for (let i = 0; i < commands.length; i++) {
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
        <TeamBoxes commands={commands} isEditing={false} />
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
              <div ref={toolTipRef} className="copy-tooltip">
                Copied!
              </div>
            )}
          </div>
          <FontAwesomeIcon
            icon={faPencilAlt}
            className="icon pencil"
            onClick={() =>
              navigate(`/entries/${entry.entryId}`, {
                state: { title: entry.title, description: entry.description },
              })
            }
          />
        </h3>
        <p className="text-box">{entry.description}</p>
      </div>
    </li>
  );
}
