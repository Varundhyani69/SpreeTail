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
    await getGroupExpenseParticipants(
      groupId
    );

  const balances = {};

  const processedExpenses =
    new Set();

  for(const row of rows) {

    const payer = row.paid_by;

    if(!balances[payer]) {
      balances[payer] = 0;
    }

    if(
      !processedExpenses.has(
        row.id
      )
    ) {

      balances[payer] += Number(
        row.amount
      );

      processedExpenses.add(
        row.id
      );

    }

    if(!balances[row.user_id]) {
      balances[row.user_id] = 0;
    }

    balances[row.user_id] -= Number(
      row.share_amount
    );

  }

  return balances;
}