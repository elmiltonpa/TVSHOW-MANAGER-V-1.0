import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="min-h-[15vh] sm:h-[20vh] dark:bg-foreground bg-primary flex justify-center items-center px-4">
      <Link 
        to="/myseries"
        className="text-background text-base sm:text-lg md:text-xl font-semibold hover:text-warning transition-colors"
      >
        Mis series
      </Link>
    </div>
  );
};

export default Footer;
