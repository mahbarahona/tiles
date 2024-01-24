import { Level } from '../scenes/level.scene';

class LevelManager {
  levels_config!: any[];
  levels: Level[] = [];
  first_level!: string;
  constructor(levels_config: any[]) {
    this.levels_config = levels_config;
  }
  init() {
    this.levels_config.forEach((config) => this.levels.push(new Level(config)));
    this.first_level = this.levels[0].name;
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
