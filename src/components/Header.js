import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo vinted" />
      </Link>
      <div>
        <i style={{ color: "#CCCCCC" }} class="fas fa-search"></i>
        <input type="text" placeholder="  Recherche des articles" />
      </div>

      <div>
        {token ? (
          <>
            <button
              className="logout"
              onClick={() => {
                setUser(null);
                navigate("/");
              }}
            >
              Se déconnecter
            </button>
            <button
              className="sell"
              onClick={() => {
                Cookies.remove("userToken");
                navigate("/publish");
              }}
            >
              Vends tes articles
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">
              {" "}
              <button className="signup">S'inscrire</button>
            </Link>
            <Link to="/login">
              <button className="login">Se connecter</button>
            </Link>
          </>
        )}
      </div>
      <i style={{ color: "#CCCCCC" }} class="far fa-question-circle"></i>
    </header>
  );
};

export default Header;
