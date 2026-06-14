const pool =
require("../config/connection");

const { v4: uuidv4 } =
require("uuid");

async function createSettlement(
  data
) {

  const {
    groupId,
    payerId,
    receiverId,
    amount,
    settlementDate,
    notes
  } = data;

  const result =
    await pool.query(
      `
      INSERT INTO settlements (
        id,
        group_id,
        payer_id,
        receiver_id,
        amount,
        settlement_date,
        notes
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        uuidv4(),
        groupId,
        payerId,
        receiverId,
        amount,
        settlementDate,
        notes
      ]
    );

  return result.rows[0];
}

module.exports = {
  createSettlement
};