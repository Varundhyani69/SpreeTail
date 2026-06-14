const pool = require("../config/connection");

async function getGroupExpenseParticipants(groupId) {

  const result = await pool.query(
    `
    SELECT
      e.id,
      e.title,
      e.amount,
      e.paid_by,
      ep.user_id,
      ep.share_amount
    FROM expenses e

    JOIN expense_participants ep
      ON ep.expense_id = e.id

    WHERE e.group_id = $1
    `,
    [groupId]
  );

  return result.rows;
}

async function calculateBalances(groupId) {

  const rows =
    await getGroupExpenseParticipants(groupId);

  const balances = {};

  const processedExpenses = new Set();

  // Expenses

  for (const row of rows) {

    const payer = row.paid_by;

    if (!balances[payer]) {
      balances[payer] = 0;
    }

    if (!processedExpenses.has(row.id)) {

      balances[payer] += Number(row.amount);

      processedExpenses.add(row.id);

    }

    if (!balances[row.user_id]) {
      balances[row.user_id] = 0;
    }

    balances[row.user_id] -= Number(
      row.share_amount
    );

  }

  // Settlements

  const settlementResult =
    await pool.query(
      `
      SELECT *
      FROM settlements
      WHERE group_id = $1
      `,
      [groupId]
    );

  for (const settlement of settlementResult.rows) {

    const payer =
      settlement.payer_id;

    const receiver =
      settlement.receiver_id;

    const amount =
      Number(settlement.amount);

    if (!balances[payer]) {
      balances[payer] = 0;
    }

    if (!balances[receiver]) {
      balances[receiver] = 0;
    }

    balances[payer] += amount;

    balances[receiver] -= amount;

  }

  return balances;
}

async function getUserBreakdown(
  groupId,
  userId
) {

  const result =
    await pool.query(
      `
      SELECT

        e.id,
        e.title,
        e.amount,
        e.expense_date,

        ep.share_amount,

        payer.name AS payer_name

      FROM expense_participants ep

      JOIN expenses e
        ON ep.expense_id = e.id

      JOIN users payer
        ON payer.id = e.paid_by

      WHERE
        e.group_id = $1
        AND ep.user_id = $2

      ORDER BY e.expense_date DESC
      `,
      [groupId, userId]
    );

  return result.rows;
}

function simplifyDebts(
  balances
) {

  const creditors = [];
  const debtors = [];

  for (
    const [userId, balance]
    of Object.entries(balances)
  ) {

    if (balance > 0) {

      creditors.push({
        userId,
        amount: balance
      });

    }

    if (balance < 0) {

      debtors.push({
        userId,
        amount: Math.abs(balance)
      });

    }

  }

  const settlements = [];

  let i = 0;
  let j = 0;

  while (
    i < debtors.length &&
    j < creditors.length
  ) {

    const debtor = debtors[i];
    const creditor = creditors[j];

    const amount = Math.min(
      debtor.amount,
      creditor.amount
    );

    settlements.push({
      from: debtor.userId,
      to: creditor.userId,
      amount
    });

    debtor.amount -= amount;
    creditor.amount -= amount;

    if (debtor.amount === 0) i++;
    if (creditor.amount === 0) j++;

  }

  return settlements;
}
async function getBalanceUsers(
  userIds
){

  const result =
    await pool.query(
      `
      SELECT
        id,
        name
      FROM users
      WHERE id = ANY($1)
      `,
      [userIds]
    );

  return result.rows;

}
module.exports = {
  calculateBalances,
  getUserBreakdown,
  simplifyDebts,
  getBalanceUsers
};