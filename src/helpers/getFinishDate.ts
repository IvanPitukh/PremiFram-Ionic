/**
 * Get finish timestamp by calculating: creationTimestamp, totalDuration and addDays
 * @param {number} creationTimestamp
 * @param {number} totalDuration
 * @param {number} addDays
 */
const getFinishDate = (creationTimestamp: number, totalDuration: number, addDays: number) => {
  const DATE_IN_TIMESTAMP = 86400000;
  const result = creationTimestamp + (DATE_IN_TIMESTAMP * totalDuration) + (DATE_IN_TIMESTAMP * addDays);
  return result
};

export { getFinishDate };
