const isNumber = (value) => {
  if (typeof value != "string") return false
  return !isNaN(value) && !isNaN(parseFloat(value))
}

const isURL = (str) => {
  let url;
  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }
  return url.protocol === 'https:' || url.protocol === 'http:';
}

export { isNumber, isURL }