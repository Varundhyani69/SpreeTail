const express =
require("express");

const router =
express.Router({
  mergeParams:true
});

const authenticate =
require("../middleware/auth.middleware");

const {
  createSettlement
} = require(
  "../controllers/settlement.controller"
);

router.post(
  "/",
  authenticate,
  createSettlement
);

module.exports = router;