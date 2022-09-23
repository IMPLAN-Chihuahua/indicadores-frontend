
const getCatalog = (catalogs, id) => {
  if (Array.isArray(catalogs)) {
    const catalogInput = catalogs.find(catalog => catalog.idCatalogo === id);
    return catalogInput
  }

  return catalogs;
}

const displayLabel = (id) => {
  switch (id) {
    case 1: return 'Objetivos de Desarrollo Sostenible';
    case 2: return 'Unidad de Medida';
    case 3: return 'Cobertura geográfica';
    default: return 'Ingrese el valor';
  }
}

export { getCatalog, displayLabel };