const pool =
require("../config/connection");

async function updateAnomalyAction(
  anomalyId,
  action
){

  let approved = false;

  if(
    action === "APPROVE"
  ){

    approved = true;

  }

  const result =
    await pool.query(
      `
      UPDATE import_anomalies
      SET
        approved = $1,
        action_taken = $2,
        resolved_at = NOW()

      WHERE id = $3

      RETURNING *
      `,
      [
        approved,
        action,
        anomalyId
      ]
    );

  return result.rows[0];

}

module.exports = {
  updateAnomalyAction
};