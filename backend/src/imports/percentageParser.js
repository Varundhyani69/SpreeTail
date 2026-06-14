function parsePercentageDetails(
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

    const name =
      parts.slice(
        0,
        parts.length - 1
      ).join(" ");

    const percentage =
      Number(
        parts[
          parts.length - 1
        ].replace("%", "")
      );

    result.push({
      name,
      percentage
    });

  }

  return result;

}
function isPercentageValid(
  details
) {

  const total =
    details.reduce(
      (sum, item) =>
        sum + item.percentage,
      0
    );

  return total === 100;

}
module.exports = {
  parsePercentageDetails,isPercentageValid
};