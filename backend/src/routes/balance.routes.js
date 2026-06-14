const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const { getGroupBalances } = require("../controllers/balance.controller");
const router = express.Router();


router.get(
  "/:groupId/balances",
  authenticate,
  getGroupBalances
);

module.exports = router;