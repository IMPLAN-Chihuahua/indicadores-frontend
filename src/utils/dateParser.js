
const parseDate = (date) => {
  const event = new Date(date);
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

  const parsedDate = event.toLocaleDateString('es-ES', options);

  return parsedDate;
}

export { parseDate };