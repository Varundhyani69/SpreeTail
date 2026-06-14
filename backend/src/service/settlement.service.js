const pool =
require("../config/connection");

const { v4: uuidv4 } =
require("uuid");

async function getUserIdByEmail(
  email
){

  const result =
    await pool.query(
      `
      SELECT id
      FROM users
      WHERE LOWER(email)
      = LOWER($1)
      `,
      [email]
    );

  if(
    result.rows.length === 0
  ){

    throw new Error(
      `User not found: ${email}`
    );

  }

  return result.rows[0].id;

}

async function createSettlement(
  data
){

  const {
    groupId,
    payerEmail,
    receiverEmail,
    amount,
    settlementDate,
    notes
  } = data;

  const payerId =
    await getUserIdByEmail(
      payerEmail
    );

  const receiverId =
    await getUserIdByEmail(
      receiverEmail
    );

  if(
    payerId === receiverId
  ){

    throw new Error(
      "Payer and receiver cannot be the same user"
    );

  }

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
      VALUES (
        $1,$2,$3,$4,
        $5,$6,$7
      )
      RETURNING *
      `,
      [
        uuidv4(),
        groupId,
        payerId,
        receiverId,
        amount,
        settlementDate,
        notes || null
      ]
    );

  return result.rows[0];

}

module.exports = {
  createSettlement
};