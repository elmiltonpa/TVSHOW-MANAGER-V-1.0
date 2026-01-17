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
        return (
          <div className="h-screen flex justify-center items-center dark:bg-gris6 dark:text-grisclaro">
            <div className="text-lg sm:text-xl">Cargando links...</div>
          </div>
        )
    }

    return (
        <div className="px-3 sm:px-6 md:px-12">
           
          {(links.ingles.length > 0 || links.latino.length > 0) ? (
            <div className="text-center min-h-screen flex flex-col items-center py-6 dark:bg-gris6 dark:text-grisclaro">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{serie.name}</h1>
              <h2 className="text-lg sm:text-xl md:text-2xl py-2">Temporada {season} - Episodio {episode}</h2>
              {["ingles", "latino"].map((idioma, idiomaIndex) => (
                <div key={idiomaIndex} className="w-full max-w-4xl py-4">
                  <h3 className="text-lg sm:text-xl font-semibold pb-3">{idioma === "ingles" ? "Inglés" : "Latino"}</h3>
                  <ul className="flex flex-col gap-2">
                    {links[idioma].map((link, index) => (
                      <li key={index} className="break-all">
                        <a 
                          href={link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-sm sm:text-base text-blue-600 dark:text-azultwitter hover:underline"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                ))}
            </div>
          ) : (
            <div className="text-center min-h-screen flex flex-col items-center justify-center dark:bg-gris6 dark:text-grisclaro">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{serie.name}</h1>
              <h2 className="text-lg sm:text-xl md:text-2xl py-2">Temporada {season} - Episodio {episode}</h2>
              <p className="text-base sm:text-lg">No se encontraron links</p>
            </div>
          )}
        </div>
      );
}

export default SerieLinks