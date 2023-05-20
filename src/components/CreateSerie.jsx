import { useState } from "react";
import serieService from "../services/series";

const CreateSerie = ({ token }) => {
  const [serie, setSerie] = useState(null);

  const handleSubmit = async () => {
    try {
      const serieCreated = await serieService.createSerie({ id: serie }, token);
      console.log(serieCreated);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input placeholder="id" onChange={(e) => setSerie(e.target.value)} />
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default CreateSerie;
