const { Router } = require("express");
const { User, Product, Price, Plan } = require("../db.js");
const stripe = require("stripe")(
  "sk_test_51LKNzDKnUbeOMCuBWiIXGCyWrD6OQaRp8lTVTDIp2Ujt9hOr53xap33cEmG2KQgqfsLbCbSeDP9DlVeKpkuQfx2I00iHGZf3Up"
);


stripeServer.post("/stripe-webhook", async (req, res) => {
    let data;
    let eventType;
    // Check if webhook signing is configured.
    const webhookSecret = "whsec_7nzuMxGdDD2GkuZjNfdEzJnX3gB7FoJV";
    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];
  
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data;
      eventType = req.body.type;
    }
  
    switch (eventType) {
        case "checkout.session.completed":
          // Payment is successful and the subscription is created.
          // You should provision the subscription and save the customer ID to your database.
          break;
    
        case "customer.created":
          break;
    
        case "invoice.created":
          break;
    
        case "invoice.paid":
          // Continue to provision the subscription as payments continue to be made.
          // Store the status in your database and check when a user accesses your service.
          // This approach helps you avoid hitting rate limits.
          break;
        case "invoice.payment_failed":
          // The payment failed or the customer does not have a valid payment method.
          // The subscription becomes past_due. Notify your customer and send them to the
          // customer portal to update their payment information.
          break;
          checkout.session.async_payment_succeeded;
    
        default:
        // Unhandled event type
      }
    res.sendStatus(200);
  });

  module.exports = stripeServer;
 