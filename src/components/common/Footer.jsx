import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="h-[20vh] dark:bg-negro bg-purpuraoscuro">
      {" "}
      <Link to="/myseries">Mis series</Link>
    </div>
  );
};

export default Footer;
