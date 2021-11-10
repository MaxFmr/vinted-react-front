import logo from "../img/logo.png";

const Header = () => {
  return (
    <header>
      <img src={logo} alt="" />
      <input type="text" placeholder="Recherche des articles" />
      <button>S'inscrire</button>
      <button>Se connecter</button>

      <button>Vends tes articles</button>
    </header>
  );
};

export default Header;
