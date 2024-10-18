import { useEffect, useRef, useState } from 'react';
import { TeamBoxes } from './TeamBoxes';
import { Modal } from './Modal';

type entryFormProps = {
  onSave: (entryTitle: string, entryDescription: string) => void;
  onAddCommand: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onRemoveCommand: (command: string) => void;
  onDelete: () => void;
  entryOptions: {
    classes: string[];
    teams: string[];
    difficulties: string[];
  };
  commands: string[];
  shouldShowTooltip: boolean;
  title: string;
  description: string;
  pageType: string;
};

export function EntryForm({
  onSave,
  onAddCommand,
  onRemoveCommand,
  onDelete,
  entryOptions,
  commands,
  shouldShowTooltip,
  title,
  description,
  pageType,
}: entryFormProps) {
  const [isOpenSave, setOpenSave] = useState(false);
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [isCommandsEmpty, setCommandsEmpty] = useState(false);
  const [isTitleBlank, setTitleBlank] = useState(false);
  const [isDescriptionBlank, setDescriptionBlank] = useState(false);
  const [formTitle, setFormTitle] = useState(title);
  const [formDescription, setFormDescription] = useState(description);
  const toolTipRef = useRef(null);

  function handleOpenSave() {
    setCommandsEmpty(false);
    setOpenSave(true);
  }

  function handleCancelSave() {
    setOpenSave(false);
  }

  function handleOpenDelete() {
    setOpenDelete(true);
  }

  function handleCancelDelete() {
    setOpenDelete(false);
  }

  function handleSave() {
    if (commands.length === 0) {
      setCommandsEmpty(true);
    } else if (formTitle.length === 0) {
      setTitleBlank(true);
    } else if (formDescription.length === 0) {
      setTitleBlank(false);
      setDescriptionBlank(true);
    } else {
      onSave(formTitle, formDescription);
    }
  }

  useEffect(() => {
    setFormTitle(title);
    setFormDescription(description);
  }, [title, description]);

  return (
    <form id="entry-form">
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
      <div className="add">
        <button type="button" onClick={onAddCommand} ref={toolTipRef}>
          Add command
        </button>
        {shouldShowTooltip && (
          <div ref={toolTipRef} className="duplicate-tooltip">
            Can't add duplicate command!
          </div>
        )}
      </div>
      <TeamBoxes
        commands={commands}
        isEditing={true}
        onRemoveCommand={onRemoveCommand}
      />
      <div className="row" id="delete-save">
        {pageType === 'Modify Entry' && (
          <a onClick={handleOpenDelete} id="delete-entry">
            Delete
          </a>
        )}
        <button type="button" onClick={handleOpenSave} id="save-button">
          Save
        </button>
      </div>
      <Modal isOpen={isOpenDelete} onClose={handleCancelDelete}>
        <h3>Would you like to delete?</h3>
        <div className="row">
          <button type="button" id="delete-no" onClick={handleCancelDelete}>
            No
          </button>
          <button type="button" id="delete-yes" onClick={onDelete}>
            Yes
          </button>
        </div>
      </Modal>
      <Modal isOpen={isOpenSave} onClose={handleCancelSave}>
        <h3>Would you like to save?</h3>
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            id="title"
            required
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="description">Description</label>
          <input
            name="description"
            id="description"
            required
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
          />
        </div>
        {isCommandsEmpty && (
          <p id="no-entries">You ain't saving nothin', lad!</p>
        )}
        {isTitleBlank && <p id="no-title">There's no title, lad!</p>}
        {isDescriptionBlank && (
          <p id="no-description">There's no description, lad!</p>
        )}
        <div className="row">
          <button type="button" id="entry-no" onClick={handleCancelSave}>
            No
          </button>
          <button type="button" id="entry-yes" onClick={handleSave}>
            Yes
          </button>
        </div>
      </Modal>
    </form>
  );
}
