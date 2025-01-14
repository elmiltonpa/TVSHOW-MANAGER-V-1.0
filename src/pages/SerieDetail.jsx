/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SectionSeason from "../components/seasons/SectionSeason";
import Spinner from "../components/common/Spinner";
import CardDetail from "../components/detail/CardDetail";
import api from "../api/service";
import serieService from "../services/series";
import getUser from "../services/user";
import ReactModal from "react-modal";
import scraperService from "../services/scraper";

const SerieDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [serieWatched, setSerieWatched] = useState(false);
  const [serieAdded, setSerieAdded] = useState(false);
  const [serie, setSerie] = useState(null);
  const [seasons, setSeasons] = useState(null);
  const [seasonwatching, setSeasonsWatching] = useState(null);
  const [modal,setModal] = useState(false);
  const { id } = useParams();

  const [url, setUrl] = useState(""); // Estado para el URL ingresado
  const [linksLoading,setLinksLoading] = useState(false);
  const [thereLinks,setThereLinks] = useState(false);

  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);
  const handleSubmit = async () => {

    try {
      setLinksLoading(true);
      const session = JSON.parse(window.localStorage.getItem("session"));
      const { token } = session;

        const links = await scraperService.scraper({ url, id , token });

              // Asegúrate de que `links` tiene una estructura válida
        if (links && links.status === 200) {
          console.log("Links guardados", links);
        } else {
          console.log("Error al guardar los links", links);
        }
        
        
        


    } catch (error) {
      console.log("Error al guardar los links", error);
    
    }
    setModal(false); // Cierra el modal
    setLinksLoading(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      const session = JSON.parse(window.localStorage.getItem("session"));
      const request = await api.searchTvShowById(id);
      const fetchSeasons = Array.from(
        { length: request.number_of_seasons },
        (_, i) => api.searchTvSeasonById(id, i + 1)
      );
      const seasons = await Promise.all(fetchSeasons);
      setSeasons(seasons);
      if (session) {
        const { username } = session;
        const User = await getUser(username);
        const Series = await serieService.getSeriesByUserId(User.id);
        try {
      
          const Links = await scraperService.getLinks({ idSerie: id, username: username });  
          setThereLinks(Links);
        } catch (error) {
          setThereLinks(false);
        }
  
        const serieSeasonsExist = Series.find(
          (serie) => serie.tv_id == request.id
        ); //ARRAY DE TEMPORADAS WATHCING

        const serieIsFavorite = Series.some(
          (serie) => serie.tv_id == request.id && serie.favorite == true
        );
        const serieIsWatched = Series.some(
          (serie) => serie.tv_id == request.id && serie.watched == true
        );

        if (serieIsFavorite) {
          setSerieAdded(true);
        }
        if (serieIsWatched) {
          setSerieWatched(true);
        }
        if (serieSeasonsExist) {
          const arrayWatching = serieSeasonsExist.watching;

          setSeasonsWatching(arrayWatching);
        }
      }
      setSerie(request);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center dark:bg-gris6 dark:text-blancoblanco items-center pb-56 bg-blancoblanco text-3xl font-bold">
        <Spinner />
      </div>
    );
  }

  return (
    <div className=" bg-blancoblanco dark:bg-gris6 pb-10">
      <CardDetail
        serie={serie}
        serieAdded={serieAdded}
        setSerieAdded={setSerieAdded}
        serieWatched={serieWatched}
        setSerieWatched={setSerieWatched}
      />
      <div className="flex justify-center items-center w-full">
        <div className="w-[75%] ">
          <div className="flex flex-col gap-4 w-full">
            {seasons ? (
              seasons.map((season) => (
                <div key={season.id} className="bg-red-300 flex flex-col">
                  <div className="bg-purpuraoscuro h-full flex flex-col gap justify-center items-center">
                    <SectionSeason
                      seasonwatching={seasonwatching}
                      season={season.season_number}
                      episodes={season.episodes}
                      serieId={id}
                      infoOfSeason={seasons}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <div className="flex w-full pt-5 justify-center items-center">
            {thereLinks ? (<div className="dark:bg-gris7 hover:bg-gris6 text-blancoblanco hover:text-blancoblanco dark:hover:bg-gris7hover bg-gris7 text-3x1 font-semibold dark:text-blancoblanco px-4 py-2 rounded ml-4">YA HAY LINKS CARGADOS</div>) :
            ( <button
              onClick={handleOpenModal}
              className="dark:bg-gris7 hover:bg-gris6 text-blancoblanco hover:text-blancoblanco dark:hover:bg-gris7hover bg-gris7 text-3x1 font-semibold dark:text-blancoblanco px-4 py-2 rounded ml-4"
            >
              CARGAR LINKS
            </button>
          )}
           
          </div>
        </div>
      </div>

      <ReactModal
        isOpen={modal}
        onRequestClose={handleCloseModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "400px",
            padding: "20px",
            borderRadius: "10px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        {linksLoading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div>
          <h2 className="">Ingresar URL</h2>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Ingrese el URL"
          className="w-full p-2 border rounded mt-2"
        />
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={handleCloseModal}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Confirmar
          </button>
        </div>
        </div>) }
      </ReactModal>
    </div>
  );
};

export default SerieDetail;
