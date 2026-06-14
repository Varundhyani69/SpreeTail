const expenseService =
require("../service/expense.service.js");

async function createExpense(
  req,
  res
) {

  try {

    const expense =
      await expenseService.createExpense({
        ...req.body,
        groupId:
          req.params.groupId
      });

    res.status(201).json(expense);

  } catch(error) {

    res.status(500).json({
      error:error.message
    });

  }

}

async function getExpenses(
  req,
  res
) {

  try {

    const expenses =
      await expenseService
        .getExpensesByGroup(
          req.params.groupId
        );

    res.json(
      expenses
    );

  } catch(error) {

    res.status(500).json({
      error:error.message
    });

  }

}

module.exports = {
  createExpense,getExpenses
};