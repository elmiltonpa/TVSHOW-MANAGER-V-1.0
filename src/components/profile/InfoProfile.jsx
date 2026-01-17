const InfoProfile = ({ username }) => {
  return (
    <div className="dark:bg-twitch min-h-[200px] lg:h-full bg-purpura">
      <h1 className="flex justify-center text-2xl sm:text-3xl md:text-4xl py-4 sm:py-2 font-medium">
        {username}
      </h1>
    </div>
  );
};

export default InfoProfile;
