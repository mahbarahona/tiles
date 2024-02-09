export const PLAYER_TOOLS = ['wateringcan', 'axe'];
export enum NPC_TYPE {
  COW = 'COW',
  CHICKEN = 'CHICKEN',
}
export enum GAME_STATES {
  LOADING = 'LOADING',
  READY = 'READY',
  PLAYING = 'PLAYING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}
export enum SCENE_STATE {
  LOADING = 'SCENE_STATE__LOADING',
  READY = 'SCENE_STATE__READY',
  PLAYING = 'SCENE_STATE__PLAYING',
  PAUSED = 'SCENE_STATE__PAUSED',
  COMPLETED = 'SCENE_STATE__COMPLETED',
  GAMEOVER = 'SCENE_STATE__GAMEOVER',
  ERROR = 'SCENE_STATE__ERROR',
}
export enum SCENE_EVENTS {
  SWITCH_TOOL = 'GAME_EVENTS__SWITCH_TOOL',
}

export enum MAPS{
  MAIN_MENU = 'main_menu',
  TOWN = 'town',
}
export enum SONGS{
  APPLE_CIDER='apple_cider',
  SHEPPER_DOG='shepherd_dog',

}
