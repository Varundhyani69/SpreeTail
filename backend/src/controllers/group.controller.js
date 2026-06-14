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

async function addMember(req, res) {

  try {

    const { groupId } =
      req.params;

    const {
  email,
  joinedAt
} = req.body;

const member =
  await groupService.addMemberByEmail(
    groupId,
    email,
    joinedAt
  );

    res.status(201).json(member);

  } catch(error) {

    res.status(500).json({
      error: error.message
    });

  }

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

async function getGroupMembers(req, res) {

  try {

    const { groupId } = req.params;

    const members =
      await groupService.getGroupMembers(
        groupId
      );

    res.json(members);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

}

module.exports = {
  createGroup,
  getGroups,
  addMember,
  leaveGroup,
  getGroupMembers,
};