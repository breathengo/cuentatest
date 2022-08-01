const { Router } = require("express");
const { User } = require("../db");
const stripe = require("stripe")("sk_test_51LKNzDKnUbeOMCuBWiIXGCyWrD6OQaRp8lTVTDIp2Ujt9hOr53xap33cEmG2KQgqfsLbCbSeDP9DlVeKpkuQfx2I00iHGZf3Up");
const payment = Router();


payment.post("/createProduct", async (req, res) => {
  const { name } = req.body;
  try {
    const product = await stripe.products.create({
      name: name,
    });
    res.send(product.id);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

//cear ruta para precio 
payment.post("/createPrice", async (req, res) => {
  const { currency, unit_amount } = req.body;
  try {
    const price = await stripe.prices.create({
      currency: currency,
      unit_amount: unit_amount,
      product: 'prod_MAKry0BmTBgPRT', // preguntar a jere
    });
    res.send(price);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

payment.get("/listCapabilities", async (req, res) => {
  try {
    const capabilities = await stripe.accounts.listCapabilities(
      "acct_1LS0bFQS77PgI4GT"
    );
    res.send(capabilities.data);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});
payment.get("/retrieve" , async (req, res) => {

 try{
  const capability = await stripe.accounts.retrieveCapability({
    account: "acct_1LS0bFQS77PgI4GT",
  }
  );
  res.send(capability);
 }catch(error){console.log(error); res.status(500).send(error)}
})


//crear ruta para actualizar las capabilities
payment.post("/update", async (req, res) => {
  //const { account_id, capabilities } = req.params;
  try {
    const capability = await stripe.accounts.updateCapability(
      'acct_1LKNzDKnUbeOMCuB',
      'card_payments',
      {requested: true}
      );
      console.log(capability)
    res.send(capability);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}
);




payment.get("/checkout-session", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: "price_1LS0DFKnUbeOMCuBZeEjh9hN",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/failure",
        payment_intent_data: {
          application_fee_amount: 123,
          transfer_data: {
            destination: "acct_1LS0bFQS77PgI4GT",
          },
        },
      });
      res.send(session);
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  });


payment.get("/", async (req, res) => {
    try {
      //const getAllUser = await User.findAll();
      const paymentLink = await stripe.paymentLinks.create(
        {
          line_items: [
            {
              price: priceTestAccount,
              quantity: 1,
            },
          ],
        },
        {
          stripeAccount: accountTest,
        }
      );
      res.send(paymentLink.url);
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  });

// const getToken = async (code) => {
// 	let token = {};
// 	try {
// 		token = await stripe.oauth.token({ grant_type: 'authorization_code', code });
// 	} catch (error) {
// 		token.error = error.message;
// 	}
// 	return token;
// }


module.exports = payment
