import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState();
  const [color, setColor] = useState("");
  const [data, setData] = useState();

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("picture", file);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setData(response.data);
      console.log(data);
      navigate(`/product/${response.data._id}`);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  return token ? (
    <div className="publish-form">
      <form onSubmit={handleSubmit}>
        <div className="upload">
          <input
            type="file"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
          />
        </div>

        <div className="publish-title-description">
          <div className="title-description">
            <span>Titre</span>
            <input
              type="text"
              placeholder="title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div>
            <span>Décris ton article</span>
            <input
              type="text"
              placeholder="Description"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>

        <div className="publish-informations">
          <div>
            Marque
            <input
              type="text"
              placeholder="Marque"
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
          </div>
          <div>
            Taille
            <input
              type="text"
              placeholder="Taille"
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>
          <div>
            Couleur
            <input
              type="text"
              placeholder="Couleur"
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
          Etat
          <input
            type="text"
            placeholder="Etat"
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
          <div>
            Lieu
            <input
              type="text"
              placeholder="Lieu"
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
        </div>
        <div>
          Prix
          <input
            type="text"
            placeholder="Prix"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </div>

        <input type="submit" value="Ajouter" />
      </form>
    </div>
  ) : (
    <Navigate to={"/login"} state={{ fromPublish: true }} />
  );
};

export default Publish;
