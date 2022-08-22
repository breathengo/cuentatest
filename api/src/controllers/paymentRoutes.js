const { Router } = require("express");
const { User, Product, Price } = require("../db.js");
const stripe = require("stripe")(
  "sk_test_51LKNzDKnUbeOMCuBWiIXGCyWrD6OQaRp8lTVTDIp2Ujt9hOr53xap33cEmG2KQgqfsLbCbSeDP9DlVeKpkuQfx2I00iHGZf3Up"
);
const payment = Router();

payment.post("/createProduct", async (req, res) => {
  const { email } = req.query;
  const {name} = req.body
  console.log(name , "HOLA SOY EL NOMBRE DEL PRODUCTO");
  console.log(email , "HOLA SOY EL EMAIL DEL CLIENTE");
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    //console.log(user, "HOLA SOY EL USER");
    const product = await stripe.products.create(
      {
        name: name,
      },
        {
        stripeAccount: user.dataValues.account,
      }
    );
    const dbProduct = await Product.create({
      id: product.id,
      name: name,
      price: 0,
      priceId: "",
    });
     await user.addProduct(dbProduct) // jere vinculacion del producto al ususario
    //console.log(dbProduct, "HOLA SOY EL PRODUCTO");
  const dbProductId = await dbProduct.dataValues.id;
  const dbProductName = await dbProduct.dataValues.name;
  //const dbEmail = await user.dataValues.email;
    //console.log(dbProduct, "HOLA SOY DB PRODUCT")
    res.send({dbProductName, dbProductId}); 
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});
// endpoint  que me traiga todos los  productos de la db , un enpoint que me traiga los datos del usuario de la db  en funcion de su correo
//
//cear ruta para precio
payment.post("/createPrice/:productId/", async (req, res) => {
  const { unit_amount, currency} = req.body;
  const {email} = req.query;
  const {productId} = req.params;
  console.log(email, "HOLA SOY EL EMAIL");
  console.log(unit_amount, "HOLA SOY EL PRECIO");
  console.log(productId, "HOLA SOY EL PRODUCTID");
  console.log(currency, "HOLA SOY EL CURRENCY");
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    const dbProduct = await Product.findByPk(productId);
    //console.log(dbProduct.product, "HOLA SOY EL DBPRODUCT")
    const price = await stripe.prices.create(
      {
        currency: "usd",
        unit_amount: unit_amount,
        product: dbProduct.dataValues.id,
      },
      {
        stripeAccount: user.dataValues.account,
      }
    );
    //guardar price en la db del modelo de Price 
    const dbPrice = await Price.create({
      id: price.id,
      unit_amount: unit_amount,
      currency: currency,
      product: productId,
    });
    console.log(price, "HOLA SOY PRICE");
    dbProduct.price = price.unit_amount;
    //console.log(dbProduct.price, "HOLA SOY EL PRICE")
    dbProduct.priceId = price.id;
    //console.log(dbProduct.metadata.priceid, "HOLA SOY EL PRICEID")
    await dbProduct.save();
    res.send(dbProduct);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

payment.post("/createUser/", async (req, res) => {
  const { email, name } = req.body;
  try {
    const account = await stripe.accounts.create({
      type: "standard",
      business_type: "company",
      company: {
        name: name,
      },
    });
    const user = await User.create({
      name: name,
      email: email,
      account: account.id,
    });
    //console.log(user, "HOLA SOY EL USER")
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

payment.post("/paymentLink/:id/", async (req, res) => {
  const { quantity} = req.body;
  const { email } = req.query;
  const { id } = req.params;
  console.log(email, "HOLA SOY EL EMAIL");
  console.log(quantity, "HOLA SOY EL QUANTITY");
  console.log(id, "HOLA SOY EL ID");
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    // let priceDB = await Price.findByPk(id)
    //console.log(priceDB.prices, "--prices---");
    const paymentLink = await stripe.paymentLinks.create(
      {
        line_items: [
          {
            price: id,
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
    res.status(500).send(error);
    console.log(error);
  }
});

payment.get("/getAllProducts", async (req, res) => {
   const { email } = req.query;
  try{
    const user = await User.findOne({
      where: {
        email: email,
      }
    })
  const allProducts = await Product.findAll(
    { where: { userId: user.id } }
  )
  res.send(allProducts);
  }catch(error) {
    res.status(500).send(error)
    console.log(error)
  }
})
 payment.get("/getAllPrices", async (req,res) => {
  const { email } = req.query;
  try{
    const user = await User.findOne({
      where: {
        email: email,
      }
    })
  const allPrices = await Product.findAll(
    { where: { userId: user.id } }
  )
  res.send(allPrices);
  }catch(error) {
    res.status(500).send(error)
    console.log(error)
  }
}
)






module.exports = payment;
