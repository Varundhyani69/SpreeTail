const express = require("express");

const router = express.Router({
  mergeParams: true
});

const authenticate =
require("../middleware/auth.middleware");

const {
  createExpense
} = require("../controllers/expense.controller");

router.post(
  "/",
  authenticate,
  createExpense
);

module.exports = router;