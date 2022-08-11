const { Router } = require("express");
const { User } = require("../db");
const stripe = require("stripe")("sk_test_51LKNzDKnUbeOMCuBWiIXGCyWrD6OQaRp8lTVTDIp2Ujt9hOr53xap33cEmG2KQgqfsLbCbSeDP9DlVeKpkuQfx2I00iHGZf3Up");
const user = Router();


// {CUENTA TEST}
// stripeAccount: "acct_1LPoEU3W6JgxHUD3",
var accountTest = "acct_1LPoEU3W6JgxHUD3";
// price: "price_1LPofz3W6JgxHUD3w7MHE6el",
var priceTestAccount = "price_1LPofz3W6JgxHUD3w7MHE6el";



user.post("/account-connect", async (req, res) => {
  try {

      const account = await stripe.accounts.create({
        type: 'custom',
        country: 'US',
        email: 'jenny.rosen@example.com',
        capabilities: {
          card_payments: {requested: true},
          transfers: {requested: true},
        },
      });
    res.send(account);
  } catch (error) {
    console.log(error);
  }
});


// user.post("/createUser", async (req, res) => {
//   const { name, email, } = req.body; //FRONT  EN LOGIN AUTH0
//   try {
//     const account = await stripe.accounts.create({ type: "express" });
//     console.log(account.id, "HOLA SOY ACCOUNT DE STRIPE CONNECTED");
//     const userCreate = await User.create({
//       name: name,
//       email: email,
//       account: account.id,
//     });
//     res.send(userCreate);
//   } catch (error) {
//     res.status(500).send(error);
//     console.log(error);
//   }
// });

 // APP CUENTA PRIMARIA  ----CLIENTES ----PACIENTES 

user.get("/getConnected", async (req, res) => {
  try {
    const accounts = await stripe.accounts.list({});
    var cleanData = accounts.data.map((account) => {
      return {
        id: account.id,
        object: account.object,
        business_profile: account.business_profile, // preguntar jere 
        business_type: account.business_type,
        capabilities: account.capabilities,
        charges_enabled: account.charges_enabled,
        country: account.country,
        created: account.created,
        default_currency: account.default_currency,
        details_submitted: account.details_submitted,
        email: account.email,
        external_accounts: account.external_accounts,
        legal_entity: account.legal_entity,
      };
    });
    res.send(cleanData);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});
//crear ruta para buscar por id 
user.get("/getConnected/:id", async (req, res) => {
  try{
    const account = await stripe.accounts.retrieve(req.params.id);
    res.send(account);
  }catch(error){console.log(error); res.status(500).send(error)}
})


user.post("/accountLink", async (req, res) => {
  try {
    const accountLink = await stripe.accountLinks.create({
      account:  "acct_1LPYfEQKXcCqaVV9", // You must update your Connect branding settings with business name, icon, brand color in order to create an account link.
      refresh_url: 'https://example.com/reauth',
      return_url: 'https://example.com/return',
      type: 'account_onboarding',
    });
     res.send(accountLink);
  } catch (error) { res.status(500).send(error); console.log(error); }
})

user.post("/loginAccount", async (req, res) => {
  try {
    const loginLink = await stripe.accounts.createLoginLink(
      "acct_1LPYfEQKXcCqaVV9" //  "message": "Cannot create a login link for an account that has not completed onboarding.",
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});





user.get("/:email", async (req, res) => {
  try {
    const user = await User.findAll(
      {
        where: {
          email: req.params.email,
        },
      }
    )
    //     console.log(user, "HOLA SOY EL USER")
    const name = user[0].dataValues.name;
     const account = user[0].dataValues.account;
    // console.log(name, "HOLA SOY EL NAME")
    res.send({name, account});
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
})





module.exports = user;
