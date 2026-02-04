import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-background-dark text-foreground dark:text-white px-4">
      <SEO title="Page Not Found" description="The page you are looking for does not exist." />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8 text-center">
        Oops! La página que buscas no existe o ha sido movida.
      </p>
      <Link
        to="/home"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
