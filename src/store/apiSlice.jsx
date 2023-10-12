import { createAsyncThunk } from '@reduxjs/toolkit';

export const getSearchId = createAsyncThunk('tickets/getSearchId', async function (_, { rejectWithValue }) {
  const searchUrl = 'https://aviasales-test-api.kata.academy/search';
  try {
    const result = await fetch(`${searchUrl}`);
    if (!result.ok) {
      throw new Error('Error');
    }
    const data = await result.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getTickets = createAsyncThunk('tickets/getTickets', async function (_, { rejectWithValue }) {
  let stop = false;
  let count = 0;
  while (!stop) {
    try {
      const searchId = localStorage.getItem('searchid');
      const url = 'https://aviasales-test-api.kata.academy/tickets';
      const response = await fetch(`${url}?searchId=${searchId}`);
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      stop = data.stop;
      count = 0;
      return data;
    } catch (error) {
      count++;
      if (count > 3) {
        return rejectWithValue(error.message);
      }
    }
  }
});
