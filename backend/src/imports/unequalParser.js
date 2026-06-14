function parseUnequalDetails(
  splitDetails
) {

  const result = [];

  const entries =
    splitDetails.split(";");

  for (
    const entry
    of entries
  ) {

    const parts =
      entry.trim().split(" ");

    const amount =
      Number(
        parts[
          parts.length - 1
        ]
      );

    const name =
      parts
        .slice(
          0,
          parts.length - 1
        )
        .join(" ");

    result.push({
      name,
      amount
    });

  }

  return result;

}

function isUnequalValid(
  details,
  totalAmount
) {

  const total =
    details.reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

  return (
    Number(
      total.toFixed(2)
    ) ===
    Number(
      totalAmount.toFixed(2)
    )
  );

}

module.exports = {
  parseUnequalDetails,
  isUnequalValid
};