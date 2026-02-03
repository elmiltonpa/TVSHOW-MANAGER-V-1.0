interface InfoProfileProps {
    username: string;
}

const InfoProfile = ({ username }: InfoProfileProps) => {
  return (
    <div className="dark:bg-accent-purple min-h-[200px] lg:h-full bg-accent-light">
      <h1 className="flex justify-center text-2xl sm:text-3xl md:text-4xl py-4 sm:py-2 font-medium">
        {username}
      </h1>
    </div>
  );
};

export default InfoProfile;