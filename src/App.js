import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
// import du package axios
import axios from "axios";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Product from "./components/Product";
import Header from "./components/Header";
function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // --------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <Header />
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {" "}
              <Link to="/product/:id">Product</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/product/" element={<Product data={data} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
