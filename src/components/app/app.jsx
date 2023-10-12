import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSearchId, getTickets } from '../../store/apiSlice';
import Header from '../header';
import HeaderFilter from '../header-filter';
import TicketsList from '../tickets-list';

import './app.css';

const App = () => {
  const { stop, fetch500, searchId } = useSelector((state) => state.tickets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (!stop && searchId) dispatch(getTickets());
  }, [dispatch, stop, fetch500, searchId]);

  return (
    <div className="app">
      <Header />
      <HeaderFilter />
      <TicketsList />
    </div>
  );
};

export default App;
