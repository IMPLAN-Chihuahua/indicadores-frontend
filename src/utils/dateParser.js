export const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

const parseDate = (date) => {
  const event = new Date(date);
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

  const parsedDate = event.toLocaleDateString('es-ES', options);

  return parsedDate;
}

const ultimaFecha = (date, dateDifference, dateDifferenceYear) => {
  const updatedDate = new Date(date);
  const today = new Date();

  let dateDifferenceText = '';
  if (dateDifferenceYear > 0) {
    dateDifferenceYear === 1
      ? dateDifferenceText = `hace ${dateDifferenceYear} año`
      : dateDifferenceText = `hace ${dateDifferenceYear} años`;
  } else if (dateDifference === 0) {
    const dayDifference = today.getDate() - updatedDate.getDate();
    dayDifference === 0
      ? dateDifferenceText = 'hoy'
      : dayDifference === 1
        ? dateDifferenceText = `hace ${dayDifference} día`
        : dateDifferenceText = `hace ${dayDifference} días`;
  }
  else {
    dateDifference === 1
      ? dateDifferenceText = `hace ${dateDifference} mes`
      : dateDifferenceText = `hace ${dateDifference} meses`;
  }

  return dateDifferenceText;
}


export { parseDate, ultimaFecha };