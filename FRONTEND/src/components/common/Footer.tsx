import { Link } from "react-router-dom";
import { FaGithub, FaCode, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary dark:bg-black text-white py-8 px-4 sm:px-8 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Sección 1: Brand & Descripción */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <h2 className="text-2xl font-bold tracking-wider">TVSHOW MANAGER</h2>
          <p className="text-sm text-gray-200 dark:text-gray-400 max-w-xs">
            Organiza, descubre y lleva el control de tus series favoritas en un solo lugar.
          </p>
        </div>

        {/* Sección 2: Enlaces Rápidos */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold mb-2 text-warning">Navegación</h3>
          <Link to="/" className="hover:text-warning transition-colors text-sm">Inicio</Link>
          <Link to="/myseries" className="hover:text-warning transition-colors text-sm">Mis Series</Link>
          <Link to="/profile" className="hover:text-warning transition-colors text-sm">Mi Perfil</Link>
        </div>

        {/* Sección 3: Social & Repo */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <h3 className="text-lg font-semibold text-warning">Conecta</h3>
          <div className="flex space-x-6">
            <a 
              href="https://github.com/miltondw/tvshow-manager" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:text-warning transition-transform hover:scale-110"
              aria-label="GitHub Repository"
            >
              <FaCode />
            </a>
            <a 
              href="https://github.com/miltondw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:text-warning transition-transform hover:scale-110"
              aria-label="My GitHub Profile"
            >
              <FaGithub />
            </a>
             {/* Puedes descomentar esto si quieres agregar LinkedIn
            <a 
              href="https://linkedin.com/in/tu-usuario" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:text-warning transition-transform hover:scale-110"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
            */}
          </div>
          <div className="text-xs text-gray-300 dark:text-gray-500 mt-2">
             Desarrollado con ❤️ por Milton
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 mt-8 pt-4 text-center text-xs text-gray-300 dark:text-gray-500">
        &copy; {currentYear} TvShowManager. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;