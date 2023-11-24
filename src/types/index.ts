interface IFloor {
  floor: number;
  lampOnHour: number;
  lampOnMinute: number;
  lampOffHour: number;
  lampOffMinute: number;
  wateringMinute: number;
  enable: number | string;
  mode: number | string;
  wateringDuration: number;
}

interface IDosing {
  ph: number;
  tds: number;
  temperature: number;
  depth: number;
}

interface ILocalFloor {
  floor: number;
  addDays: number;
  enable: number | string;
  mode: number | string;
  totalDuration: number | string;
  totalEndDate: number | string;
  updatedAt?: number | string;
  creationTimestamp: number;
  creationTimestampServer?: number;
}

interface IFloorRecipe {
  apiVersion?: number;
  floor: number;
  lampOnHour: number;
  lampOnMinute: number;
  lampOffHour: number;
  lampOffMinute: number;
  wateringMinute: number;
  enable: number;
  mode: number;
  wateringDuration: number;
  seedingDuration: number;
  totalDuration: number;
  creationTimestamp?: number;
}

interface IUser {
  id: string;
  name?: string;
}

interface ITime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

interface IDosing {
  ph: number;
  tds: number;
  temperature: number;
  depth: number;
}

interface IDeviceClockResponse {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

const enum modalIds {
  updateFirmware = "updateFirmware",
  startTheFloor = "startTheFloor",
  stopTheFloor = "stopTheFloor",
  turnOffTheFloor = "turnOffTheFloor",
  stopWatering = "stopWatering",
  stopAllFloorsModal = "stopAllFloorsModal",
  addDays = "addDays",
  setTimeModal = "setTimeModal",
  feedbackModal = "feedbackModal",
  growerSettingsMixerPhModal = "growerSettingsMixerPhModal",
  growerSettingsMixerTDSModal = "growerSettingsMixerTDSModal",
  updateApi = "updateApi",
  lightOnAt = "lightOnAt",
  lightOffAt = "lightOffAt",
  presets = "presets",
}

const enum modeTypes {
  OFF = "Off",
  SEEDING = "Seeding",
  GROWING = "Growing",
  HARVESTING = "Harvesting",
}

// FIXME: UNIFICATE THIS
const enum storageItems {
  API_URL = "API_URL",
  USER = "user",
  SKIP_ONBOARDING = "SKIP_ONBOARDING",
}

const i18Languages = {
  ru: {
    title: "Русский",
    value: "ru",
    label: "Russian",
  },
  en: {
    title: "English",
    value: "en",
    label: "English",
  },
  et: {
    title: "Estonian",
    value: "et",
    label: "Estonian",
  },
};

type IMockLocalRecipe = {
  name: string;
  lampOnHour: number;
  lampOnMinute: number;
  lampOffHour: number;
  lampOffMinute: number;
  wateringMinute: number;
  wateringDuration: number;
  seedingDuration: number;
  totalDuration: number;
  seeds: number;
  unit: string;
  meta: {
    et: { name: string; unit: string };
    en: { name: string; unit: string };
  };
};

const presetRecipes = [
  {
    name: "Radish Microgreens",
    lampOnHour: 8,
    lampOnMinute: 0,
    lampOffHour: 23,
    lampOffMinute: 59,
    wateringMinute: 60,
    wateringDuration: 10,
    seedingDuration: 3,
    totalDuration: 7,
    seeds: 20,
    unit: "grams",
    meta: {
      et: {
        name: "Redise mikrorohelised",
        unit: "g",
      },
      en: {
        name: "Radish Microgreens",
        unit: "grams",
      },
    },
  },
  {
    name: "Red Cabbage Microgreens",
    lampOnHour: 8,
    lampOnMinute: 0,
    lampOffHour: 23,
    lampOffMinute: 59,
    wateringMinute: 60,
    wateringDuration: 10,
    seedingDuration: 3,
    totalDuration: 10,
    seeds: 15,
    unit: "grams",
    meta: {
      et: {
        name: "Punase kapsa mikrorohelised",
        unit: "g",
      },
      en: {
        name: "Red Cabbage Microgreens",
        unit: "grams",
      },
    },
  },
  {
    name: "Tat soi Microgreens",
    lampOnHour: 8,
    lampOnMinute: 0,
    lampOffHour: 23,
    lampOffMinute: 59,
    wateringMinute: 60,
    wateringDuration: 10,
    seedingDuration: 3,
    totalDuration: 10,
    seeds: 15,
    unit: "grams",
    meta: {
      et: {
        name: "Tat soi mikrorohelised",
        unit: "g",
      },
      en: {
        name: "Tat soi Microgreens",
        unit: "grams",
      },
    },
  },
  {
    name: "Broccoli Microgreens",
    lampOnHour: 8,
    lampOnMinute: 0,
    lampOffHour: 23,
    lampOffMinute: 59,
    wateringMinute: 60,
    wateringDuration: 10,
    seedingDuration: 3,
    totalDuration: 10,
    seeds: 13,
    unit: "grams",
    meta: {
      et: {
        name: "Brokkoli mikrorohelised",
        unit: "g",
      },
      en: {
        name: "Broccoli Microgreens",
        unit: "grams",
      },
    },
  },
  {
    name: "Kohlrabi Microgreens",
    lampOnHour: 8,
    lampOnMinute: 0,
    lampOffHour: 23,
    lampOffMinute: 59,
    wateringMinute: 60,
    wateringDuration: 10,
    seedingDuration: 3,
    totalDuration: 10,
    seeds: 15,
    unit: "grams",
    meta: {
      et: {
        name: "Kohlrabi mikrorohelised",
        unit: "g",
      },
      en: {
        name: "Kohlrabi Microgreens",
        unit: "grams",
      },
    },
  },
  {
    name: "Mustard Microgreens",
    lampOnHour: 8,
    lampOnMinute: 0,
    lampOffHour: 23,
    lampOffMinute: 59,
    wateringMinute: 60,
    wateringDuration: 10,
    seedingDuration: 3,
    totalDuration: 10,
    seeds: 13,
    unit: "grams",
    meta: {
      et: {
        name: "Sinepi mikrorohelised",
        unit: "g",
      },
      en: {
        name: "Mustard Microgreens",
        unit: "grams",
      },
    },
  },
  {
    name: "Pak choi Microgreens",
    lampOnHour: 8,
    lampOnMinute: 0,
    lampOffHour: 23,
    lampOffMinute: 59,
    wateringMinute: 60,
    wateringDuration: 10,
    seedingDuration: 3,
    totalDuration: 10,
    seeds: 15,
    unit: "grams",
    meta: {
      et: {
        name: "Pak choi mikrorohelised",
        unit: "g",
      },
      en: {
        name: "Pak choi Microgreens",
        unit: "grams",
      },
    },
  },
  {
    name: "Peas Microgreens",
    lampOnHour: 8,
    lampOnMinute: 0,
    lampOffHour: 23,
    lampOffMinute: 59,
    wateringMinute: 60,
    wateringDuration: 10,
    seedingDuration: 5,
    totalDuration: 8,
    seeds: 250,
    unit: "grams",
    meta: {
      et: {
        name: "Herned mikrorohelised",
        unit: "g",
      },
      en: {
        name: "Peas Microgreens",
        unit: "grams",
      },
    },
  },
  {
    name: "Sunflower Microgreens",
    lampOnHour: 8,
    lampOnMinute: 0,
    lampOffHour: 23,
    lampOffMinute: 59,
    wateringMinute: 60,
    wateringDuration: 10,
    seedingDuration: 5,
    totalDuration: 8,
    seeds: 200,
    unit: "grams",
    meta: {
      et: {
        name: "Päevalille mikrorohelised",
        unit: "g",
      },
      en: {
        name: "Sunflower Microgreens",
        unit: "grams",
      },
    },
  },
  {
    name: "Mizuna Microgreens",
    lampOnHour: 8,
    lampOnMinute: 0,
    lampOffHour: 23,
    lampOffMinute: 59,
    wateringMinute: 60,
    wateringDuration: 10,
    seedingDuration: 5,
    totalDuration: 10,
    seeds: 10,
    unit: "grams",
    meta: {
      et: {
        name: "Mizuna mikrorohelised",
        unit: "g",
      },
      en: {
        name: "Mizuna Microgreens",
        unit: "grams",
      },
    },
  },
  {
    name: "Basil",
    lampOnHour: 8,
    lampOnMinute: 0,
    lampOffHour: 23,
    lampOffMinute: 59,
    wateringMinute: 60,
    wateringDuration: 7,
    seedingDuration: 9,
    totalDuration: 35,
    seeds: 5,
    unit: "seeds",
    meta: {
      et: {
        name: "Basiilik",
        unit: "tk",
      },
      en: {
        name: "Basil",
        unit: "seeds",
      },
    },
  },
  {
    name: "Viola",
    lampOnHour: 8,
    lampOnMinute: 0,
    lampOffHour: 23,
    lampOffMinute: 59,
    wateringMinute: 60,
    wateringDuration: 7,
    seedingDuration: 9,
    totalDuration: 75,
    seeds: 5,
    unit: "seeds",
    meta: {
      et: {
        name: "Viola",
        unit: "tk",
      },
      en: {
        name: "Viola",
        unit: "seeds",
      },
    },
  },
  {
    name: "Sorrel",
    lampOnHour: 8,
    lampOnMinute: 0,
    lampOffHour: 23,
    lampOffMinute: 59,
    wateringMinute: 60,
    wateringDuration: 7,
    seedingDuration: 10,
    totalDuration: 30,
    seeds: 5,
    unit: "seeds",
    meta: {
      et: {
        name: "Hapuoblikas",
        unit: "tk",
      },
      en: {
        name: "Sorrel",
        unit: "seeds",
      },
    },
  },
];

export { modalIds, modeTypes, storageItems, presetRecipes, i18Languages };
export type { IFloor, IDosing, IFloorRecipe, IUser, ITime, ILocalFloor, IMockLocalRecipe, IDeviceClockResponse };
