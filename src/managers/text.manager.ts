import { dataManager } from "./data.manager";

class TextManager {
  texts: any = {
    main_menu: {
      btn_continue: {
        en: "contine",
        es: "continuar",
      },
      btn_new_game: {
        en: "new game",
        es: "Nuevo Juego",
      },
      settings_music: {
        en: "music",
        es: "música",
      },
      settings_language: {
        en: "language",
        es: "idioma",
      },
      //
      slots_title: {
        en: "slots",
        es: "partidas",
      },
      slot_name: {
        en: "slot",
        es: "partida",
      },
      slot_empty: {
        en: "empty",
        es: "disponible",
      },
      slot_btn_play: {
        en: "play",
        es: "jugar",
      },
      slot_btn_delete: {
        en: "delete",
        es: "borrar",
      },
    },
    credits: {
      title: {
        en: "Credits",
        es: "Créditos",
      },
      code: {
        en: "Code",
        es: "Código",
      },
      by: {
        en: "by",
        es: "por",
      },
      music: {
        en: "Music",
        es: "Música",
      },
    },
    controls: {
      cancel: {
        en: "cancel",
        es: "cancelar",
      },
      menu: {
        en: "menu",
        es: "menú",
      },
      movement: {
        en: "movement",
        es: "mover",
      },
      action: {
        en: "action",
        es: "acción",
      },
    },
    in_game: {
      menu: {
        en: "Menu",
        es: "Menú",
      },
      music: {
        en: "Music",
        es: "Música",
      },
      menu_collectables: {
        en: "Collection",
        es: "Colección",
      },
      menu_items: {
        en: "Items",
        es: "Items",
      },
      menu_maps: {
        en: "Map",
        es: "Mapa",
      },
      menu_settings: {
        en: "Settings",
        es: "Ajustes",
      },
      menu_exit: {
        en: "Exit game",
        es: "Salir del juego",
      },
    },
  };

  init() {}

  text(view: string, key: string) {
    const lang = dataManager.data.preferences.lang;
    return this.texts[view][key][lang];
  }
}

export enum TEXT_VIEWS {
  MAIN_MENU = "main_menu",
  IN_GAME = "in_game",
  CREDITS = "credits",
  CONTROLS = "controls",
}
//
export enum TEXT_IN_GAME {
  MENU = "menu",
  MENU_COLLECTABLES = "menu_collectables",
  MENU_ITEMS = "menu_items",
  MENU_MAPS = "menu_maps",
  MENU_SETTINGS = "menu_settings",
  MENU_EXIT = "menu_exit",
  MUSIC = "music",
}
export enum TEXT_CONTROLS {
  CANCEL = "cancel",
  MENU = "menu",
  MOVEMENT = "movement",
  ACTION = "action",
}
export enum TEXT_CREDITS {
  TITLE = "title",
  CODE = "code",
  MUSIC = "music",
  BY = "by",
}
export enum TEXT_MAIN_MENU {
  BTN_CONTINUE = "btn_continue",
  BTN_NEW_GAME = "btn_new_game",
  SETTINGS_MUSIC = "settings_music",
  SETTINGS_LANG = "settings_language",
  SLOTS_TITLE = "slots_title",
  SLOTS_NAME = "slot_name",
  SLOTS_BTN_PLAY = "slot_btn_play",
  SLOTS_BTN_DELETE = "slot_btn_delete",
  SLOTS_EMPTY = "slot_empty",
}

export const textManager = new TextManager();
