import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      <div className="product-page">
        <img
          className="product-image"
          src={data.product_image.secure_url}
          alt=""
        />

        <div className="product-informations">
          <h1>{data.product_price}</h1>{" "}
          <ul>
            {data.product_details.map((elem, index) => {
              const keys = Object.keys(elem);
              return (
                <li key={index}>
                  <span>{keys[0]}</span>
                  <span> : </span>
                  <span>{elem[keys[0]]}</span>
                </li>
              );
            })}
          </ul>
          <div>{data.owner.account.username}</div>
          <div>{data.product_name}</div>
          <button>Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
