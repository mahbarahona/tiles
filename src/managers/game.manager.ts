import { Color, Engine, EngineOptions } from 'excalibur';
import { assetManager } from './asset.manager';
import { levelManager } from './level.manager';
import { Subject } from '../utils';
import { GAME_STATES, SCENE_EVENTS, SCENE_STATE } from '../models';
import { audioManager } from './audio.manager';
import { uiManager } from './ui.manager';

class GameManager {
  game!: Engine;
  game_state!: Subject;
  scene_state!: Subject;

  constructor(engine: Engine) {
    this.game = engine;
    this.game_state = new Subject();
    this.scene_state = new Subject();
  }
  init() {
    assetManager.init();
    levelManager.init();
    uiManager.init();
    //
    levelManager.levels.forEach((lvl) => {
      game.add(lvl.name, lvl);
    });

    eventBus.on(SCENE_EVENTS.SWITCH_TOOL, (new_tool: string) => {
      uiManager.update_tools(new_tool);
    });

    this.game_state.subscribe((new_game_state: GAME_STATES) => {
      console.log(`GAME_STATE [${new_game_state}]`);
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
          this.game.goToScene(levelManager.first_level.name);
          uiManager.update_state(SCENE_STATE.READY);
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
    this.game.goToScene(levelManager.levels[1].name);
    this.game_state.next(GAME_STATES.PLAYING);
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
  canvasElementId: 'main-canvas',
  backgroundColor: Color.Transparent,
  // suppressConsoleBootMessage:true
};
//
const game = new Engine(options);
const gameManager = new GameManager(game);
const eventBus = new EventBus();
export { gameManager, eventBus };
