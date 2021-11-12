import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/components/Home";
import Product from "./components/Product";
import Header from "../src/components/Header";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Cookies from "js-cookie";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 10 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };
  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/Login" element={<Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
