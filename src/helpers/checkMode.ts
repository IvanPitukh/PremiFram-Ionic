import { ILocalFloor, modeTypes } from "../types";

interface IMode {
  floorNumber: number;
  mode: number | string;
  enable: number | string;
  currentLocalFloor: null | undefined | ILocalFloor;
  currentTimeStamp: number;
  creationTimestampServer?: number;
  totalduration?: number;
}

/**
 *
 * @returns string
 */
const checkMode = ({ floorNumber, mode, enable, currentLocalFloor, currentTimeStamp, creationTimestampServer, totalduration }: IMode) => {
  let nameMode = `${modeTypes.OFF}`;

  /**
   * harvesting mode - когда (currentTimestamp - creationTimestamp)/24*3600 > totalduration 30.58362268518519
   *
   */
  // if (enable === 1 && creationTimestampServer && totalduration) {
  //   const difference = Math.floor(currentTimeStamp / 1000) - creationTimestampServer;
  //   const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  //   console.log(daysDifference);

  //   if (daysDifference >= 0) {
  //     return (nameMode = `${modeTypes.HARVESTING}`);
  //   }
  // }

  // Старая формула  

  if (currentLocalFloor) {
   
    
    if(creationTimestampServer) { 
      if (((( currentTimeStamp/1000 - creationTimestampServer ) / (24 * 3600)) > currentLocalFloor.totalDuration) && (enable == 1 && mode == 1)) {
        return (nameMode = modeTypes.HARVESTING);
      }
    }
  }


  if (enable == 0 && mode == 0) {
    return (nameMode = `${modeTypes.OFF}`);
  }
  if (enable == 1 && mode == 0) {
    return (nameMode = `${modeTypes.SEEDING}`);
  }
  if (enable == 1 && mode == 1) {
    return (nameMode = `${modeTypes.GROWING}`);
  }
  

  return nameMode;
};
export { checkMode };
