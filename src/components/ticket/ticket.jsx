import React from 'react';

import changeWord from '../../utilites/changeWord';
import durationTime from '../../utilites/durationTime';
import formatDate from '../../utilites/formatDate';
import './ticket.css';

const Ticket = (props) => {
  const { price, img, durationThere, durationBack, dateThere, dateBack, stopsThere, stopsBack } = props;

  const baseURL = 'https://pics.avs.io/99/36/';

  return (
    <li className="ticket">
      <div className="ticket__header">
        <p className="ticket__header--price">{price} Р</p>
        <img className="ticket__header--logo" src={`${baseURL}${img}.png`} alt="logo" />
      </div>
      <div className="ticket__content">
        <div className="ticket__wrapper">
          <span className="ticket__wrapper--head">MOW - HKT</span>
          <span className="ticket__wrapper--content">{formatDate(dateThere, durationThere)}</span>
        </div>
        <div className="ticket__wrapper">
          <span className="ticket__wrapper--head">В ПУТИ</span>
          <span className="ticket__wrapper--content">{durationTime(durationThere)}</span>
        </div>
        <div className="ticket__wrapper">
          <div className="ticket__wrapper--head">
            {stopsThere.length} {changeWord(stopsThere.length)}
          </div>
          <div className="ticket__wrapper--content">HKG, JNB</div>
        </div>
      </div>
      <div className="ticket__content">
        <div className="ticket__wrapper">
          <span className="ticket__wrapper--head">HKT - MOV</span>
          <span className="ticket__wrapper--content">{formatDate(dateBack, durationBack)}</span>
        </div>
        <div className="ticket__wrapper">
          <span className="ticket__wrapper--head">В ПУТИ</span>
          <span className="ticket__wrapper--content">{durationTime(durationBack)}</span>
        </div>
        <div className="ticket__wrapper">
          <div className="ticket__wrapper--head">
            {stopsBack.length} {changeWord(stopsBack.length)}
          </div>
          <div className="ticket__wrapper--content">HKG, JNB</div>
        </div>
      </div>
    </li>
  );
};

export default Ticket;
