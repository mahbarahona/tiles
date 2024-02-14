import { NPC_TYPE, TILED_OBJECT_PROPS } from "../models";
import { gameManager } from "./game.manager";
import { uiManager } from "./ui.manager";

const default_dialogs = [
  // CHICKEN
  {
    id: `${NPC_TYPE.CHICKEN}_DEFAULT`,
    dialogues: [
      {
        text: "cooo....",
      },
    ],
  },
  {
    id: `${NPC_TYPE.COW}_DEFAULT`,
    dialogues: [
      {
        text: "muuuuuu...",
      },
    ],
  },
];
export function get_dialog_id(arr: any) {
  let dialog_type = arr.properties.find(
    (prop: any) => prop.name === TILED_OBJECT_PROPS.DIALOG_ID
  );

  if (!dialog_type) return "DEFAULT";

  return dialog_type.value;
}
class DialogManager {
  dialogues = [];
  currentDialogIndex = 0;

  constructor() {}

  init() {}

  reset() {
    this.currentDialogIndex = 0;
    this.dialogues = [];
  }
  start(scene_dialogues: any, dialog_id: string) {
    this.reset();
    this.dialogues = this.find_dialog(scene_dialogues, dialog_id);

    this.talk();
  }
  find_dialog(scene_dialogues: any, dialog_id: string) {
    let dialog = scene_dialogues.find((d: any) => d.id === dialog_id);

    if (!dialog) {
      const not_dialog: any = default_dialogs.find((d) => d.id === dialog_id);
      return not_dialog.dialogues;
    }
    return dialog.dialogues;
  }
  talk() {
    const { actor, text }: any = this.dialogues[this.currentDialogIndex];
    const last = this.currentDialogIndex === this.dialogues.length - 1;

    uiManager.display_dialog(actor, text, last);
  }
  continue() {
    this.currentDialogIndex++;
    if (this.currentDialogIndex < this.dialogues.length) {
      this.talk();
    } else {
      gameManager.stop_talking();
    }
  }
}

const dialogManager = new DialogManager();

export { dialogManager };
