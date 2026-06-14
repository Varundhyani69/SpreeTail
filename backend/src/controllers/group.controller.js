const groupService = require("../service/group.service.js");

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

module.exports = {
  createGroup
};