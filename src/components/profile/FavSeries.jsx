import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import useSeries from "../../utils/useSeries";

export const FavSeries = ({ userSeries, username, setUserSeries }) => {
  const { handleDelete2 } = useSeries();

  return (
    <div className="h-full flex pb-5 flex-col overflow-y-auto bg-blancoblanco gap-4">
      <h1 className="text-2xl text-center pt-2 font-bold text-purpuraoscuro">
        Series favoritas
      </h1>
      <div className="flex flex-col px-5 gap-3 w-full">
        {" "}
        {userSeries.length > 0 ? (
          userSeries.map((serie) => (
            <div
              key={serie.id}
              className="flex shadow-seriefav h-16 rounded-lg shadow-negro"
            >
              <div className="w-[83%] p-2">
                <Link to={`/${username}/${serie.tv_id}`} className="h-full">
                  <h1 className="flex h-full text-lg text-center font-medium font-noto flex-col justify-center items-center">
                    {serie.tv_title}
                  </h1>
                </Link>
              </div>
              <div className="w-[17%] flex hover:bg-negro justify-center items-center">
                <button
                  onClick={(e) =>
                    handleDelete2(e, serie.tv_id, userSeries, setUserSeries)
                  }
                  className="h-full hover:text-blancoblanco w-full flex justify-center items-center"
                >
                  <AiFillDelete size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-2xl text-center">
            Aun no tienes series favoritas :(
          </div>
        )}
      </div>
    </div>
  );
};
