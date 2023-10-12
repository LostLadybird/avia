const filterTransfers = (ticket, showAll, filterValue) => {
  const stops = getStopsAmount(ticket);
  if (!showAll) {
    return filterValue.includes(stops);
  }
  return true;
};

const getStopsAmount = (ticket) => {
  return ticket.segments.map((elem) => elem.stops.length).reduce((prev, next) => prev + next, 0);
};

export default filterTransfers;
