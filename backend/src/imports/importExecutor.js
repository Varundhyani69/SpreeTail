const pool =
require("../config/connection");

const {
  normalizeAmount,
  normalizeDate,
  normalizeUser
} = require(
  "./normalizers"
);

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

  const rows =
    await getImportRows(
      importId
    );

  console.log(
    `Found ${rows.length} rows`
  );

  const normalizedRows =
    [];

  for (
    const rowRecord
    of rows
  ) {

    const row =
      rowRecord.raw_data;

    // Skip non-equal splits for now

    if (
      row.split_type !==
      "equal"
    ) {

      continue;

    }

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
        row.currency,

      splitType:
        row.split_type,

      splitWith:
        row.split_with
          ?.split(";")
          .map(
            person =>
              normalizeUser(
                person.trim()
              )
          ) || [],

      notes:
        row.notes || ""

    };

    normalizedRows.push(
      normalizedRow
    );

    console.log(
      normalizedRow
    );

  }

  return {
    processedRows:
      normalizedRows.length,
    normalizedRows
  };

}

module.exports = {
  executeImport
};