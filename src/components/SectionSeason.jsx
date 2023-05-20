import { useState } from "react";

const SectionSeason = ({ episodes }) => {
  const [IsOpen, setIsOpen] = useState(false);

  return (
    <div>
      {IsOpen ? (
        <div>
          <div>
            {episodes.map((episode) => (
              <div key={episode.id}>{episode.name}</div>
            ))}
          </div>
          <div>
            <button onClick={() => setIsOpen(!IsOpen)}>CERRAR</button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => setIsOpen(!IsOpen)}>ABRIR</button>
        </div>
      )}
    </div>
  );
};

export default SectionSeason;
