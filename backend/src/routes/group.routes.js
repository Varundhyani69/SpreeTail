const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const { createGroup, leaveGroup, getGroupMembers } = require("../service/group.service");
const { addMember, getGroups } = require("../controllers/group.controller");
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

router.post(
    "/:groupId/members",
    authenticate,
    addMember
)

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