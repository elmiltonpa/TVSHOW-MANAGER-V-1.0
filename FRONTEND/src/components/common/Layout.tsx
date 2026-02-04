import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/home" || location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full">
        <Header />
      </header>
      <main className="flex-grow">
        {children}
      </main>
      {!isHome && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
  );
};

export default Layout;
