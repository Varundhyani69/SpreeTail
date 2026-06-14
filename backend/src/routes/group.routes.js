const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const { createGroup, leaveGroup } = require("../service/group.service");
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

module.exports = router;