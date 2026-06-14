function normalizeAmount(
  amount
) {

  return Number(
    String(amount)
      .replace(/,/g, "")
      .trim()
  );

}

function normalizeDate(
  date
) {

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

  return date;

}

function normalizeUser(
  user
) {

  if (!user) {
    return null;
  }

  const aliases = {

    "priya": "Priya",
    "rohan": "Rohan",
    "Priya S": "Priya"

  };

  return aliases[user] || user;

}

module.exports = {
  normalizeAmount,
  normalizeDate,
  normalizeUser
};