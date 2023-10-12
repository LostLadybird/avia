import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox } from 'antd';

import { checkFilterAll, toggleCheck } from '../../store/ticketSlice';

import './aside-filter.css';

const AsideFilter = () => {
  const [checkedAll, setCheckedAll] = useState(true);
  const [checkedZero, setCheckedZero] = useState(true);
  const [checkedOne, setCheckedOne] = useState(true);
  const [checkedTwo, setCheckedTwo] = useState(true);
  const [checkedThree, setCheckedThree] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (checkedZero && checkedOne && checkedTwo && checkedThree) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checkedZero, checkedOne, checkedTwo, checkedThree]);

  useEffect(() => {
    dispatch(checkFilterAll(checkedAll));
  }, [dispatch, checkedAll]);

  useEffect(() => {
    dispatch(toggleCheck({ isChecked: checkedZero, value: 0 }));
  }, [dispatch, checkedZero]);
  useEffect(() => {
    dispatch(toggleCheck({ isChecked: checkedOne, value: 1 }));
  }, [dispatch, checkedOne]);
  useEffect(() => {
    dispatch(toggleCheck({ isChecked: checkedTwo, value: 2 }));
  }, [dispatch, checkedTwo]);
  useEffect(() => {
    dispatch(toggleCheck({ isChecked: checkedThree, value: 3 }));
  }, [dispatch, checkedThree]);

  const filterOnChange = (e) => {
    switch (e.target.name) {
      case 'Zero':
        setCheckedZero(e.target.checked);
        break;
      case 'One':
        setCheckedOne(e.target.checked);
        break;
      case 'Two':
        setCheckedTwo(e.target.checked);
        break;
      case 'Three':
        setCheckedThree(e.target.checked);
        break;
      default:
        setCheckedAll(e.target.checked);
        setCheckedZero(e.target.checked);
        setCheckedOne(e.target.checked);
        setCheckedTwo(e.target.checked);
        setCheckedThree(e.target.checked);
        break;
    }
  };

  return (
    <div className="aside">
      <h2 className="aside__title">КОЛИЧЕСТВО ПЕРЕСАДОК</h2>
      <Checkbox className="checkbox" name={'All'} checked={checkedAll} onChange={(e) => filterOnChange(e)}>
        Все
      </Checkbox>
      <Checkbox className="checkbox" name={'Zero'} checked={checkedZero} onChange={(e) => filterOnChange(e)}>
        Без пересадок
      </Checkbox>
      <Checkbox className="checkbox" name={'One'} checked={checkedOne} onChange={(e) => filterOnChange(e)}>
        1 пересадка
      </Checkbox>
      <Checkbox className="checkbox" name={'Two'} checked={checkedTwo} onChange={(e) => filterOnChange(e)}>
        2 пересадки
      </Checkbox>
      <Checkbox className="checkbox" name={'Three'} checked={checkedThree} onChange={(e) => filterOnChange(e)}>
        3 пересадки
      </Checkbox>
    </div>
  );
};

export default AsideFilter;
