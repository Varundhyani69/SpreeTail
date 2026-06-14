const pool =
require("../config/connection");
const { v4: uuidv4 } =
require("uuid");
const {
  normalizeAmount,
  normalizeDate,
  normalizeUser,
  normalizeCurrency
} = require(
  "./normalizers"
);

const validUsers = [
  "Aisha",
  "Rohan",
  "Priya",
  "Meera",
  "Dev",
  "Sam"
];

async function getUserIdByName(
  name
) {

  if (!name) {
    return null;
  }

  const result =
    await pool.query(
      `
      SELECT id
      FROM users
      WHERE LOWER(name)
      = LOWER($1)
      LIMIT 1
      `,
      [name]
    );

  return (
    result.rows[0]?.id ||
    null
  );

}

async function isMemberActive(
  userName,
  expenseDate
) {

  const result =
    await pool.query(
      `
      SELECT
        gm.joined_at,
        gm.left_at
      FROM group_memberships gm

      JOIN users u
        ON u.id = gm.user_id

      WHERE LOWER(u.name)
        = LOWER($1)

      LIMIT 1
      `,
      [userName]
    );

  if (
    result.rows.length === 0
  ) {

    return false;

  }

  const membership =
    result.rows[0];

  const expense =
    new Date(
      expenseDate
    );

  const joined =
    new Date(
      membership.joined_at
    );

  if (
    expense < joined
  ) {

    return false;

  }

  if (
    membership.left_at
  ) {

    const left =
      new Date(
        membership.left_at
      );

    if (
      expense > left
    ) {

      return false;

    }

  }

  return true;

}

async function createImportAnomaly(
  importId,
  rowNumber,
  type,
  description
) {

  await pool.query(
    `
    INSERT INTO
    import_anomalies (
      id,
      import_id,
      row_number,
      anomaly_type,
      description,
      suggested_action
    )
    VALUES (
      $1,$2,$3,$4,$5,$6
    )
    `,
    [
      uuidv4(),
      importId,
      rowNumber,
      type,
      description,
      "Excluded from split"
    ]
  );

}

async function createExpense(
  row,
  payerId
) {

  const result =
    await pool.query(
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
      VALUES (
        $1,$2,$3,$4,
        $5,$6,$7
      )
      RETURNING *
      `,
      [
        uuidv4(),
        process.env.IMPORT_GROUP_ID,
        row.description,
        row.amount,
        payerId,
        row.expenseDate,
        row.splitType
      ]
    );

  return result.rows[0];

}

async function createParticipants(
  expenseId,
  participantIds,
  amount
) {

  const share =
    Number(
      (
        amount /
        participantIds.length
      ).toFixed(2)
    );

  for (
    const userId
    of participantIds
  ) {

    await pool.query(
      `
      INSERT INTO
      expense_participants (
        id,
        expense_id,
        user_id,
        share_amount
      )
      VALUES (
        $1,$2,$3,$4
      )
      `,
      [
        uuidv4(),
        expenseId,
        userId,
        share
      ]
    );

  }

}

async function getImportRows(
  importId
) {

  const result =
    await pool.query(
      `
      SELECT *
      FROM import_rows
      WHERE import_id = $1
      ORDER BY row_number
      `,
      [importId]
    );

  return result.rows;

}

async function executeImport(
  importId
) {

  const importResult =
    await pool.query(
      `
      SELECT status
      FROM imports
      WHERE id = $1
      `,
      [importId]
    );

  if (
    importResult.rows[0]
      ?.status ===
    "COMPLETED"
  ) {

    throw new Error(
      "Import already executed"
    );

  }

  const rows =
    await getImportRows(
      importId
    );

  console.log(
    `Found ${rows.length} rows`
  );

  const normalizedRows =
    [];
if (
  normalizedRow.currency ===
  "USD"
) {

  normalizedRow.amount =
    convertUsdToInr(
      normalizedRow.amount
    );

  normalizedRow.currency =
    "INR";

}
  let importedExpenses =
    0;

  for (
    const rowRecord
    of rows
  ) {

    const row =
      rowRecord.raw_data;

    const isSettlement =

  row.description
    ?.toLowerCase()
    .includes(
      "paid"
    ) ||

  row.notes
    ?.toLowerCase()
    .includes(
      "settlement"
    );
    if (
  isSettlement
) {

  const payerId =
    await getUserIdByName(
      row.paid_by
    );

  const receiverId =
    await getUserIdByName(
      row.split_with
    );

  if (
    payerId &&
    receiverId
  ) {

    await createSettlement(
      payerId,
      receiverId,
      normalizeAmount(
        row.amount
      )
    );

  }

  continue;

}

    if (
      row.split_type !==
      "equal"
    ) {

      continue;

    }

    const participants =
      row.split_with
        ?.split(";")
        .map(
          person =>
            normalizeUser(
              person.trim()
            )
        )
        .filter(
          person =>
            validUsers.includes(
              person
            )
        ) || [];

    const normalizedRow = {

      rowNumber:
        rowRecord.row_number,

      description:
        row.description,

      amount:
        normalizeAmount(
          row.amount
        ),

      expenseDate:
        normalizeDate(
          row.date
        ),

      payer:
        normalizeUser(
          row.paid_by
        ),

      currency:
        normalizeCurrency(
          row.currency
        ),

      splitType:
        row.split_type,

      splitWith:
        participants,

      notes:
        row.notes || ""

    };

    normalizedRows.push(
      normalizedRow
    );

    // skip rows
    // with missing payer

    if (
      !normalizedRow.payer
    ) {

      continue;

    }

    const payerId =
      await getUserIdByName(
        normalizedRow.payer
      );

    if (
      !payerId
    ) {

      continue;

    }

    const participantIds =
      [];


    for (
    const participant
    of normalizedRow.splitWith
    ) {

    const active =
        await isMemberActive(
        participant,
        normalizedRow.expenseDate
        );

    if (
        !active
    ) {

        await createImportAnomaly(
        importId,
        normalizedRow.rowNumber,
        "INVALID_MEMBER_FOR_DATE",
        `${participant} not active on ${normalizedRow.expenseDate}`
        );

        continue;

    }

    const userId =
        await getUserIdByName(
        participant
        );

    if (
        userId
    ) {

        participantIds.push(
        userId
        );

    }

    }

    if (
      participantIds.length === 0
    ) {

      continue;

    }

    const expense =
      await createExpense(
        normalizedRow,
        payerId
      );
    if (
    participantIds.length === 0
    ) {

    continue;

    }
    await createParticipants(
      expense.id,
      participantIds,
      normalizedRow.amount
    );

    importedExpenses++;

  }

  await pool.query(
    `
    UPDATE imports
    SET status =
      'COMPLETED'
    WHERE id = $1
    `,
    [importId]
  );

  return {

    processedRows:
      normalizedRows.length,

    importedExpenses,

    normalizedRows

  };

}

async function getUserIdByName(
  name
) {

  if (!name) {
    return null;
  }

  const result =
    await pool.query(
      `
      SELECT id
      FROM users
      WHERE LOWER(name)
      = LOWER($1)
      LIMIT 1
      `,
      [name]
    );

  return (
    result.rows[0]?.id
    || null
  );

}

async function createSettlement(
  payerId,
  receiverId,
  amount
) {

  const result =
    await pool.query(
      `
      INSERT INTO settlements (
        id,
        group_id,
        payer_id,
        receiver_id,
        amount,
        settlement_date
      )
      VALUES (
        $1,$2,$3,$4,$5,$6
      )
      RETURNING *
      `,
      [
        uuidv4(),
        process.env.IMPORT_GROUP_ID,
        payerId,
        receiverId,
        amount,
        "2026-02-25"
      ]
    );

  return result.rows[0];

}

module.exports = {
  executeImport,getUserIdByName,getImportRows
};