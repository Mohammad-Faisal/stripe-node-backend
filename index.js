const express = require("express");
const app = express();
var cors = require("cors");
const PORT = 3001;

const stripe = require("stripe")("YOUR_SECRET_KEY_HERE");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(PORT, () => {
  console.log(`app is listening on port ~${PORT}`);
});
