const { Router } = require('express');
const user = require('./userRoutes');
const payment = require('../controllers/paymentRoutes');

const router = Router();

router.use("/users", user);
router.use("/payment", payment)

module.exports = router;