import { MAPS } from "../models";

class Datamanager {
  private store_key = "EXCALI";
  data: any;
  init() {
    this.load();
  }
  private defaultData() {
    return {
      first_time: false,
      current_map: "",
      collectable: [],
      inventory: [],
      map: {
        cities: [],
      },
      preferences: {
        mute: false,
      },
    };
  }
  load() {
    const local_data = JSON.parse(localStorage.getItem(this.store_key) || "");
    this.data = local_data || this.defaultData();
  }
  save() {
    this.data.ts = Date.now();
    const serialized = JSON.stringify(this.data);
    localStorage.setItem(this.store_key, serialized);
  }
  set_current_map(map: MAPS | string) {
    this.data.current_map = map;
    this.save();
  }
  set_music_pref(pref: boolean) {
    this.data.preferences = {
      mute: pref,
    };
    this.save();
  }
}

export const dataManager = new Datamanager();
