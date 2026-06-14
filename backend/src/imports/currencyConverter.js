const USD_TO_INR = 83;

function convertUsdToInr(
  amount
) {
  return Number(
    (
      amount * USD_TO_INR
    ).toFixed(2)
  );
}

module.exports = {
  convertUsdToInr
};