import { Color, Engine, EngineOptions } from 'excalibur';
import { assetManager } from './asset.manager';
import { levelManager } from './level.manager';

class GameManager {
  game!: Engine;
  constructor(engine: Engine) {
    this.game = engine;
  }
  init() {
    assetManager.init();
    levelManager.init();
    //
    levelManager.levels.forEach((lvl) => {
      game.add(lvl.name, lvl);
    });

    this.game.start(assetManager.loader).then(() => {
      this.game.goToScene(levelManager.first_level);
    });
  }
}

const options: EngineOptions = {
  width: 600,
  height: 400,
  canvasElementId: 'main-canvas',
  backgroundColor: Color.Transparent,
};
//
const game = new Engine(options);
const gameManager = new GameManager(game);
export { gameManager };
