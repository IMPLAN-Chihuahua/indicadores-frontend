
const getCatalog = (catalogs, id) => {
  console.log('kk')
  if (catalogs) {
    const catalogInput = catalogs.find(catalog => catalog.idCatalogo === id);

    return catalogInput
  }

  return {};
}

export { getCatalog };