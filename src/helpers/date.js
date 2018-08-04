export const formatDate = (timestamp) => {
  const monthNames = [
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

  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${day} ${monthNames[monthIndex]} ${year}`;
};

export const dateKey = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};
