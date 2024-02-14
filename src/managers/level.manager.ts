import { Engine } from "excalibur";
import { MAPS, NPC_TYPE, SONGS } from "../models";
import { Level } from "../scenes/level.scene";

class LevelManager {
  levels_config!: any[];
  levels: Level[] | any[] = [];
  constructor(levels_config: any[]) {
    this.levels_config = levels_config;
  }
  init() {
    this.levels_config.forEach((config) => this.levels.push(new Level(config)));
  }
  load_levels(game: Engine) {
    for (const lvl of this.levels) {
      game.add(lvl.map_name, lvl);
    }
  }
}
const levels_config = [
  {
    name: "Main Menu",
    map: MAPS.MAIN_MENU,
    song: SONGS.SHEPPERD_DOG,
  },
  {
    name: "Town",
    map: MAPS.TOWN,
    song: SONGS.APPLE_CIDER,
    dialogues: [
      {
        id: `${NPC_TYPE.CHICKEN}_RESEARCH`,
        dialogues: [
          {
            text: "I've been conducting important research. ",
          },
          {
            text: "Conclusion?",
          },
          {
            text: "Chickens are eggstremely eggciting creatures!",
          },
        ],
      },
      {
        id: `${NPC_TYPE.CHICKEN}_DETECTIVE`,
        dialogues: [
          {
            text: "I'm investigating a case. ",
          },
          {
            text: "Someone stole my corn!",
          },
          {
            text: " It's a real 'fowl' play.",
          },
          {
            text: "Any clues?",
          },
        ],
      },
      {
        id: `${NPC_TYPE.CHICKEN}_ZEN`,
        dialogues: [
          {
            text: "Why worry about crossing roads? ",
          },
          {
            text: "The true journey is within.",
          },
          {
            text: " I'm practicing zen and the art of scratching the ground.",
          },
        ],
      },
      {
        id: `${NPC_TYPE.CHICKEN}_CONSPIRACY`,
        dialogues: [
          {
            text: "I suspect the cows are plotting something.",
          },
          {
            text: "I saw them huddled in a 'moo-t'ing. Time to beef up security!",
          },
        ],
      },
      //COWS
      {
        id: `${NPC_TYPE.COW}_MOZART`,
        dialogues: [
          {
            text: "I'm practicing my singing skills. ",
          },
          {
            text: "Moooo-zart would be proud.",
          },
          {
            text: "It's a moo-sical revolution!",
          },
        ],
      },
    ],
  },
];
const levelManager = new LevelManager(levels_config);

export { levelManager };
