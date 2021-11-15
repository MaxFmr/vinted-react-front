import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Publish = ({ setUser }) => {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState(0);
  const [color, setColor] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/publish",
        {
          title: { title },
          description: { description },
          price: { price },
          condition: { condition },
          city: { city },
          brand: { brand },
          size: { size },
          color: { color },
          picture: { file },
        }
      );
      //   if (response.data.token) {
      //     //   console.log(response.data);
      //     // Créer un cookie pour enregistrer le token
      //     setUser(response.data.token);
      //     // Naviguer vers Home
      //     navigate("/");
      //   }

      //si token ok ===> rediriger vers page de l'annonce
      // si pas de token ===> rediriger versla page d'identification
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="publish-form">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
        />
        <input
          type="text"
          placeholder="title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Marque"
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Taille"
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Couleur"
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Etat"
          onChange={(event) => {
            setCondition(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Lieu"
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Prix"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <input type="submit" onClick={() => navigate("/")} />
      </form>
    </div>
  );
};

export default Publish;
