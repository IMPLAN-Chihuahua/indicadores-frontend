const nameConstructor = (name, lastName) => {
  const firstName = name.split(' ')[0];

  return `${firstName} ${lastName}`;
}

export { nameConstructor };