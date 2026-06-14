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

module.exports = {
  createExpense
};