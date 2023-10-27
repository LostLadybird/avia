import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTickets } from '../../store/ticketSlice';
import Header from '../header';
import HeaderFilter from '../header-filter';
import TicketsList from '../tickets-list';

import './app.css';

const App = () => {
  const { stop, filters } = useSelector((state) => state.tickets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch, stop]);

  const noFilters = filters.every((elem) => !elem.checked) === false ? <TicketsList /> : <h1>Билетов не найдено</h1>;

  return (
    <div className="app">
      <Header />
      <HeaderFilter />
      {noFilters}
    </div>
  );
};

export default App;
