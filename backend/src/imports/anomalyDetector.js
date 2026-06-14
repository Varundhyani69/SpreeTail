function detectAnomalies(rows) {

  const anomalies = [];

  const seenExpenses =
    new Map();

  const knownUsers = [
    "Aisha",
    "Rohan",
    "Priya",
    "Meera",
    "Dev",
    "Sam"
  ];

  const normalizedKnownUsers =
    knownUsers.map(
      user => user.toLowerCase()
    );

  rows.forEach(
    (row, index) => {

      const rowNum =
        index + 2;

      const payer =
        row.paid_by?.trim();

      const notes =
        row.notes?.toLowerCase() || "";

      const description =
        row.description?.toLowerCase() || "";

      // ------------------
      // Duplicate Detection
      // ------------------

      const normalizedDescription =
        row.description
          ?.toLowerCase()
          .replace(
            /\b(at|the)\b/g,
            ""
          )
          .replace(
            /[^a-z0-9]/g,
            ""
          )
          .trim();

      const normalizedAmount =
        String(row.amount)
          .replace(/,/g, "")
          .trim();

      const key =
        `${normalizedDescription}_${normalizedAmount}`;

      if (
        seenExpenses.has(key)
      ) {

        anomalies.push({
          row: rowNum,
          type:
            "DUPLICATE_EXPENSE",
          description:
            row.description,
          action:
            "Require approval"
        });

      }

      seenExpenses.set(
        key,
        true
      );

      // ------------------
      // Missing Payer
      // ------------------

      if (
        !payer
      ) {

        anomalies.push({
          row: rowNum,
          type:
            "MISSING_PAYER",
          description:
            row.description,
          action:
            "Manual review"
        });

      }

      // ------------------
      // Name Casing
      // ------------------

      if (payer) {

        const normalizedPayer =
          payer
            .split(" ")
            .map(
              word =>
                word.charAt(0)
                  .toUpperCase() +
                word
                  .slice(1)
                  .toLowerCase()
            )
            .join(" ");

        if (
          payer !==
          normalizedPayer
        ) {

          anomalies.push({
            row: rowNum,
            type:
              "NAME_INCONSISTENCY",
            description:
              payer,
            action:
              "Normalize casing"
          });

        }

      }

      // ------------------
      // Alias / Unknown User
      // ------------------

      if (
        payer &&
        !normalizedKnownUsers.includes(
          payer.toLowerCase()
        )
      ) {

        anomalies.push({
          row: rowNum,
          type:
            "UNKNOWN_OR_ALIAS_USER",
          description:
            payer,
          action:
            "Manual review"
        });

      }

      // ------------------
      // Settlement Row
      // ------------------

      if (
        notes.includes(
          "settlement"
        ) ||
        (
          description.includes(
            "paid"
          ) &&
          description.includes(
            "back"
          )
        )
      ) {

        anomalies.push({
          row: rowNum,
          type:
            "SETTLEMENT_ROW",
          description:
            row.description,
          action:
            "Convert to settlement"
        });

      }

      // ------------------
      // Missing Split Type
      // ------------------

      if (
        !row.split_type ||
        !row.split_type.trim()
      ) {

        anomalies.push({
          row: rowNum,
          type:
            "MISSING_SPLIT_TYPE",
          description:
            row.description,
          action:
            "Review"
        });

      }

      // ------------------
      // USD Expense
      // ------------------

      if (
        row.currency === "USD"
      ) {

        anomalies.push({
          row: rowNum,
          type:
            "USD_EXPENSE",
          description:
            row.description,
          action:
            "Convert currency"
        });

      }

      // ------------------
      // Amount Format
      // ------------------

      if (
        row.amount &&
        row.amount.includes(",")
      ) {

        anomalies.push({
          row: rowNum,
          type:
            "AMOUNT_FORMAT",
          description:
            row.amount,
          action:
            "Normalize"
        });

      }

      // ------------------
      // Floating Precision
      // ------------------

      if (
        row.amount &&
        row.amount.includes(".")
      ) {

        const decimals =
          row.amount
            .split(".")[1];

        if (
          decimals &&
          decimals.length > 2
        ) {

          anomalies.push({
            row: rowNum,
            type:
              "PRECISION_ROUNDING",
            description:
              row.amount,
            action:
              "Round to 2 decimals"
          });

        }

      }

      // ------------------
      // Percentage Validation
      // ------------------

      if (
        row.split_type ===
        "percentage"
      ) {

        const matches =
          row.split_details?.match(
            /(\d+)%/g
          );

        if (
          matches
        ) {

          const total =
            matches.reduce(
              (
                sum,
                value
              ) =>
                sum +
                Number(
                  value.replace(
                    "%",
                    ""
                  )
                ),
              0
            );

          if (
            total !== 100
          ) {

            anomalies.push({
              row: rowNum,
              type:
                "INVALID_PERCENTAGE_TOTAL",
              description:
                `${total}%`,
              action:
                "Manual review"
            });

          }

        }

      }

      // ------------------
      // Date Format
      // ------------------

      if (
        row.date &&
        row.date.includes("/")
      ) {

        anomalies.push({
          row: rowNum,
          type:
            "NON_STANDARD_DATE",
          description:
            row.date,
          action:
            "Normalize"
        });

      }

      // ------------------
      // Negative Amount
      // ------------------

      const numericAmount =
        Number(
          String(
            row.amount
          ).replace(
            /,/g,
            ""
          )
        );

      if (
        numericAmount < 0
      ) {

        anomalies.push({
          row: rowNum,
          type:
            "NEGATIVE_AMOUNT",
          description:
            row.description,
          action:
            "Treat as refund"
        });

      }

    }
  );

  return anomalies;

}

module.exports = {
  detectAnomalies
};