const pool = require("../config/connection.js");
const { v4: uuidv4 } = require("uuid");

const {
  createEqualSplitParticipants,
  createPercentageSplitParticipants,
  createExactSplitParticipants,
  createShareSplitParticipants
} = require("./split.service");

async function createExpense(data) {

  const {
    groupId,
    title,
    amount,
    paidBy,
    expenseDate,
    splitType,
    participants
  } = data;

  const expenseResult = await pool.query(
    `
    INSERT INTO expenses (
      id,
      group_id,
      title,
      amount,
      paid_by,
      expense_date,
      split_type
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
    `,
    [
      uuidv4(),
      groupId,
      title,
      amount,
      paidBy,
      expenseDate,
      splitType
    ]
  );

  const expense = expenseResult.rows[0];

  switch (splitType) {

    case "equal":

      await createEqualSplitParticipants(
        expense.id,
        amount,
        participants
      );

      break;

    case "percentage":

      await createPercentageSplitParticipants(
        expense.id,
        amount,
        participants
      );

      break;

    case "exact":

      await createExactSplitParticipants(
        expense.id,
        amount,
        participants
      );

      break;

    case "shares":

      await createShareSplitParticipants(
        expense.id,
        amount,
        participants
      );

      break;

    default:

      throw new Error(
        `Unsupported split type: ${splitType}`
      );

  }

  return expense;
}

module.exports = {
  createExpense
};