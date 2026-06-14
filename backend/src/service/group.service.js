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

async function leaveGroup(
  groupId,
  userId,
  leftAt
) {

  const result = await pool.query(
    `
    UPDATE group_memberships
    SET left_at = $1
    WHERE group_id = $2
    AND user_id = $3
    RETURNING *
    `,
    [
      leftAt,
      groupId,
      userId
    ]
  );

  return result.rows[0];
}

module.exports = {
  createGroup, getUserGroups,leaveGroup
};