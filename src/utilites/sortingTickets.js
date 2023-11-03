const sort = (tickets, sorting) => {
  let sortedTickets = [...tickets];
  const cheapest = sorting[0];
  const fastest = sorting[1];
  const optimal = sorting[2];
  if (cheapest === true) {
    return sortedTickets.sort((prev, next) => {
      return prev.price - next.price;
    });
  } else if (fastest === true) {
    return sortedTickets.sort((prev, next) => {
      const a = prev.segments[0].duration;
      const b = next.segments[0].duration;
      return a - b;
    });
  } else if (optimal === true) {
    return sortedTickets.sort((prev, next) => {
      const a = prev.segments[0].duration;
      const b = next.segments[0].duration;
      const res = a + prev.price;
      const res2 = b + next.price;
      return res - res2;
    });
  } else {
    return sortedTickets;
  }
};

export default sort;
