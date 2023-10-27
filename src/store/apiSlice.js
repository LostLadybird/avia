const baseURL = 'https://aviasales-test-api.kata.academy';
let searchId = null;

export const getTickets = async () => {
  if (searchId === null) {
    const fetchId = await fetch(`${baseURL}/search`);
    if (fetchId.ok) {
      const body = await fetchId.json();
      searchId = body.searchId;
    } else {
      throw new Error(`Failed to fetch ${baseURL}search`);
    }
  }

  const fetchTickets = await fetch(`${baseURL}/tickets?searchId=${searchId}`);
  if (fetchTickets.ok) {
    return fetchTickets.json();
  }
  throw new Error(`Failed to fetch ${baseURL}tickets`);
};
