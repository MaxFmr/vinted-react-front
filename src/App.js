import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/components/Home";
import Product from "./components/Product";
import Header from "../src/components/Header";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Cookies from "js-cookie";
import { useState } from "react";
import Publish from "./components/Publish";
import Payment from "./components/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 10 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };
  return (
    <>
      <Router>
        <Header token={token} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/product/:id"
            element={<Product setUser={setUser} token={token} />}
          />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route
            path="/login"
            element={<Login setUser={setUser} token={token} />}
          />
          <Route
            path="/publish"
            element={<Publish setUser={setUser} token={token} />}
          />
          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <Payment token={token} />
              </Elements>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
