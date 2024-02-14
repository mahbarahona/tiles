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
    name: "player house",
    map: MAPS.INDOOR_PLAYER_HOUSE,
    song: SONGS.APPLE_CIDER,
  },
  {
    name: "Farm",
    map: MAPS.FARM,
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
        id: `${NPC_TYPE.CHICKEN}_REBEL`,
        dialogues: [
          {
            text: "WHAT DO U WANT !!!",
          },
          {
            text: "sorry buddy...",
          },
          {
            text: "I'm just trying to get some air.",
          },
          {
            text: "Let me tell u something...",
          },
          {
            text: "if u have any change,",
          },
          {
            text: "Leave this place.",
          },
        ],
      },
      {
        id: `${NPC_TYPE.CHICKEN}_HAPPY`,
        dialogues: [
          {
            text: "this place is the BEST!",
          },
          {
            text: "By the way, The farm increase his revenue in a 6%.",
          },
          {
            text: "we have to be grateful.",
          },
        ],
      },
      {
        id: `${NPC_TYPE.CHICKEN}_RESIGNADO`,
        dialogues: [
          {
            text: "Dont worry u will get used to",
          },
          {
            text: "Always have been this way.",
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
  {
    name: "Town",
    map: MAPS.TOWN,
    song: SONGS.APPLE_CIDER,
    dialogies: [],
  },
];
const levelManager = new LevelManager(levels_config);

export { levelManager };
