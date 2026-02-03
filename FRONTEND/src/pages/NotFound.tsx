import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-background-dark text-foreground dark:text-white px-4">
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
