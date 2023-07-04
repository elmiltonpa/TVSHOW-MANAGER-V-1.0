const InfoProfile = ({ username }) => {
  return (
    <div className="dark:bg-twitch h-full bg-purpura">
      <h1 className="flex justify-center text-4xl py-2 font-medium ">
        {username}
      </h1>
    </div>
  );
};

export default InfoProfile;
