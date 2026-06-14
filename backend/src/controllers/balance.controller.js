const balanceService =
require("../services/balance.service");

async function getGroupBalances(
  req,
  res
) {

  try {

    const balances =
      await balanceService
      .calculateBalances(
        req.params.groupId
      );

    res.json(balances);

  } catch(error) {

    res.status(500).json({
      error:error.message
    });

  }

}

async function getUserBreakdown(
  req,
  res
) {

  try {

    const { groupId } = req.params;

    const userId = req.user.id;

    const breakdown =
      await balanceService
      .getUserBreakdown(
        groupId,
        userId
      );

    res.json(breakdown);

  } catch(error) {

    res.status(500).json({
      error: error.message
    });

  }

}
module.exports = {
  getGroupBalances,getUserBreakdown
};