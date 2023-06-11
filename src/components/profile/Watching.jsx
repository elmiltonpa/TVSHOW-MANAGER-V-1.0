const Watching = ({ seriesWatched }) => {
  return (
    <div className="bg-blancoblanco h-full">
      <h1 className="text-2xl text-center pt-2 font-bold text-purpuraoscuro">
        Series que ya vi
      </h1>
      <div className="h-full">
        {seriesWatched.length > 0 ? (
          seriesWatched.map((serie) => (
            <div key={serie.id}>{serie.tv_title}</div>
          ))
        ) : (
          <div>Todavia no viste ninguna serie</div>
        )}
      </div>
    </div>
  );
};

export default Watching;
