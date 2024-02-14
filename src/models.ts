export const PLAYER_TOOLS = ["wateringcan", "axe"];
export enum NPC_TYPE {
  COW = "COW",
  CHICKEN = "CHICKEN",
  GUARD = "GUARD",
}
export enum PLAYER_STATE {
  IDLE = "IDLE",
  TALKING = "TALKING",
  IN_ACTION = "IN_ACTION",
  MENU = "MENU",
}
export enum GAME_STATES {
  LOADING = "LOADING",
  READY = "READY",
  PLAYING = "PLAYING",
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
}
export enum MENU {
  COLLECTIVES = "COLLECTIVES",
  ITEMS = "ITEMS",
  MAP = "MAP",
  SETTINGS = "SETTINGS",
  EXIT = "EXIT",
}
export enum SCENE_STATE {
  LOADING = "SCENE_STATE__LOADING",
  READY = "SCENE_STATE__READY",
  PLAYING = "SCENE_STATE__PLAYING",
  TALKING = "SCENE_STATE_TALKING",
  MENU = "SCENE_STATE_MENU",
  PAUSED = "SCENE_STATE__PAUSED",
  COMPLETED = "SCENE_STATE__COMPLETED",
  GAMEOVER = "SCENE_STATE__GAMEOVER",
  ERROR = "SCENE_STATE__ERROR",
}
export enum SCENE_EVENTS {
  SWITCH_TOOL = "GAME_EVENTS__SWITCH_TOOL",
}

export enum TILED_LAYERS {
  WATER = "water",
  GROUND = "GROUND",
}
export enum ACTOR_TYPE {
  NPC = "NPC",
  SCENE_NEXT = "SCENE_NEXT",
}
export enum TILED_OBJECT {
  CHICKEN = "chickens",
  COW = "cows",
  SCENE_AREA = "scene_area",
  PLAYER = "player",
  GUARD = "guard",
}

export enum TILED_OBJECT_PROPS {
  SCENE = "scene",
  DIALOG_ID = "dialog_id",
}

export enum MAPS {
  MAIN_MENU = "main_menu",
  FARM = "farm",
  INDOOR_PLAYER_HOUSE = "indoor_player_house",
  TOWN = "town",
}

export enum SONGS {
  APPLE_CIDER = "apple_cider",
  SHEPPERD_DOG = "shepperd_dog",
}
