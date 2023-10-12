import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from './ticketSlice';

export default configureStore({
  reducer: {
    tickets: ticketReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
