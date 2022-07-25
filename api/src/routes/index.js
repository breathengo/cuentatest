const { Router } = require('express');
const user = require('./userRoutes');

const router = Router();

router.use("/users", user);

module.exports = router;