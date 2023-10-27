import React from 'react';

import changeWord from '../../utilites/changeWord';
import durationTime from '../../utilites/durationTime';
import formatDate from '../../utilites/formatDate';

import styles from './ticket.module.scss';

const Ticket = (props) => {
  const {
    price,
    img,
    originTo,
    originFrom,
    destinationTo,
    destinationFrom,
    durationThere,
    durationBack,
    dateThere,
    dateBack,
    stopsThere,
    stopsBack,
  } = props;

  const baseURL = 'https://pics.avs.io/99/36/';

  return (
    <li className={styles.ticket}>
      <div className={styles.header}>
        <p className={styles.price}>{price} Р</p>
        <img className={styles.logo} src={`${baseURL}${img}.png`} alt="logo" />
      </div>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <span className={styles.wrapperHead}>{`${originTo} - ${destinationTo}`}</span>
          <span className={styles.wrapperContent}>{formatDate(dateThere, durationThere)}</span>
        </div>
        <div className={styles.wrapper}>
          <span className={styles.wrapperHead}>В ПУТИ</span>
          <span className={styles.wrapperContent}>{durationTime(durationThere)}</span>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.wrapperHead}>
            {stopsThere.length} {changeWord(stopsThere.length)}
          </div>
          <div className={styles.wrapperContent}>HKG, JNB</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <span className={styles.wrapperHead}>{`${originFrom} - ${destinationFrom}`}</span>
          <span className={styles.wrapperContent}>{formatDate(dateBack, durationBack)}</span>
        </div>
        <div className={styles.wrapper}>
          <span className={styles.wrapperHead}>В ПУТИ</span>
          <span className={styles.wrapperContent}>{durationTime(durationBack)}</span>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.wrapperHead}>
            {stopsBack.length} {changeWord(stopsBack.length)}
          </div>
          <div className={styles.wrapperContent}>HKG, JNB</div>
        </div>
      </div>
    </li>
  );
};

export default Ticket;
