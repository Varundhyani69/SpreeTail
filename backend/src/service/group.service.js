const pool = require("../config/connection.js");
const { v4: uuidv4 } = require("uuid");


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
async function getGroupMembers(groupId) {

  const result = await pool.query(
    `
    SELECT
      u.id,
      u.name,
      u.email,
      gm.joined_at,
      gm.left_at
    FROM group_memberships gm

    JOIN users u
      ON u.id = gm.user_id

    WHERE gm.group_id = $1

    ORDER BY gm.joined_at ASC
    `,
    [groupId]
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
    INSERT INTO group_memberships (
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

  await pool.query(
    `
    INSERT INTO group_memberships (
      id,
      group_id,
      user_id,
      joined_at
    )
    VALUES ($1,$2,$3,CURRENT_DATE)
    `,
    [
      uuidv4(),
      id,
      createdBy
    ]
  );

  return result.rows[0];
}
module.exports = {
  createGroup, getUserGroups,leaveGroup,getGroupMembers,addMember
};