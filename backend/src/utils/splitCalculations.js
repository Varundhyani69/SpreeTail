function calculateEqualSplit(
  amount,
  participantCount
) {

  return Number(
    (amount / participantCount)
      .toFixed(2)
  );
}

module.exports = {
  calculateEqualSplit
};