import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { Spin, Alert } from 'antd';

import { showMoreTickets } from '../../store/ticketSlice';
import filterTransfers from '../../utilites/filterTransfers';
import Ticket from '../ticket';

import './tickets-list.css';

const TicketsList = () => {
  const tickets = useSelector((state) => state.tickets.tickets);
  const { error, extraTickets, showAll, filterValue, isLoading } = useSelector((state) => state.tickets);

  const dispatch = useDispatch();

  const visibleTickets = tickets.filter((elem) => {
    return filterTransfers(elem, showAll, filterValue);
  });

  const warningMsg = <Alert message="Рейсов, подходящих под заданные фильтры, не найдено." type="info" showIcon />;
  const erorrMsg = <Alert message="Нет результатов. Попробуйте перезагрузить страницу." type="error" />;

  const elements = visibleTickets.slice(0, extraTickets).map((elem) => {
    return (
      <Ticket
        key={nanoid()}
        price={elem.price}
        img={elem.carrier}
        durationThere={elem.segments[0].duration}
        durationBack={elem.segments[1].duration}
        dateThere={elem.segments[0].date}
        dateBack={elem.segments[1].date}
        stopsThere={elem.segments[0].stops}
        stopsBack={elem.segments[1].stops}
      />
    );
  });

  const handleShowMore = () => {
    dispatch(showMoreTickets());
  };
  return (
    <ul className="all-tickets">
      {isLoading && <Spin className="loading" size="large" />}
      {error && erorrMsg}
      {!elements && !error && !isLoading && warningMsg}
      {elements}
      <div className="show-more">
        <button className="show-more__button" type="button" onClick={handleShowMore}>
          ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ!
        </button>
      </div>
    </ul>
  );
};

export default TicketsList;
