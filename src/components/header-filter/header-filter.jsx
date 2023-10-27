import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Radio } from 'antd';

import { sortByPrice, sortByDuration, sortByOptimal } from '../../store/ticketSlice';
import AsideFilter from '../aside-filter';

import styles from './header-filter.module.scss';

const HeaderFilter = () => {
  const [buttonValue, setButtonValue] = useState();

  const dispatch = useDispatch();

  const onChange = (e) => {
    setButtonValue(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <AsideFilter />
      <Radio.Group className={styles.buttons} onChange={onChange} value={buttonValue}>
        <Radio.Button className={styles.btn} value={1} onClick={() => dispatch(sortByPrice())}>
          Самый дешевый
        </Radio.Button>
        <Radio.Button className={styles.btn} value={2} onClick={() => dispatch(sortByDuration())}>
          Самый быстрый
        </Radio.Button>
        <Radio.Button className={styles.btn} value={3} onClick={() => dispatch(sortByOptimal())}>
          Оптимальный
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default HeaderFilter;
