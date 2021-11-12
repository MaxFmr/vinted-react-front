import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
        }
      );
      if (response.data.token) {
        //   console.log(response.data);
        // Créer un cookie pour enregistrer le token
        setUser(response.data.token);
        // Naviguer vers Home
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>S'inscrire</h1>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        onChange={(event) => {
          setPassword(event.target.value);
          console.log(password);
        }}
      />
      <input type="submit" onClick={() => navigate("/")} />
    </form>
  );
};

export default Signup;
