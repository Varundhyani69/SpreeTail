const groupService = require("../service/group.service.js");

async function getGroups(req, res) {
  try {
    const groups = await groupService.getUserGroups(
      req.user.id
    );

    res.json(groups);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

async function createGroup(req, res) {

  try {

    const { name } = req.body;

    const group = await groupService.createGroup(
      name,
      req.user.id
    );

    res.status(201).json(group);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
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

async function leaveGroup(req, res) {
  try {

    const { groupId, userId } = req.params;
    const { leftAt } = req.body;

    const membership =
      await groupService.leaveGroup(
        groupId,
        userId,
        leftAt
      );

    res.json(membership);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
}
module.exports = {
  createGroup,addMember,getGroups,leaveGroup
};