const isObjEmpty = (obj) => obj ? Object.keys(obj) === 0 : true;

const isArrayEmpty = (arr) => arr ? arr.length === 0 : true;

export { isObjEmpty, isArrayEmpty };