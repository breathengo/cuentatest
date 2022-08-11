const { Router } = require("express");
const {User, Product, Price  }= require("../db.js");
const stripe = require("stripe")(
  "sk_test_51LKNzDKnUbeOMCuBWiIXGCyWrD6OQaRp8lTVTDIp2Ujt9hOr53xap33cEmG2KQgqfsLbCbSeDP9DlVeKpkuQfx2I00iHGZf3Up"
  
);
const payment = Router();

payment.post("/createProduct", async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
       
    const product = await stripe.products.create({
      name: name,
      
    },
    {
      stripeAccount: user.dataValues.account,
    });
      
    const dbProduct = await Product.create(
      {
        id: product.id,
        name: name,
        price: 0,
        priceId:  "",
      },)
     //console.log(dbProduct, "HOLA SOY DB PRODUCT")
    res.send(dbProduct.dataValues.id);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});
 // endpoint  que me traiga todos los  productos de la db , un enpoint que me traiga los datos del usuario de la db  en funcion de su correo 
 //
//cear ruta para precio
payment.post("/createPrice/:id", async (req, res) => {
  const { email} = req.body;
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    const dbProduct = await Product.findByPk(id);
    //console.log(dbProduct.product, "HOLA SOY EL DBPRODUCT")
    const price = await stripe.prices.create({
      currency: req.body.currency,
      unit_amount: req.body.unit_amount,
      product: dbProduct.dataValues.id,
    },
    {
      stripeAccount: user.dataValues.account,
    }
    );
     console.log(price, "HOLA SOY PRICE")
   dbProduct.price = price.unit_amount 
   //console.log(dbProduct.price, "HOLA SOY EL PRICE")
   dbProduct.priceId = price.id
   //console.log(dbProduct.metadata.priceid, "HOLA SOY EL PRICEID")
   await dbProduct.save()

    
    res.send(dbProduct);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});


payment.post("/createUser/", async (req, res) => {
 
    const {email, name } = req.body;
  try {
    const account = await stripe.accounts.create({type: 'standard', 
    business_type: "company",
    company: {
      name:name,
    }
  });
    const user = await User.create({
      name: name,
      email:email,
      account: account.id,
    })
   //console.log(user, "HOLA SOY EL USER")
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});


payment.post("/paymentLink/", async (req, res) => {
  const { quantity, productId, email } = req.body;
 
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    console.log(user, "HOLA SOY EL USER")
    const dbPrductId = await Product.findByPk(productId);
      console.log(dbPrductId, "HOLA SOY EL PRODUCTID")
    const paymentLink = await stripe.paymentLinks.create(
      {
        line_items: [
          {
            price: dbPrductId.dataValues.priceId,
            quantity: quantity,
          },
        ],
      },
      {
        stripeAccount: user.dataValues.account,
      }
      );
      res.send(paymentLink.url);
      //console.log(user.account)
    } catch (error) {
      res.status(500).send(error)
      console.log(error);
    }
  });
  
 //un enpoint que me traiga los datos del usuario de la db  en funcion de su correo 








module.exports = payment;
