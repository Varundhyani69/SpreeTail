const express = require("express");

const router = express.Router({
  mergeParams: true
});

const authenticate =
require("../middleware/auth.middleware");

const {
  getGroupBalances,
  getUserBreakdown
} = require("../controllers/balance.controller");

router.get(
  "/",
  authenticate,
  getGroupBalances
);

router.get(
  "/breakdown",
  authenticate,
  getUserBreakdown
);

module.exports = router;