const getValuesWithStep = (min: number, max: number, step: number): number[] => {
  let rangeArray = [min];
  let indx = min;
  while (indx < max) {
    const value = Number((indx + step).toFixed(1));
    rangeArray.push(value);
    indx = value;
  }
  return rangeArray;
};
export { getValuesWithStep };
