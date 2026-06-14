const pool = require("../config/connection.js");

async function findUserByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
}

async function getUserGroups(userId) {

  const result = await pool.query(
    `
    SELECT g.*
    FROM groups g

    JOIN group_memberships gm
    ON gm.group_id = g.id

    WHERE gm.user_id = $1
    `,
    [userId]
  );

  return result.rows;
}
async function addMember(
  groupId,
  userId,
  joinedAt
) {
  const result = await pool.query(
    `
    INSERT INTO group_memberships(
      id,
      group_id,
      user_id,
      joined_at
    )
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [
      uuidv4(),
      groupId,
      userId,
      joinedAt
    ]
  );

  return result.rows[0];
}
module.exports = {
  findUserByEmail,getUserGroups,addMember
};