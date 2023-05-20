import SearchSerie from "./SearchSerie";

const Home = ({ token, user }) => {
  console.log("home");
  return (
    <div className="bg-negroclaro px-32">
      <SearchSerie user={user} token={token} />
    </div>
  );
};

export default Home;
