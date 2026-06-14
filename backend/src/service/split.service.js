const pool = require("../config/connection");
const { v4: uuidv4 } = require("uuid");

async function createEqualSplitParticipants(
  expenseId,
  amount,
  participants
) {

  const shareAmount =
    Number(
      (amount / participants.length)
        .toFixed(2)
    );

  for(const participant of participants) {

    await pool.query(
      `
      INSERT INTO expense_participants (
        id,
        expense_id,
        user_id,
        share_amount
      )
      VALUES ($1,$2,$3,$4)
      `,
      [
        uuidv4(),
        expenseId,
        participant.userId,
        shareAmount
      ]
    );

  }

}

async function createPercentageSplitParticipants(
  expenseId,
  amount,
  participants
) {

  const totalPercentage =
    participants.reduce(
      (sum,p)=>
        sum + p.percentage,
      0
    );

  if(totalPercentage !== 100) {
    throw new Error(
      "Percentages must add up to 100"
    );
  }

  for(const participant of participants) {

    const shareAmount =
      Number(
        (
          amount *
          participant.percentage
        ) / 100
      );

    await pool.query(
      `
      INSERT INTO expense_participants (
        id,
        expense_id,
        user_id,
        share_amount,
        share_percentage
      )
      VALUES ($1,$2,$3,$4,$5)
      `,
      [
        uuidv4(),
        expenseId,
        participant.userId,
        shareAmount,
        participant.percentage
      ]
    );

  }

}

async function createShareSplitParticipants(
  expenseId,
  amount,
  participants
) {

  const totalUnits =
    participants.reduce(
      (sum,p)=>
        sum + p.units,
      0
    );

  const unitValue =
    amount / totalUnits;

  for(const participant of participants) {

    const shareAmount =
      Number(
        (
          participant.units *
          unitValue
        ).toFixed(2)
      );

    await pool.query(
      `
      INSERT INTO expense_participants (
        id,
        expense_id,
        user_id,
        share_amount,
        share_units
      )
      VALUES ($1,$2,$3,$4,$5)
      `,
      [
        uuidv4(),
        expenseId,
        participant.userId,
        shareAmount,
        participant.units
      ]
    );

  }

}

async function createExactSplitParticipants(
  expenseId,
  amount,
  participants
) {

  const total =
    participants.reduce(
      (sum,p)=>
        sum + p.amount,
      0
    );

  if(total !== amount) {
    throw new Error(
      "Exact amounts must equal expense amount"
    );
  }

  for(const participant of participants) {

    await pool.query(
      `
      INSERT INTO expense_participants (
        id,
        expense_id,
        user_id,
        share_amount
      )
      VALUES ($1,$2,$3,$4)
      `,
      [
        uuidv4(),
        expenseId,
        participant.userId,
        participant.amount
      ]
    );

  }

}

module.exports = {
  createEqualSplitParticipants,
  createPercentageSplitParticipants,
  createExactSplitParticipants,
  createShareSplitParticipants
};