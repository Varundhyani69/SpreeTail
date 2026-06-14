const pool =
require("../config/connection");

const { v4: uuidv4 } =
require("uuid");

const {
  parseCsv
} = require(
  "../imports/csvParser"
);

const {
  detectAnomalies
} = require(
  "../imports/anomalyDetector"
);

async function uploadCsv(
  req,
  res
) {

  try {

    const importId =
      uuidv4();

    // Parse CSV

    const rows =
      await parseCsv(
        req.file.path
      );

    // Detect anomalies

    const anomalies =
      detectAnomalies(
        rows
      );

    // Save import record

    await pool.query(
      `
      INSERT INTO imports (
        id,
        filename,
        uploaded_by,
        status
      )
      VALUES ($1,$2,$3,$4)
      `,
      [
        importId,
        req.file.originalname,
        req.user.id,
        "PENDING"
      ]
    );

    // Save anomalies

    for (
      const anomaly
      of anomalies
    ) {

      await pool.query(
        `
        INSERT INTO import_anomalies (
          id,
          import_id,
          row_number,
          anomaly_type,
          description,
          suggested_action
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        `,
        [
          uuidv4(),
          importId,
          anomaly.row,
          anomaly.type,
          anomaly.description,
          anomaly.action
        ]
      );

    }

    res.json({
      importId,
      rows:
        rows.length,
      anomalyCount:
        anomalies.length,
      anomalies
    });

  } catch(error) {

    console.error(
      error
    );

    res.status(500).json({
      error:
        error.message
    });

  }

}

async function getImportReport(
  req,
  res
) {

  try {

    const {
      importId
    } = req.params;

    const importResult =
      await pool.query(
        `
        SELECT *
        FROM imports
        WHERE id = $1
        `,
        [importId]
      );

    if (
      importResult.rows
        .length === 0
    ) {

      return res
        .status(404)
        .json({
          error:
            "Import not found"
        });

    }

    const anomalies =
      await pool.query(
        `
        SELECT *
        FROM import_anomalies
        WHERE import_id = $1
        ORDER BY row_number
        `,
        [importId]
      );

    res.json({
      import:
        importResult.rows[0],
      anomalyCount:
        anomalies.rows.length,
      anomalies:
        anomalies.rows
    });

  } catch(error) {

    res.status(500).json({
      error:
        error.message
    });

  }

}

async function approveAnomaly(
  req,
  res
) {

  try {

    const { id } =
      req.params;

    const {
      approved
    } = req.body;

    const result =
      await pool.query(
        `
        UPDATE import_anomalies
        SET approved = $1
        WHERE id = $2
        RETURNING *
        `,
        [
          approved,
          id
        ]
      );

    if (
      result.rows
        .length === 0
    ) {

      return res
        .status(404)
        .json({
          error:
            "Anomaly not found"
        });

    }

    res.json(
      result.rows[0]
    );

  } catch(error) {

    res.status(500).json({
      error:
        error.message
    });

  }

}

module.exports = {
  uploadCsv,
  getImportReport,
  approveAnomaly
};