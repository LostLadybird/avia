import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';

import { getTickets } from './apiSlice';

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { rejectWithValue }) => {
  try {
    const body = await getTickets();
    return body;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    error: null,
    stop: false,
    status: null,
    filters: [
      { id: 0, text: 'Без пересадок', checked: true, transfers: 0 },
      { id: 1, text: '1 пересадка', checked: true, transfers: 1 },
      { id: 2, text: '2 пересадки', checked: true, transfers: 2 },
      { id: 3, text: '3 пересадки', checked: true, transfers: 3 },
    ],
  },
  reducers: {
    sortByPrice(state) {
      const fitlerTickets = current(state.tickets).slice();
      state.tickets = fitlerTickets.sort((prev, next) => {
        return prev.price - next.price;
      });
    },
    sortByDuration(state) {
      const filterTickets = current(state.tickets).slice();
      state.tickets = filterTickets.sort((prev, next) => {
        const a = prev.segments[0].duration;
        const b = next.segments[0].duration;
        return a - b;
      });
    },
    sortByOptimal(state) {
      const fitlerTickets = current(state.tickets).slice();
      state.tickets = fitlerTickets.sort((prev, next) => {
        const a = prev.segments[0].duration;
        const b = next.segments[0].duration;
        const res = a + prev.price;
        const res2 = b + next.price;
        return res - res2;
      });
    },
    checkFilterAll(state, action) {
      state.filters = state.filters.map((elem) => ({ ...elem, checked: action.payload }));
    },
    toggleCheck(state, action) {
      const toggledCheck = state.filters.find((el) => el.id === action.payload);
      toggledCheck.checked = !toggledCheck.checked;
    },
    addExtraTickets(state, action) {
      state.tickets = state.tickets.concat(action.payload);
    },
  },
  extraReducers: {
    [fetchTickets.pending]: (state) => {
      state.status = true;
      state.error = null;
    },
    [fetchTickets.fulfilled]: (state, action) => {
      state.status = true;
      state.tickets = [...state.tickets, ...action.payload.tickets];
      if (!action.payload.stop) {
        state.stop = !state.stop;
      } else {
        state.status = false;
      }
    },
    [fetchTickets.rejected]: (state, action) => {
      if (action.payload === '500') {
        state.status = true;
      } else {
        state.stop = !state.stop;
        state.error = action.payload;
      }
    },
  },
});

export const { sortByPrice, sortByDuration, sortByOptimal, checkFilterAll, toggleCheck } = ticketSlice.actions;

export default ticketSlice.reducer;
