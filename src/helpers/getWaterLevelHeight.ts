interface IgetWaterLevelHeight {
  depth: number; // /get_dosing: depth
  h_off: number; // /get_version: offset
  h_tank: number; // /get_version: tankHeight
  h_min: number; // /get_version minimumWaterLevel
}

/**
 * Returns the real water level height
 * @param {number} depth api/get_dosing: depth
 * @param {number} h_off api/get_version: offset
 * @param {number} h_tank api/get_version: tankHeight
 * @param {number} h_min api/get_version minimumWaterLevel
 * @returns number
 */
const getWaterLevelHeight = ({ depth, h_off, h_tank, h_min }: IgetWaterLevelHeight) => {
  let result = 100 * (1 - (depth - h_off) / (h_tank - h_min));
  return result;
};

export { getWaterLevelHeight };
