import logo from "../img/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <img src={logo} alt="" />
      <input type="text" placeholder="Recherche des articles" />
      <Link to="/signup">
        <button>S'inscrire</button>{" "}
      </Link>
      <Link to="/login">
        <button>Se connecter</button>
      </Link>

      <button>Vends tes articles</button>
    </header>
  );
};

export default Header;
