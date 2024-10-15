import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type teamBoxesProps = {
  commands: string[];
  isEditing: boolean;
  onRemoveCommand?: (command: string) => void;
};

export function TeamBoxes({
  commands,
  isEditing,
  onRemoveCommand,
}: teamBoxesProps) {
  const teams = {
    blue: commands.filter((c) => c.includes('blue')),
    red: commands.filter((c) => c.includes('red')),
  };

  return (
    <>
      {teams.blue.length > 0 && (
        <ul className="blue-box">
          {teams.blue.map((b, i) => (
            <li key={i}>
              {b}
              {isEditing && onRemoveCommand && (
                <FontAwesomeIcon
                  icon={faXmark}
                  className="remove-entry"
                  onClick={() => {
                    onRemoveCommand(b);
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
      {teams.red.length > 0 && (
        <ul className="red-box">
          {teams.red.map((r, i) => (
            <li key={i}>
              {r}
              {isEditing && onRemoveCommand && (
                <FontAwesomeIcon
                  icon={faXmark}
                  className="remove-entry"
                  onClick={() => {
                    onRemoveCommand(r);
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
