import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Hero from "./Hero";
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
    <>
      <Hero />

      <div className="container">
        {data.offers.map((offers, index) => {
          console.log(offers);
          return (
            <div className="home-products">
              <p className="user">{offers.owner.account.username}</p>

              <Link to={`/product/${offers._id}`}>
                <img
                  src={offers.product_image.secure_url}
                  alt=""
                  className="offers"
                />
              </Link>

              <p className="home-price">{offers.product_price} €</p>
              <div className="home-title" key={index}>
                {offers.product_name}
              </div>
              <p className="home-brand">{offers.product_details[0].MARQUE}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
