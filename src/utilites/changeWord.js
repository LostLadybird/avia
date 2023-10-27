const changeWord = (num) => {
  switch (num) {
    case 1:
      return 'ПЕРЕСАДКА';
    case 2:
    case 3:
      return 'ПЕРЕСАДКИ';
    default:
      return 'ПЕРЕСАДОК';
  }
};

export default changeWord;
