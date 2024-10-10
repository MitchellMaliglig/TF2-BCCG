type teamBoxesProps = {
  commands: string[];
};

export function TeamBoxes({ commands }: teamBoxesProps) {
  const teams = {
    blue: commands.filter((c) => c.includes('blue')),
    red: commands.filter((c) => c.includes('red')),
  };

  return (
    <>
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
    </>
  );
}
