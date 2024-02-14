import { Player } from "../actors/player.actor";
import { MENU, PLAYER_STATE, SCENE_STATE, PLAYER_TOOLS } from "../models";
import { gameManager } from "./game.manager";

class UIManager {
  game_container: any;
  btn_play: any;
  tools_container: any;
  dialog_container: any;
  menu_items_container: any;
  menu_window: any;

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
      name: "Exit",
      value: MENU.EXIT,
    },
  ];
  menu_opened = false;
  current_menu_item = 0;

  constructor() {
    this.game_container = document.getElementById("game");
    this.btn_play = document.getElementById("btn_play");
    this.tools_container = document.getElementById("tools_container");
    this.dialog_container = document.getElementById("dialog_container");
    this.menu_items_container = document.getElementById("menu_items_container");
    this.menu_window = document.getElementById("menu_window");
  }

  init() {
    this.btn_play.onclick = () => gameManager.start_game();
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
      const li = document.createElement("li");
      li.classList.add("menu_item");
      li.innerText = item.name;
      if (i === this.current_menu_item) {
        li.classList.add("active");
      }
      this.menu_items_container.appendChild(li);
    });
  }
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
  open_menu(player: Player) {
    //
    const current = this.menu_items[this.current_menu_item];

    if (current.value === MENU.EXIT) {
      this.cancel_menu(player);
      return;
    }

    this.menu_window.classList = current.value;
    const menu_header = this.menu_window.querySelector(".menu_header");
    menu_header.innerText = current.name;

    this.menu_window.style.display = "block";
    this.menu_opened = true;
  }
  close_submenu() {
    this.menu_window.style.display = "none";
    this.menu_opened = false;
  }

  cancel_menu(player: Player) {
    console.log("cancel");
    if (this.menu_opened) {
      this.close_submenu();
    } else {
      // close
      player.player_state = PLAYER_STATE.IDLE;
      gameManager.scene_state.next(SCENE_STATE.PLAYING);
      this.current_menu_item = 0;
      this.update_menu();
    }
  }
}

export const uiManager = new UIManager();
