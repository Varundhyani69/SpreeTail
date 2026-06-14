const express = require("express");

const authenticate =
require("../middleware/auth.middleware");

const {
  createGroup,
  leaveGroup,
  getGroupMembers,
  addMember,
  getGroups
} = require("../controllers/group.controller");

const expenseRoutes =
require("./expense.routes");

const settlementRoutes =
require("./settlement.routes");

const balanceRoutes =
require("./balance.routes");

const router = express.Router();

const importRoutes =
require("./import.routes");

router.use(
  "/:groupId/imports",
  importRoutes
);

router.get(
  "/",
  authenticate,
  getGroups
);

router.post(
  "/",
  authenticate,
  createGroup
);

router.use(
  "/:groupId/expenses",
  expenseRoutes
);

router.use(
  "/:groupId/balances",
  balanceRoutes
);

router.use(
  "/:groupId/settlements",
  settlementRoutes
);


router.post(
  "/:groupId/members",
  authenticate,
  addMember
);

router.patch(
  "/:groupId/members/:userId/leave",
  authenticate,
  leaveGroup
);

router.get(
  "/:groupId/members",
  authenticate,
  getGroupMembers
);

module.exports = router;