import { registerInDevtools, Store } from "pullstate";

interface IUIStore {
  pullstateUpd: number;
  isDeveloper: boolean;
  isDemoMode: boolean;
  growerSettingsMixerPh: number;
  growerSettingsMixerTDS: number;
  mercuryVersion: string | null;
}

export const UIStore = new Store<IUIStore>({
  pullstateUpd: Date.now(),
  isDeveloper: false,
  isDemoMode: false,
  growerSettingsMixerPh: 6,
  growerSettingsMixerTDS: 600,
  mercuryVersion: null
});

registerInDevtools({
  UIStore,
});