import { Drivers, Storage } from "@ionic/storage";
import { ILocalFloor } from "../types";
import { getFinishDate } from "../helpers/getFinishDate";

export const KEY_USER = "dbuser";
export const KEY_TIME = "dbtime";
export const KEY_RECIPES = "dbrecipes";
export const FLOOR_1 = "floor_1";
export const FLOOR_2 = "floor_2";
export const FLOOR_3 = "floor_3";
export const FLOOR_4 = "floor_4";
export const FIRMWARE_FILE = "FIRMWARE_FILE";
export const SELECTED_LANGUAGE = "SELECTED_LANGUAGE";

export let storage: any = null;

export const createStore = async () => {
  storage = new Storage({
    name: "growerdb",
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
  });
  storage.create();
};

export const set = async (key: string, value: any) => {
  return await storage?.set(key, value);
};

export const createFloor = async (key: string, value: ILocalFloor) => {
  const creationTimestamp = Date.now();
  const totalEndDate = getFinishDate(creationTimestamp, Number(value.totalDuration), 0);
  const prepareLocalFloorData = {
    floor: value.floor,
    totalDuration: value.totalDuration,
    creationTimestamp: value.creationTimestamp,
    addDays: 0,
    enable: 1,
    mode: 0,
    totalEndDate,
  };
  return await storage?.set(key, prepareLocalFloorData);
};

export const get = async (key: string) => {
  return await storage?.get(key);
};

export const remove = async (key: string) => {
  return await storage?.remove(key);
};

export const clear = async () => {
  await storage?.clear();
};
