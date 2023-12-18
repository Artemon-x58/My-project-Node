function getMonthNumber(monthName) {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const normalizedMonth = monthName.toLowerCase();

  const monthIndex = months.indexOf(normalizedMonth);

  if (monthIndex !== -1) {
    return monthIndex + 1;
  } else {
    return -1;
  }
}

module.exports = getMonthNumber;
