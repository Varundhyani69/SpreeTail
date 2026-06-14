const pool = require("../config/connection.js");
const { v4: uuidv4 } = require("uuid");

async function createGroup(name, createdBy) {

  const id = uuidv4();

  const result = await pool.query(
    `
    INSERT INTO groups (
      id,
      name,
      created_by
    )
    VALUES ($1,$2,$3)
    RETURNING *
    `,
    [id, name, createdBy]
  );

  return result.rows[0];
}

module.exports = {
  createGroup
};