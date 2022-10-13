const isNumber = (value) => {
  if (typeof value != "string") return false
  return !isNaN(value) && !isNaN(parseFloat(value))
}

export { isNumber }