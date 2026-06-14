const express =
require("express");

const multer =
require("multer");

const authenticate =
require("../middleware/auth.middleware");

const {
  uploadCsv,
  getImportReport,
  approveAnomaly
} = require(
  "../controllers/import.controller"
);

const router =
express.Router();

const upload =
multer({
  dest:"uploads/"
});

router.post(
  "/",
  authenticate,
  upload.single("file"),
  uploadCsv
);

router.get(
  "/:importId/report",
  authenticate,
  getImportReport
);

router.patch(
  "/anomalies/:id",
  authenticate,
  approveAnomaly
);

module.exports =
router;