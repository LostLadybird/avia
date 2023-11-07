const transfer = (tickets, filters) => {
  const activeFilters = filters.filter((elem) => elem.checked);
  const variable = tickets.filter((elem) => {
    const data = elem.segments[0].stops.length;
    return activeFilters.some((elem) => elem.transfers === data);
  });
  return variable;
};

export default transfer;
