const durationTime = (min) => {
  const hours = Math.floor(min / 60);
  const minutes = min % 60;
  return `${hours} ч ${minutes} м`;
};

export default durationTime;
