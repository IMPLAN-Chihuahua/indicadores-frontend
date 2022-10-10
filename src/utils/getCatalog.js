
const ODS_ID = 1;
const UNIDAD_MEDIDA_ID = 2;
const COBERTURA_GEOGRAFICA_ID = 3;

const getCatalog = (catalogs, id) => {
  if (Array.isArray(catalogs)) {
    const catalogInput = catalogs.find(catalog => catalog.idCatalogo === id);
    return catalogInput
  }
  return catalogs;
}

const displayLabel = (id) => {
  switch (id) {
    case ODS_ID: return 'Objetivos de Desarrollo Sostenible';
    case UNIDAD_MEDIDA_ID: return 'Unidad de Medida';
    case COBERTURA_GEOGRAFICA_ID: return 'Cobertura geográfica';
    default: return 'Ingrese el valor';
  }
}

export { getCatalog, displayLabel, ODS_ID, UNIDAD_MEDIDA_ID, COBERTURA_GEOGRAFICA_ID };