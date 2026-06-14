const express = require("express");

const router = express.Router({
  mergeParams: true
});

const authenticate =
require("../middleware/auth.middleware");

const {
  createExpense,
  getExpenses
} = require("../controllers/expense.controller");

router.post(
  "/",
  authenticate,
  createExpense
);
router.get(
  "/",
  authenticate,
  getExpenses
);
module.exports = router;