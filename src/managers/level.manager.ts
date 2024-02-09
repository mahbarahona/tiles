import { MAPS, SONGS } from '../models';
import { Level } from '../scenes/level.scene';

class LevelManager {
  levels_config!: any[];
  levels: Level[] | any[] = [];
  first_level: any;
  current!: Level;
  constructor(levels_config: any[]) {
    this.levels_config = levels_config;
  }
  init() {
    this.levels_config.forEach((config) => this.levels.push(new Level(config)));
    this.first_level = this.levels[0];
  }
}
const levels_config = [
  {
    name: 'Main Menu',
    map: MAPS.MAIN_MENU,
    song: SONGS.SHEPPER_DOG
  },
  {
    name: 'Town',
    map: MAPS.TOWN,
    song: SONGS.APPLE_CIDER
  },
];
const levelManager = new LevelManager(levels_config);

export { levelManager };
