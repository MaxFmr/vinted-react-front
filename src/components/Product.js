import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = ({ token }) => {
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
          <h1>{data.product_price} € </h1>
          <ul>
            {data.product_details.map((elem, index) => {
              const keys = Object.keys(elem);
              return (
                <li key={index}>
                  <span>{keys[0]}</span>
                  <span> : </span>
                  <div className="informations">{elem[keys[0]]}</div>
                </li>
              );
            })}
          </ul>
          <div className="product-product-name">{data.product_name}</div>
          <div className="product-user">
            Vendeur : @{data.owner.account.username}
          </div>

          <Link
            to={token ? "/payment" : "/login"}
            state={{
              title: data.product_name,
              price: data.product_price,
              user: data.owner.account._id,
            }}
          >
            Acheter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
