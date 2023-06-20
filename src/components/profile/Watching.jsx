const Watching = ({ seriesWatched }) => {
  return (
    <div className="bg-blancoblanco flex flex-col overflow-y-auto h-full gap-4">
      <h1 className="text-2xl text-center pt-2 font-bold text-purpuraoscuro">
        Series que ya vi
      </h1>
      <div className="h-full">
        {seriesWatched.length > 0 ? (
          seriesWatched.map((serie) => (
            <div key={serie.id}>{serie.tv_title}</div>
          ))
        ) : (
          <div className="text-2xl text-center">
            Todavia no viste ninguna serie
          </div>
        )}
      </div>
    </div>
  );
};

export default Watching;
