export const isObjEmpty = (obj) => obj ? Object.keys(obj) === 0 : true;

export const isArrayEmpty = (arr) => arr ? arr.length === 0 : true;

export const PER_PAGE_KEY = 'indicadores-per-page';
export const getGlobalPerPage = () => parseInt(localStorage.getItem(PER_PAGE_KEY) || 5);
export const setGlobalPerPage = (size) => localStorage.setItem(PER_PAGE_KEY, size)