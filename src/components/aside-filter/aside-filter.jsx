import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from 'antd';

import { checkFilterAll, toggleCheck } from '../../store/ticketSlice';

import styles from './aside-filter.module.scss';

const AsideFilter = () => {
  const [active, setActive] = useState(true);

  const dispatch = useDispatch();

  const filtersArray = useSelector((state) => state.tickets.filters);

  const checkElement = (id) => {
    dispatch(toggleCheck(id));
  };

  const checkAllElements = () => {
    dispatch(checkFilterAll(!active));
  };

  const transferText = (id) => {
    switch (id) {
      case 0:
        return 'Без пересадок';
      case 1:
        return '1 пересадка';
      case 2:
        return '2 пересадки';
      case 3:
        return '3 пересадки';
      default:
        return;
    }
  };

  useEffect(() => {
    setActive(filtersArray.every((elem) => elem.checked === true));
  }, [filtersArray]);

  return (
    <div className={styles.aside}>
      <h2 className={styles.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</h2>
      <Checkbox
        className={styles.checkbox}
        name={'All'}
        key={4}
        checked={active}
        id={4}
        onChange={() => {
          checkAllElements();
        }}
      >
        Все
      </Checkbox>
      {filtersArray.map((elem) => (
        <Checkbox
          key={elem.id}
          className={styles.checkbox}
          id={elem.id}
          checked={elem.checked}
          onChange={() => {
            checkElement(elem.id);
          }}
        >
          {transferText(elem.id)}
        </Checkbox>
      ))}
    </div>
  );
};

export default AsideFilter;
