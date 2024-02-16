import { MENU, PLAYER_STATE, SCENE_STATE, PLAYER_TOOLS, MAPS } from "../models";
import { audioManager } from "./audio.manager";
import { dataManager } from "./data.manager";
import { gameManager } from "./game.manager";

class UIManager {
  game_container: any;
  game_slots_container: any;
  main_menu_buttons: any;
  btn_play: any;
  btn_continue: any;
  //
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
    // {
    //   name: "Collectives",
    //   value: MENU.COLLECTIVES,
    // },
    // {
    //   name: "Items",
    //   value: MENU.ITEMS,
    // },
    // {
    //   name: "Map",
    //   value: MENU.MAP,
    // },
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
    this.game_slots_container = document.getElementById("game_slots");
    //
    this.main_menu_buttons = document.getElementById("buttons");
    this.btn_play = document.getElementById("btn_play");
    this.btn_continue = document.getElementById("btn_continue");
    //
    this.setting_music_buttons = document.querySelectorAll(".btn_toggle_music");
    //

    this.menu_items_container = document.getElementById("menu_items_container");
    this.menu_ingame = document.getElementById("menu_ingame");
    this.menu_window = document.getElementById("menu_window");
    this.menu_icon = document.getElementById("menu_icon");
    this.menu_close_btn = document.querySelectorAll(".menu_close");
    //
    this.tools_container = document.getElementById("tools_container");
    this.dialog_container = document.getElementById("dialog_container");
  }

  init() {
    this.init_main_menu();
    this.init_menu();
    this.init_settings();
    this.init_keyboard_feedback();
  }
  update_state(state: SCENE_STATE) {
    this.game_container.className = state;
  }
  private init_keyboard_feedback() {
    const key_m: any = document.querySelector(".key.m");
    const key_esc: any = document.querySelector(".key.esc");
    const key_space: any = document.querySelector(".key.space");
    const key_up: any = document.querySelector(".key.up");
    const key_down: any = document.querySelector(".key.down");
    const key_left: any = document.querySelector(".key.left");
    const key_right: any = document.querySelector(".key.right");

    document.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "KeyM":
          key_m.classList.remove("active");
          break;
        case "Escape":
          key_esc.classList.remove("active");
          break;
        case "Space":
          key_space.classList.remove("active");
          break;
        //
        case "ArrowUp":
        case "KeyW":
          key_up.classList.remove("active");
          break;
        case "ArrowDown":
        case "KeyS":
          key_down.classList.remove("active");
          break;
        case "ArrowLeft":
        case "KeyA":
          key_left.classList.remove("active");
          break;
        case "ArrowRight":
        case "KeyD":
          key_right.classList.remove("active");
          break;
      }
    });
    document.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "KeyM":
          key_m.classList.add("active");
          break;
        case "Escape":
          key_esc.classList.add("active");
          break;
        case "Space":
          key_space.classList.add("active");
          break;
        //
        case "ArrowUp":
        case "KeyW":
          key_up.classList.add("active");
          break;
        case "ArrowDown":
        case "KeyS":
          key_down.classList.add("active");
          break;
        case "ArrowLeft":
        case "KeyA":
          key_left.classList.add("active");
          break;
        case "ArrowRight":
        case "KeyD":
          key_right.classList.add("active");
          break;
        //
      }
    });
  }
  private init_menu() {
    //
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

    this.update_menu();
  }
  init_main_menu() {
    this.hide_slots();
    this.btn_play.onclick = () => this.show_slots();
    this.update_btn_play();
  }
  private update_btn_play() {
    const slots = dataManager.data.slots.filter((s: any) => Boolean(s.data));
    const have_slots = slots.length > 0;

    if (have_slots) {
      this.btn_play.innerText = "Continue";
    } else {
      this.btn_play.innerText = "New Game";
    }
  }
  private create_slots() {
    const slots_container = this.game_slots_container.querySelector(".slots");
    slots_container.innerHTML = "";
    dataManager.data.slots.forEach((slot: any) => {
      const slot_div = document.createElement("div");
      slot_div.classList.add("slot");
      slot_div.classList.add("empty");

      let slot_detail = "empty";
      if (slot.data) {
        slot_detail = this.format_slot_date(slot.data.ts);
        slot_div.classList.remove("empty");
        slot_div.innerHTML = `
        <p>${slot.name}</p>
        <p class="date"><small>${slot_detail}</small></p>
        <div class="actions">
            <button class="btn_action" id="action_play">Play</button>
            <button class="btn_action" id="action_delete">Delete</button>
        </div>
       `;
        const action_play: any = slot_div.querySelector("#action_play");
        const action_delete: any = slot_div.querySelector("#action_delete");

        action_play!.onclick = () => {
          gameManager.start_game(slot.id);
          this.hide_slots();
        };
        action_delete!.onclick = () => {
          dataManager.delete_slot(slot.id);
          this.create_slots();
        };
      } else {
        slot_div.innerHTML = `
        <p>${slot.name}</p>
        <p class="date"><small>${slot_detail}</small></p>
       `;
        slot_div!.onclick = () => {
          gameManager.start_game(slot.id);
          this.hide_slots();
        };
      }
      slots_container.appendChild(slot_div);
    });

    const close_slots = this.game_slots_container.querySelector(".close-slots");
    close_slots.onclick = () => this.hide_slots();
  }
  private show_slots() {
    this.create_slots();
    this.game_slots_container.style.display = "flex";
  }
  private hide_slots() {
    this.update_btn_play();
    this.game_slots_container.style.display = "none";
  }
  private format_slot_date(ts: number) {
    const d = new Date(ts).toUTCString();
    const [_weekday, day, month, _year, time, _gmt] = d.split(" ");

    return `${month} ${day} ${time}`;
  }
  private init_settings() {
    this.setting_music_buttons.forEach((btn: any) => {
      if (dataManager.data.preferences.mute) {
        btn.classList.add("off");
      }
      btn.onclick = () => {
        audioManager.toggleMute();
        this.update_settings();
      };
    });
  }
  update_settings() {
    this.setting_music_buttons.forEach((btn: any) => {
      if (dataManager.data.preferences.mute) {
        btn.classList.add("off");
      } else {
        btn.classList.remove("off");
      }
    });
  }
  // tools
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
  // dialogues
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
  // menu
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
}

export const uiManager = new UIManager();
