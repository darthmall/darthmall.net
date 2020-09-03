const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function isoDateFilter(value) {
  const dt = new Date(value);
  return dt.toISOString();
}

function dateFilter(value) {
  const dt = new Date(value);
  const month = MONTHS[dt.getUTCMonth()];

  return `${dt.getUTCDate()} ${month} ${dt.getUTCFullYear()}`;
}

module.exports = {
  isoDateFilter,
  dateFilter,
};
