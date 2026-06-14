const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const { createGroup } = require("../service/group.service");
const router = express.Router();

router.post(
  "/",
  authenticate,
  createGroup
);

module.exports = router;