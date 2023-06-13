import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="h-[20vh] bg-negro">
      <Link to="/myseries" className="text-blancoblanco">
        Mis Series
      </Link>
    </div>
  );
};

export default Footer;
