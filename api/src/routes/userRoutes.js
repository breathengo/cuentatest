const { Router } = require("express");
const { User } = require("../db");

const user = Router();
const {account,accountLink} = require('./stripeConnect.js');

user.get("/", async (req, res) => {
  try {
    const getAllUser = await User.findAll();
    res.send(getAllUser);
  } catch (error) {
    console.log(error);
  }
});

// user.post("/createUser", async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     const userCreate = await User.create({
//       name,
//       email,
//     });
//     res.json(userCreate);
//   } catch (error) {
//     console.log(error);
//   }
// });

// user.post("/createUserStripe", async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     const userCreate = await User.create({
//       name,
//       email,
//     });
//     const account = await stripe.accounts.create({type: 'standard'});
//     const accountLink = await stripe.accountLinks.create({
//       account: account.id,
//       refresh_url: 'https://example.com/reauth',
//       return_url: 'https://example.com/return',
//       type: 'account_onboarding',
//     });
//     res.json(accountLink, userCreate);
//   } catch (error) {
//     console.log(error);
//   }
// })

module.exports = user;
