const functions = require("firebase-functions");
const express = require("express");
const stripe = require("stripe")(
  "sk_test_51HQYGQIxqPrwjtY2oEHi3xXQt5ZuRbUsjiW7dNMmT9Wi5rMeOf0KNaztEAbWFP2oXPbSvEqedGE06qbLXnGTDzl10091ppBCBy"
);
const cors = require("cors");
const { response, request } = require("express");

// Setting up API

// 1. App Config
const app = express();

// 2. Setting up Middlewares.
app.use(cors({ origin: true }));
app.use(express.json());

// 3. API Routes
app.get("/", (request, response) => response.status(200).send("Hello World"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// 4. Listen Command
exports.api = functions.https.onRequest(app);
