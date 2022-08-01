const { Router } = require("express");
const { User } = require("../db");
const stripe = require("stripe")("sk_test_51LKNzDKnUbeOMCuBWiIXGCyWrD6OQaRp8lTVTDIp2Ujt9hOr53xap33cEmG2KQgqfsLbCbSeDP9DlVeKpkuQfx2I00iHGZf3Up");
const user = Router();

// copmo obtengo precio, account strippe(quizas body) y quantyty (front precio y cantidad)
// PRIMER GET: OBTIENE Y CREA UN PAYMENT LINK, DE UNA CUENTA CONNECTADA A STRIPE(FIRST COONECTED ACCOUNT) CON UN PRECIO Y UNA CANTIDAD
// QUE LA  CANTIDAD SEGURAMENTE VENDRA DEL CLIENTE, AQUI LO QUE HAY QUE HACER LUEGO ES QUE LOS USER QUE ENTREN  A LA APP
// PUEDAN PAGAR CON LA CUENTA CONNECTADA A STRIPE A TRAVEZ DE UN LINK QUE SE CREA EN ESTA RUTA

// {CUENTA TEST}
// stripeAccount: "acct_1LPoEU3W6JgxHUD3",
var accountTest = "acct_1LPoEU3W6JgxHUD3";
// price: "price_1LPofz3W6JgxHUD3w7MHE6el",
var priceTestAccount = "price_1LPofz3W6JgxHUD3w7MHE6el";
// {SECOND COONECTED ACCOUNT}
// destination: 'acct_1LPnVc4ISwRLfNGN',
var connectedAccount = "acct_1LPnVc4ISwRLfNGN";
// price: 'price_1LPpb14ISwRLfNGNGnhW9X4W',
var priceConnectedAccount = "price_1LPpb14ISwRLfNGnhW9X4W";


user.post("/account-connect", async (req, res) => {
  try {
    const account = await stripe.accounts.create({ type: "express" });

    res.send(account);
  } catch (error) {
    console.log(error);
  }
});

user.post("/createUser", async (req, res) => {
  const { name, email, } = req.body;
  try {
    const account = await stripe.accounts.create({ type: "express" });
    console.log(account.id, "HOLA SOY ACCOUNT DE STRIPE CONNECTED");
    const userCreate = await User.create({
      name: name,
      email: email,
      account: account.id,
    });
    res.send(userCreate);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

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



// ((e) => {
//   return {
//      mcc: account.business_profile.mcc,
//      name: account.business_profile.name,
//      product_description: account.business_profile.product_description,
//      support_phone: account.business_profile.support_phone,
//      support_email: account.business_profile.support_email,
//      url: account.business_profile.url,
//      support_address: account.business_profile.support_address,
//      support_email: account.business_profile.support_email,
//      support_phone: account.business_profile.support_phone,
//      support_url: account.business_profile.support_url,
//      url: account.business_profile.url,
//   }});

// const dbId = async (id) => {
//   try {
//     const dbGame = await Videogame.findByPk(id, { include: Genres });
//     return {
//       id: dbGame.id,
//       image: dbGame.background_image,
//       name: dbGame.name,
//       description: dbGame.description,
//       released: dbGame.released,
//       rating: dbGame.rating,
//       platforms: dbGame.platforms,
//       genres: dbGame.genres.map((e) => e.name),
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };

// const response = await  stripe.costumers.create({
//   email:email
// })



module.exports = user;
