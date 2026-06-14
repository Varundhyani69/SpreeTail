const express = require("express");

const router = express.Router({
  mergeParams: true
});

const authenticate =
require("../middleware/auth.middleware");

const {
  getGroupBalances,
  getUserBreakdown,
  getSettlementSummary
} = require(
  "../controllers/balance.controller"
);

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

router.get(
  "/summary",
  authenticate,
  getSettlementSummary
);

module.exports = router;