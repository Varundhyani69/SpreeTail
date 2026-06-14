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

module.exports = {
  getGroupBalances
};