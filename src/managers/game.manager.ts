// import { DevTool } from '@excaliburjs/dev-tools';
import { Color, Engine, EngineOptions } from "excalibur";
import { assetManager } from "./asset.manager";
import { levelManager } from "./level.manager";
import { Subject } from "../utils";
import {
  GAME_STATES,
  MAPS,
  PLAYER_STATE,
  SCENE_EVENTS,
  SCENE_STATE,
  SONGS,
} from "../models";
import { audioManager } from "./audio.manager";
import { uiManager } from "./ui.manager";
import { dialogManager } from "./dialog.manager";
import { Player } from "../actors/player.actor";
import { Chicken } from "../actors/NPC/chicken.actor";
import { Cow } from "../actors/NPC/cow.actor";

class GameManager {
  game!: Engine;
  game_state!: Subject;
  scene_state!: Subject;

  player!: Player;
  constructor(engine: Engine) {
    this.game = engine;
    this.game_state = new Subject();
    this.scene_state = new Subject();
  }
  init() {
    assetManager.init();
    levelManager.init();
    uiManager.init();
    dialogManager.init();
    audioManager.init();
    //
    levelManager.load_levels(this.game);

    eventBus.on(SCENE_EVENTS.SWITCH_TOOL, (new_tool: string) => {
      uiManager.update_tools(new_tool);
    });

    this.game_state.subscribe((new_game_state: GAME_STATES) => {
      console.log(`[${new_game_state}]`);
      switch (new_game_state) {
        case GAME_STATES.LOADING:
          assetManager.init();
          levelManager.init();

          audioManager.init();
          uiManager.init();
          this.game.start(assetManager.loader).then(() => {
            this.game_state.next(GAME_STATES.READY);
          });
          break;
        case GAME_STATES.READY:
          this.game.goToScene(MAPS.MAIN_MENU);
          uiManager.update_state(SCENE_STATE.READY);
          audioManager.play_bg(SONGS.SHEPPERD_DOG);

          break;
        case GAME_STATES.PLAYING:
          uiManager.update_state(SCENE_STATE.PLAYING);
          break;
        case GAME_STATES.COMPLETED:
          break;
        case GAME_STATES.ERROR:
          break;
      }
    });
    this.scene_state.subscribe((new_scene_state: SCENE_STATE) => {
      console.log(`[${this.game_state.current()}]/[${new_scene_state}]`);
      switch (new_scene_state) {
        case SCENE_STATE.LOADING:
          break;
        case SCENE_STATE.READY:
          break;
        case SCENE_STATE.PLAYING:
          break;
        case SCENE_STATE.TALKING:
          break;
        case SCENE_STATE.PAUSED:
          break;
        case SCENE_STATE.COMPLETED:
          break;
        case SCENE_STATE.GAMEOVER:
          break;
        case SCENE_STATE.ERROR:
          break;
      }

      uiManager.update_state(new_scene_state);
    });

    this.game_state.next(GAME_STATES.LOADING);
  }
  start_game() {
    audioManager.play_bg(SONGS.APPLE_CIDER);
    this.game.goToScene(MAPS.TOWN);
    this.game_state.next(GAME_STATES.PLAYING);
  }
  go_to(scene: string) {
    console.log(`go to: ${scene}`);
    this.game.goToScene(scene);
  }

  start_talk(npc: Chicken | Cow, player: Player) {
    this.player = player;

    this.scene_state.next(SCENE_STATE.TALKING);
    const { dialogues }: any = game.currentScene;
    dialogManager.start(dialogues, npc.dialog_id);
  }
  continue_talking() {
    dialogManager.continue();
  }
  stop_talking() {
    this.player.player_state = PLAYER_STATE.IDLE;
    this.scene_state.next(SCENE_STATE.PLAYING);
  }
}
class EventBus {
  events: Record<string, any> = {};

  constructor() {}
  on(event: string, callback: any) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  }
  emit(event: string, data: any = {}) {
    if (this.events[event]) {
      this.events[event].forEach((callback: any) => {
        callback(data);
      });
    }
  }
}

const options: EngineOptions = {
  width: 600,
  height: 400,
  canvasElementId: "main-canvas",
  backgroundColor: Color.Transparent,
};
//
const game = new Engine(options);
// const devtool = new DevTool(game);
const gameManager = new GameManager(game);
const eventBus = new EventBus();
export { gameManager, eventBus };
