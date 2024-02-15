import { MENU, PLAYER_STATE, SCENE_STATE, PLAYER_TOOLS, MAPS } from "../models";
import { audioManager } from "./audio.manager";
import { gameManager } from "./game.manager";

class UIManager {
  game_container: any;
  btn_play: any;
  tools_container: any;
  dialog_container: any;
  //
  menu_items_container: any;
  menu_window: any;
  menu_icon: any;
  menu_ingame: any;
  menu_opened = false;
  menu_close_btn: any;
  current_menu_item = -1;
  menu_items = [
    {
      name: "Collectives",
      value: MENU.COLLECTIVES,
    },
    {
      name: "Items",
      value: MENU.ITEMS,
    },
    {
      name: "Map",
      value: MENU.MAP,
    },
    {
      name: "Settings",
      value: MENU.SETTINGS,
    },
    {
      name: "Exit Game",
      value: MENU.BACK_MAIN_MENU,
    },
    // {
    //   name: "Exit",
    //   value: MENU.EXIT,
    // },
  ];

  setting_music_buttons: any;
  constructor() {
    this.game_container = document.getElementById("game");
    this.btn_play = document.getElementById("btn_play");
    this.tools_container = document.getElementById("tools_container");
    this.dialog_container = document.getElementById("dialog_container");
    //
    this.setting_music_buttons = document.querySelectorAll(".btn_toggle_music");
    //
    this.menu_items_container = document.getElementById("menu_items_container");
    this.menu_ingame = document.getElementById("menu_ingame");
    this.menu_window = document.getElementById("menu_window");
    this.menu_icon = document.getElementById("menu_icon");
    this.menu_close_btn = document.querySelectorAll(".menu_close");
  }

  init() {
    this.btn_play.onclick = () => gameManager.start_game();
    const menu_header = this.menu_ingame.querySelector(".menu_header");
    menu_header.onclick = () => {
      this.close_menu();
    };
    this.menu_icon.onclick = () => {
      gameManager.scene_state.next(SCENE_STATE.MENU);
    };
    this.menu_close_btn.forEach((btn: any) => {
      btn.onclick = () => {
        this.cancel_menu();
      };
    });
    this.setting_music_buttons.forEach((btn: any) => {
      if (audioManager.mute) {
        btn.classList.add("off");
      }
      btn.onclick = () => {
        audioManager.toggleMute();
        if (audioManager.mute) {
          btn.classList.add("off");
        } else {
          btn.classList.remove("off");
        }
      };
    });
    this.update_menu();
  }
  update_state(state: SCENE_STATE | "DONE") {
    this.game_container.className = state;
  }
  update_tools(active = "") {
    this.tools_container.innerHTML = "";
    PLAYER_TOOLS.forEach((tool) => {
      const div = document.createElement("div");
      div.classList.add("tool");
      div.innerHTML = `
        <div class="${tool}"></div>
      `;
      if (tool === active) {
        div.classList.add("active");
      }
      this.tools_container.appendChild(div);
    });
  }

  display_dialog(
    _actor: "player" | "npc" = "player",
    text: string,
    last = false
  ) {
    // const avatar = this.dialog_container.querySelector(".avatar");
    // avatar.classList.add(actor);

    const text_container = this.dialog_container.querySelector(".text");
    text_container.classList.remove("last");

    text_container.innerText = text;
    if (last) {
      text_container.classList.add("last");
    }
  }
  update_menu() {
    this.menu_items_container.innerHTML = "";
    this.menu_items.forEach((item, i) => {
      const btn = document.createElement("button");
      btn.classList.add("menu_item");
      btn.name = i.toString();

      btn.innerText = item.name;
      if (i === this.current_menu_item) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
      btn.onclick = () => {
        this.current_menu_item = Number(btn.name);
        this.update_menu();
        this.open_submenu();
      };

      this.menu_items_container.appendChild(btn);
    });
  }
  // up/down
  menu_item_down() {
    this.current_menu_item++;
    if (this.current_menu_item > this.menu_items.length - 1) {
      this.current_menu_item = 0;
    }

    this.update_menu();
  }
  menu_item_up() {
    this.current_menu_item--;
    if (this.current_menu_item < 0) {
      this.current_menu_item = this.menu_items.length - 1;
    }
    this.update_menu();
  }

  //
  open_submenu() {
    const current = this.menu_items[this.current_menu_item];
    if (current.value === MENU.EXIT) {
      this.cancel_menu();
      return;
    } else if (current.value === MENU.BACK_MAIN_MENU) {
      this.current_menu_item = 0;
      this.cancel_menu();
      // this.update_menu();
      gameManager.go_to(MAPS.MAIN_MENU);
      return;
    }

    this.menu_window.classList = current.value;
    const menu_header = this.menu_window.querySelector(".menu_header");
    menu_header.innerText = current.name;
    const closeDiv = document.createElement("div");
    closeDiv.innerText = "x";
    closeDiv.classList.add("menu_close");
    closeDiv.onclick = () => this.cancel_menu();

    menu_header.appendChild(closeDiv);
    this.menu_window.style.display = "block";
    this.menu_opened = true;
  }
  close_menu() {
    this.close_submenu();
    gameManager.player.set_state(PLAYER_STATE.IDLE);
    gameManager.scene_state.next(SCENE_STATE.PLAYING);
    this.current_menu_item = -1;
  }
  cancel_menu() {
    console.log("cancel");
    if (this.menu_opened) {
      this.close_submenu();
    } else {
      this.close_menu();
    }
    this.update_menu();
  }
  close_submenu() {
    this.menu_window.style.display = "none";
    this.menu_opened = false;
    this.current_menu_item = -1;
  }
}

export const uiManager = new UIManager();
