/* eslint-disable indent */
import { useParams,useNavigate } from "react-router-dom"
import {useState, useEffect} from "react"
import series from "../api/service"

import scraper from "../services/scraper"


const SerieLinks = () => {
    const { id,season,episode } = useParams();
    const [links, setLinks] = useState({
      ingles: [],
      latino: []
  });
    const [serie,setSerie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            document.title = "Links - TvShowManager"
            const session = JSON.parse(window.localStorage.getItem("session"));
            if (!session || session.expirationDate < Date.now()) {
              navigate("/login");
            }
            const { username } = session;


            try {
                const serie = await series.searchTvShowById(id).then((res) => res);
                setSerie(serie);
                const Links = await scraper.getLinks({ idSerie: id, username: username }).then((res) => res.data);
                const seasonIndex = parseInt(season, 10); // 10 indica base decimal
                const episodeIndex = parseInt(episode, 10);
                console.log(serie);
                if (Links)  {
                  setLinks(Links.arraySerie[seasonIndex-1][episodeIndex-1]);
                } 
       
                console.log(Links.arraySerie[seasonIndex-1][episodeIndex-1]);
            } catch (error) {
              console.log("Error al obtener los links", error);

              setLinks({
                ingles: [],
                latino: []
            });
            }
            setIsLoading(false);
        }
        
        fetchData();
    } , [id, season, episode, navigate])

    if (isLoading) {
        return <div>Cargando links...</div>
    }

    return (
        <div>
           
          {(links.ingles.length > 0 || links.latino.length > 0) ? (
            <div className="text-center min-h-screen flex flex-col items-center">
              <h1>{serie.name}</h1>
              <h2>Temporada {season} - Episodio {episode}</h2>
              {["ingles", "latino"].map((idioma, idiomaIndex) => (
                <div key={idiomaIndex}>
                  <h3>{idioma === "ingles" ? "Inglés" : "Latino"}</h3>
                  <ul>
                    {links[idioma].map((link, index) => (
                      <li key={index}>
                        <a href={link} target="_blank" rel="noreferrer">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                ))}
            </div>
          ) : (
            <div className="text-center min-h-screen flex flex-col items-center">
              <h1>{serie.name}</h1>
              <h2>Temporada {season} - Episodio {episode}</h2>
              <p>No se encontraron links</p>
            </div>
          )}
        </div>
      );
}

export default SerieLinks