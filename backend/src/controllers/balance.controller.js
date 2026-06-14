const balanceService =
require("../service/balance.service.js");

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

    const users =
      await balanceService
        .getBalanceUsers(
          Object.keys(
            balances
          )
        );

    const userMap = {};

    users.forEach(user=>{

      userMap[user.id] =
        user.name;

    });

    const response =

      Object.entries(
        balances
      ).map(
        ([userId,balance])=>({

          userId,

          name:
            userMap[userId],

          balance

        })
      );

    res.json(
      response
    );

  } catch(error) {

    res.status(500).json({
      error:error.message
    });

  }

}

async function getUserBreakdown(req, res) {

  try {

    const breakdown =
      await balanceService.getUserBreakdown(
        req.params.groupId,
        req.user.id
      );

    res.json(breakdown);

  } catch(error) {

    res.status(500).json({
      error: error.message
    });

  }

}

async function getSettlementSummary(req, res) {

  try {

    const balances =
      await balanceService.calculateBalances(
        req.params.groupId
      );

    const summary =
      balanceService.simplifyDebts(
        balances
      );

    res.json(summary);

  } catch(error) {

    res.status(500).json({
      error: error.message
    });

  }

}

module.exports = {
  getGroupBalances,
  getUserBreakdown,
  getSettlementSummary
};