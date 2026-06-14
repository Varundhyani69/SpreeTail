const settlementService =
require("../service/settlement.service");

async function createSettlement(
  req,
  res
) {

  try {

    const settlement =
      await settlementService
      .createSettlement({
        ...req.body,
        groupId:
          req.params.groupId
      });

    res.status(201).json(
      settlement
    );

  } catch(error) {

    res.status(500).json({
      error:error.message
    });

  }

}

module.exports = {
  createSettlement
};