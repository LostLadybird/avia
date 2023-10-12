import { createSlice, current } from '@reduxjs/toolkit';

import getTotalFlightDuration from '../utilites/getTotalFlightDuration';

import { getTickets, getSearchId } from './apiSlice';

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    filterValue: [],
    fetch500: 0,
    error: null,
    showAll: true,
    extraTickets: 5,
    searchId: false,
    stop: null,
    isLoading: false,
  },
  reducers: {
    sortByPrice(state) {
      const fitlerTickets = current(state.tickets).slice();
      state.tickets = fitlerTickets.sort((prev, next) => (prev.price > next.price ? 1 : -1));
    },
    sortByDuration(state) {
      const fitlerTickets = current(state.tickets).slice();
      state.tickets = fitlerTickets.sort((prev, next) =>
        getTotalFlightDuration(prev) > getTotalFlightDuration(next) ? 1 : -1
      );
    },
    sortByOptimal(state) {
      const fitlerTickets = current(state.tickets).slice();
      state.tickets = fitlerTickets.sort((prev, next) =>
        prev.price + getTotalFlightDuration(prev) > next.price + getTotalFlightDuration(next) ? 1 : -1
      );
    },
    checkFilterAll(state, action) {
      state.showAll = action.payload;
    },
    toggleCheck(state, action) {
      if (action.payload.isChecked) {
        state.filterValue.push(action.payload.value);
      } else {
        state.filterValue = state.filterValue.filter((elem) => elem !== action.payload.value);
      }
    },
    showMoreTickets(state) {
      state.extraTickets += 5;
    },
    addExtraTickets(state, action) {
      console.log('action payload', action);
      state.tickets = state.tickets.concat(action.payload);
    },
  },
  extraReducers: {
    [getSearchId.fulfilled]: (state, action) => {
      state.searchId = true;
      localStorage.setItem('searchid', action.payload.searchId);
    },
    [getSearchId.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [getTickets.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getTickets.fulfilled]: (state, action) => {
      state.tickets = [...state.tickets, ...action.payload.tickets];
      state.stop = action.payload.stop;
      state.isLoading = false;
      state.error = false;
    },
    [getTickets.rejected]: (state, action) => {
      if (action.payload === '500') {
        state.fetch500 += 1;
      } else {
        state.isLoading = false;
        state.error = true;
      }
    },
  },
});

export const { sortByPrice, sortByDuration, sortByOptimal, checkFilterAll, toggleCheck, showMoreTickets } =
  ticketSlice.actions;

export default ticketSlice.reducer;
