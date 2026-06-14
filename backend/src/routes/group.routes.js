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

const balanceRoutes =
require("./balance.routes");

const router = express.Router();

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
  "/:groupId/balances",
  balanceRoutes
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