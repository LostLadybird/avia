import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Spin, Alert } from 'antd';

import sort from '../../utilites/sortingTickets';
import Ticket from '../ticket';

import styles from './tickets-list.module.scss';

const TicketsList = () => {
  const tickets = useSelector((state) => state.tickets.tickets);
  const { error, status, filters, sorting } = useSelector((state) => state.tickets);

  const [extraTickets, setExtraTickets] = useState(5);

  const handleShowMore = () => {
    setExtraTickets(extraTickets + 5);
  };

  const visibleTickets = useMemo(() => {
    const activeFilters = filters.filter((elem) => elem.checked);
    const variable = tickets.filter((elem) => {
      const data = elem.segments[0].stops.length;
      return activeFilters.some((elem) => elem.transfers === data);
    });
    return variable;
  }, [tickets, filters]);

  const sortedTickets = useMemo(() => {
    return sort(visibleTickets, sorting);
  }, [visibleTickets, sorting]);

  const warningMsg = <Alert message="Рейсов, подходящих под заданные фильтры, не найдено." type="info" showIcon />;
  const erorrMsg = <Alert message="Нет результатов. Попробуйте перезагрузить страницу." type="error" />;

  const elements = sortedTickets.slice(0, extraTickets).map((elem) => {
    return (
      <Ticket
        key={`${elem.price}${elem.carrier}${elem.segments[0].date}${elem.segments[1].date}`}
        price={elem.price}
        img={elem.carrier}
        originTo={elem.segments[0].origin}
        originFrom={elem.segments[1].origin}
        destinationTo={elem.segments[0].destination}
        destinationFrom={elem.segments[1].destination}
        durationThere={elem.segments[0].duration}
        durationBack={elem.segments[1].duration}
        dateThere={elem.segments[0].date}
        dateBack={elem.segments[1].date}
        stopsThere={elem.segments[0].stops}
        stopsBack={elem.segments[1].stops}
      />
    );
  });

  return (
    <ul className={styles.tickets}>
      {status && !error ? <Spin className={styles.loading} size="large" /> : null}
      {error && !elements.length ? erorrMsg : null}
      {!elements && !error && !status && warningMsg}
      {elements}
      <div className={styles.showMore}>
        <button className={styles.button} type="button" onClick={handleShowMore}>
          ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ!
        </button>
      </div>
    </ul>
  );
};

export default TicketsList;
