import axios from "axios";
import { get } from "../data/IonicStorage";
import { IDeviceClockResponse, ITime, storageItems } from "../types";
import { $api } from "./index";

interface IsetFloorRecipe {
  apiVersion?: number;
  floor: number;
  lampOnHour?: number;
  lampOnMinute?: number;
  lampOffHour?: number;
  lampOffMinute?: number;
  wateringMinute?: number;
  enable?: number;
  mode?: number;
  wateringDuration?: number;
  seedingDuration?: number;
  totalDuration?: number;
  creationTimestamp?: string;
}

interface IGetDosingSensorData {
  ph: number;
  tds: number;
  temperature: number;
  depth: number;
}

interface IGetVersionHardwareAndSoftware {
  sensors: number;
  tankHeight: number;
  minimumWaterLevel: number;
  offset: number;
  mercuryVersion: string;
  venusVersion: string;
  jupiterVersion: string;
  saturnVersion: string;
  uranusVersion: string;
  neptuneVersion: string;
}

interface IsetDosingTargets {
  ph: number;
  tds: number;
}

export interface IGetTargetResponse {
  ph: number;
  tds: number;
  sensorCheckInterval: number;
  motorRunningTime: number;
}

const updatedApi = async () => {
  const existApi = await get(storageItems.API_URL);
  if (existApi) $api.defaults.baseURL = `${existApi}`;
};

class ApiService {
  static async ping() {
    await updatedApi();
    return await $api.get("/ping");
  }

  static async getAmountOfFloors() {
    await updatedApi();
    return await $api.get("/floor_amount");
  }

  static async getFloorRecipe(number: number) {
    await updatedApi();
    return await $api.get(`/get_floor${number}`);
  }

  static async setFloorRecipe({
    apiVersion = 1,
    floor,
    lampOnHour,
    lampOnMinute,
    lampOffHour,
    lampOffMinute,
    wateringMinute,
    enable = 0,
    mode = 0,
    wateringDuration,
    seedingDuration,
    totalDuration,
  }: IsetFloorRecipe) {
    await updatedApi();

    return await $api.post(`/set_floor${floor}/submit`, {
      apiVersion,
      floor: Number(floor),
      lampOnHour: Number(lampOnHour),
      lampOnMinute: Number(lampOnMinute),
      lampOffHour: Number(lampOffHour),
      lampOffMinute: Number(lampOffMinute),
      wateringMinute: Number(wateringMinute),
      enable: Number(enable),
      mode: Number(mode),
      wateringDuration: Number(wateringDuration),
      seedingDuration: Number(seedingDuration),
      totalDuration: Number(totalDuration),
    });
  }

  static stopAFloor() {}
  static turnOffTheFloor() {}

  static async getDosingTargets() {
    await updatedApi();
    return await $api.get<IGetTargetResponse>("/get_target");
  }

  static async getDosingSensorData() {
    await updatedApi();
    return await $api.get<IGetDosingSensorData>("/get_dosing");
  }

  static async getVersionHardwareAndSoftware() {
    await updatedApi();
    return await $api.get<IGetVersionHardwareAndSoftware>("/get_version");
  }

  /**
   * @descr stop all floors
   * @return true | false
   */
  static async disableAllFloors() {
    await updatedApi();
    return await $api.get("/disable_everything");
  }

  static async setClock({ year, month, day, hour, minute, second }: ITime) {
    await updatedApi();
    return await $api.post("/set_clock/submit", {
      year,
      month,
      day,
      hour,
      minute,
      second,
    });
  }

  static async setDosingTargets({ ph, tds }: IsetDosingTargets) {
    await updatedApi();
    return await $api.post("/set_target/submit", {
      ph,
      tds,
      sensorCheckInterval: 300,
      motorRunningTime: 10,
    });
  }

  static async updateFireware({ MD5 = "$md5", name = "firmware", data }: { MD5?: string; name?: string; data: File }) {
    return await axios.post(
      "http://192.168.4.1:81/update",
      {
        MD5,
        name,
        data,
      },
      {
        timeout: 30 * 1000,
      }
    );
  }

  static async updateFirewareDemo({ MD5 = "$md5", name = "firmware", data }: { MD5?: string; name?: string; data: File }) {
    return await axios.post(
      "https://5881e728-a0aa-42cc-b6d1-1cf0d9036340.mock.pstmn.io:80/update",
      {
        MD5,
        name,
        data,
      },
      {
        timeout: 30 * 1000,
      }
    );
  }

  static async getDeviceClock() {
    await updatedApi();
    return await $api.get<IDeviceClockResponse>("/get_clock");
  }
}

export default ApiService;
