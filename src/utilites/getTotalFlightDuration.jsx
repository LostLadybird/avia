const getTotalFlightDuration = (ticket) => {
  ticket.segments.map((elem) => elem.duration).reduce((prev, curr) => prev + curr, 0);
};

export default getTotalFlightDuration;
