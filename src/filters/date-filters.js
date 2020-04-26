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
  const month = MONTHS[dt.getMonth()];

  return `${dt.getDate()} ${month} ${dt.getFullYear()}`;
}

module.exports = {
  isoDateFilter,
  dateFilter,
};
