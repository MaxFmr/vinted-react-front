import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
//requete axios?

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="container">
      {data.offers.map((offers, index) => {
        console.log(offers);
        return (
          <>
            <p>{offers.owner.account.username}</p>
            {offers.product_pictures.length > 0 ? (
              <Link to={`/product/${offers._id}`}>
                <img
                  src={offers.product_image.secure_url}
                  alt=""
                  className="offers"
                />
              </Link>
            ) : (
              <p> Pas d'image </p>
            )}{" "}
            <div key={index}>{offers.product_name}</div>
            <p>{offers.product_price} €</p>
          </>
        );
      })}
    </div>
  );
};

export default Home;

<div></div>;
