import { format } from 'date-fns';

const formatDate = (date, duration) => {
  const res = format(Date.parse(date), 'HH:mm');
  const res2 = format(new Date(Date.parse(date) + duration * 60000), 'HH:mm');
  return `${res} - ${res2}`;
};

export default formatDate;
