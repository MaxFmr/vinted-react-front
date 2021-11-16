import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import React from "react";
import { useLocation } from "react-router-dom";
// import { Navigate } from "react-router";

import axios from "axios";

const Payment = (token) => {
  const feesBuyer = 0.4;
  const shippingFees = 0.8;
  const total = feesBuyer + shippingFees;
  const location = useLocation();
  const { title, price, user } = location.state;

  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On récupère ici les données bancaires que l'utilisateur rentre
    const cardElement = elements.getElement(CardElement);

    // Demande de création d'un token via l'API Stripe
    // On envoie les données bancaires dans la requête
    const stripeResponse = await stripe.createToken(cardElement, {
      name: user,
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;
    // Une fois le token reçu depuis l'API Stripe
    // Requête vers notre serveur
    // On envoie le token reçu depuis l'API Stripe
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        token: stripeToken,
        title: title,
        amount: total + price,
      }
    );
    console.log(response.data);
    // Si la réponse du serveur est favorable, la transaction a eu lieu
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <>
      {!completed ? (
        <div className="payment-form">
          <form onSubmit={handleSubmit}>
            <ul>
              <li> Résumé de la commande : {title}</li>
              <li>Commande {price} € </li>
              <li>Frais protection acheteurs {feesBuyer} €</li>
              <li>Frais de port {shippingFees} €</li>
              <li>Total : {total + price} €</li>
            </ul>

            <div className="card">
              <CardElement />
            </div>

            <button type="submit">Valider</button>
          </form>
        </div>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </>
  );
};

export default Payment;
