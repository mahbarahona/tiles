import { LANGUAGES, MAPS } from "../models";

// TODO:  type game_data and slot_data
class Datamanager {
  private store_key = "EXCALI";
  data: any;
  current_slot: any;
  current_data: any;

  private default_game_data() {
    return {
      ts: Date.now(),
      slots: [
        {
          id: 1,
          name: "Slot # 1",
          data: null,
        },
        {
          id: 2,
          name: "Slot # 2",
          data: null,
        },
        {
          id: 3,
          name: "Slot # 3",
          data: null,
        },
      ],
      preferences: {
        mute: false,
        lang: LANGUAGES.SPANISH,
      },
    };
  }
  private default_slot_data() {
    return {
      ts: Date.now(),
      current_map: null,
    };
  }
  private load() {
    const local_data = localStorage.getItem(this.store_key);
    if (local_data) {
      this.data = JSON.parse(local_data);
    } else {
      this.data = this.default_game_data();
    }
    this.save();
  }
  //
  init() {
    this.load();
  }
  save() {
    this.data.ts = Date.now();
    const serialized = JSON.stringify(this.data);
    localStorage.setItem(this.store_key, serialized);
  }
  set_slot(slot_id: number) {
    const slot = this.data.slots.find((s: any) => s.id === slot_id);

    if (!slot.data) {
      slot.data = this.default_slot_data();
    }
    this.current_slot = slot;
    this.save();
  }
  set_current_map(map: MAPS | string) {
    this.current_slot.data.current_map = map;
    this.save();
  }
  set_music_pref(music_pref: boolean) {
    this.data.preferences.mute = music_pref;
    this.save();
  }
  set_language(lang: LANGUAGES) {
    this.data.preferences.lang = lang;
    this.save();
  }
  delete_slot(slot_id: number) {
    const slot = this.data.slots.find((s: any) => s.id === slot_id);
    slot.data = null;
    this.save();
  }
}

export const dataManager = new Datamanager();
