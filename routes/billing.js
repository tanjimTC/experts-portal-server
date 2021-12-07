const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SK);

router.post("/stripe/charge", async (req, res) => {
  console.log("req.body", req.body);

  const charge = await stripe.charges.create({
    amount: req.body.rate,
    currency: "usd",
    description: "Example charge",
    source: req.body.tokenID,
  });
  console.log(charge);
  if (!charge.paid) {
    return res.status(400).json({ error: "Payment was not finalized!" });
  }

  res.send(charge);
});

module.exports = router;
