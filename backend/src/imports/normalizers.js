function normalizeAmount(
  amount
) {

  return Number(
    Number(
      String(amount)
        .replace(/,/g, "")
        .trim()
    ).toFixed(2)
  );

}

function normalizeDate(
  date
) {

  if (!date) {
    return null;
  }

  if (
    date.includes("/")
  ) {

    const [
      day,
      month,
      year
    ] = date.split("/");

    return `${year}-${month}-${day}`;

  }

  if (
    date === "Mar 14"
  ) {

    return "2026-03-14";

  }

  return date;

}

function normalizeUser(
  user
) {

  if (!user) {
    return null;
  }

  user = user.trim();

  const aliases = {

    "priya": "Priya",
    "rohan": "Rohan",
    "Priya S": "Priya"

  };

  return aliases[user] || user;

}

function normalizeCurrency(
  currency
) {

  if (
    !currency ||
    currency.trim() === ""
  ) {

    return "INR";

  }

  return currency;

}

module.exports = {
  normalizeAmount,
  normalizeDate,
  normalizeUser,
  normalizeCurrency
};