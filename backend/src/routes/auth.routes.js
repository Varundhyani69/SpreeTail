const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout
} = require("../controllers/auth.controller.js");
const authenticate = require("../middleware/auth.middleware.js");

router.post("/register", register);
router.post("/login", login);
router.post(
  "/logout",
  authenticate,
  logout
);
module.exports = router;