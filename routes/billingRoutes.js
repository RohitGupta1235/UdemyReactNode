const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 500,
        currency: "usd",
        description: "$5 for 5 credits",
        payment_method_types: ["card"],
        // Assuming you pass customer's email in req.body.email
        receipt_email: req.body.email,
      });

      req.user.credits += 5;
      const user = await req.user.save();
      res.send(user);

      // console.log(paymentIntent); // Log the Payment Intent here

      // res.send({
      //   clientSecret: paymentIntent.client_secret,
      // });

      // console.log("Response sent:", paymentIntent.client_secret); // Log the response sent
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
};

// const keys = require("../config/keys");
// const stripe = require("stripe")(keys.stripeSecretKey);

// module.exports = (app) => {
//   app.post("/api/stripe", async (req, res) => {
//     try {
//       // Convert token into a source
//       const source = await stripe.sources.create({
//         type: "card",
//         token: req.body.source,
//       });

//       // Use the source ID when creating the Payment Intent
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: 500, // Amount in cents
//         currency: "usd",
//         description: "$5 for 5 credits",
//         payment_method_types: ["card"],
//         receipt_email: req.body.email,
//         source: source.id, // Pass the source ID instead of the token
//       });

//       console.log(paymentIntent); // Log the Payment Intent object

//       res.send({
//         clientSecret: paymentIntent.client_secret,
//       });

//       console.log("Response sent:", paymentIntent.client_secret); // Log the response sent
//     } catch (err) {
//       console.error("Error creating Payment Intent:", err.message);
//       res.status(500).send({ error: err.message });
//     }
//   });
// };

// const keys = require("../config/keys");
// const stripe = require("stripe")(keys.stripeSecretKey);

// module.exports = (app) => {
//   app.post("/api/stripe", async (req, res) => {
//     // console.log(req.body);
//     try {
//       const charge = await stripe.charges.create({
//         amount: 500, // Amount in cents
//         currency: "usd",
//         description: "$5 for 5 credits",
//         source: req.body.id, // Stripe token or source ID
//         receipt_email: req.body.email, // Assuming you pass customer's email
//       });

//       console.log(charge); // Log the charge object
//     } catch (err) {
//       console.error("Error creating charge:", err.message);
//       res.status(500).send({ error: err.message });
//     }
//   });
// };
