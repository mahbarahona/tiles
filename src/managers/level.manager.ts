import { Level } from '../scenes/level.scene';
import { mainMenu } from '../scenes/main.scene';

class LevelManager {
  levels_config!: any[];
  levels: Level[] | any[] = [];
  first_level: any;
  current!: Level;
  constructor(levels_config: any[]) {
    this.levels_config = levels_config;
  }
  init() {
    this.first_level = mainMenu;
    this.levels.push(this.first_level);
    this.levels_config.forEach((config) => this.levels.push(new Level(config)));
  }
}
const levels_config = [
  {
    name: '003',
    map: '003',
  },
];
const levelManager = new LevelManager(levels_config);

export { levelManager };
