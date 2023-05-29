import SearchSerie from "./SearchSerie";

const Home = ({ token, user }) => {
  return (
    <div className="bg-negro px-32 py-2">
      <SearchSerie user={user} token={token} />
    </div>
  );
};

export default Home;
