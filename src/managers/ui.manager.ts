import {
  MENU,
  PLAYER_STATE,
  SCENE_STATE,
  PLAYER_TOOLS,
  MAPS,
  LANGUAGES,
} from "../models";
import { audioManager } from "./audio.manager";
import { dataManager } from "./data.manager";
import { gameManager } from "./game.manager";
import {
  TEXT_CONTROLS,
  TEXT_CREDITS,
  TEXT_IN_GAME,
  TEXT_MAIN_MENU,
  TEXT_VIEWS,
  textManager,
} from "./text.manager";

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
    //   name: TEXT_IN_GAME.MENU_COLLECTABLES,
    //   value: MENU.COLLECTIVES,
    // },
    {
      name: TEXT_IN_GAME.MENU_ITEMS,
      value: MENU.ITEMS,
    },
    {
      name: TEXT_IN_GAME.MENU_MAPS,
      value: MENU.MAP,
    },
    {
      name: TEXT_IN_GAME.MENU_SETTINGS,
      value: MENU.SETTINGS,
    },
    {
      name: TEXT_IN_GAME.MENU_EXIT,
      value: MENU.BACK_MAIN_MENU,
    },
    // {
    //   name: "Exit",
    //   value: MENU.EXIT,
    // },
  ];

  setting_music_buttons: any;
  init() {
    // templates
    this.create_template_credits();
    this.create_template_game_controls();
    this.create_template_main_menu();
    this.create_template_playing();
    this.create_template_dialog();
    this.create_template_menu_in_game();
    // linker
    this.link_template_references();
    // inits
    this.init_main_menu();
    this.init_menu();
    this.init_settings();
    this.init_keyboard_feedback();
  }

  // templates
  private create_template_main_menu() {
    const main_menu_container: any = document.getElementById("main_menu");
    main_menu_container.innerHTML = `
    <div id="game_slots">
      <div class="slot_header">
        <h2>${textManager.text(
          TEXT_VIEWS.MAIN_MENU,
          TEXT_MAIN_MENU.SLOTS_TITLE
        )}</h2>
        <div class="close-slots">x</div>
      </div>
      <div class="slots"></div>
    </div>

    <div class="buttons" id="buttons">
      <button class="btn_main_menu" id="btn_play"></button>
    </div>
    <div class="settings" id="settings"></div>
    `;

    main_menu_container.appendChild(this.create_template_settings("main_menu"));
  }
  private create_template_settings(id_prefix: string) {
    const settings_div: any = document.createElement("div");
    settings_div.id = `${id_prefix}_settings`;
    settings_div.classList.add("settings");
    const current_lang = dataManager.data.preferences.lang;
    settings_div.innerHTML = `
    <div class="setting">
    <p>${textManager.text(
      TEXT_VIEWS.MAIN_MENU,
      TEXT_MAIN_MENU.SETTINGS_MUSIC
    )}</p>
    <button class="toggle btn_toggle_music"></button>
  </div>
   <div class="setting">
    <p>${textManager.text(
      TEXT_VIEWS.MAIN_MENU,
      TEXT_MAIN_MENU.SETTINGS_LANG
    )}</p>
    <button class="btn_lang ${
      current_lang === LANGUAGES.ENGLISH ? "active" : ""
    } " id="btn_lang_en">English</button>
    <button class="btn_lang ${
      current_lang === LANGUAGES.SPANISH ? "active" : ""
    } " id="btn_lang_es">Español</button>
  </div> 
    `;
    const btn_lang_en = settings_div.querySelector("#btn_lang_en");
    const btn_lang_es = settings_div.querySelector("#btn_lang_es");

    btn_lang_en.onclick = () => {
      if (dataManager.data.preferences.lang === LANGUAGES.ENGLISH) return;
      dataManager.set_language(LANGUAGES.ENGLISH);
      this.init();
    };
    btn_lang_es.onclick = () => {
      if (dataManager.data.preferences.lang === LANGUAGES.SPANISH) return;
      dataManager.set_language(LANGUAGES.SPANISH);
      this.init();
    };
    return settings_div;
  }
  private create_template_playing() {
    const playing_container: any = document.getElementById("playing");
    playing_container.innerHTML = `
        <div class="header"></div>
        <div id="menu_icon" class="menu_icon">
            <p>${textManager.text(TEXT_VIEWS.IN_GAME, TEXT_IN_GAME.MENU)}</p>
            <div>▼</div>
         </div>
        <div id="tools_container" class="tools" style="display: none"></div>
    `;
  }
  private create_template_dialog() {
    const dialog_container: any = document.getElementById("dialog_container");
    dialog_container.innerHTML = `
    <div class="avatar"></div>
        <div class="content">
        <div class="text"></div>
    </div>
    `;
  }
  private create_template_menu_in_game() {
    const menu_in_game: any = document.getElementById("menu_in_game");
    menu_in_game.innerHTML = `
    <div id="menu_ingame" class="menu">
    <div class="menu_header">
      <p>${textManager.text(TEXT_VIEWS.IN_GAME, TEXT_IN_GAME.MENU)}</p>
      <div class="menu_close">▲</div>
    </div>
    <ul id="menu_items_container"></ul>
  </div>
  <div id="menu_window" class="submenu">
    <div class="menu_header"></div>
    <div class="menu_content">
      <div class="collectives"></div>
      <div class="items"></div>
      <div class="map"></div>
      <div id="settings_container"></div>
    </div>
    <div class="menu_footer"></div>
  </div>
    `;

    const settings_container = menu_in_game.querySelector(
      "#settings_container"
    );
    settings_container.appendChild(this.create_template_settings("in_game"));
  }
  private create_template_credits() {
    const credit_container: any = document.getElementById("credits");
    credit_container.innerHTML = `
      <details>
      <summary>💖 ${textManager.text(
        TEXT_VIEWS.CREDITS,
        TEXT_CREDITS.TITLE
      )}</summary>
      <div class="content">
        <div>
          <div class="type">${textManager.text(
            TEXT_VIEWS.CREDITS,
            TEXT_CREDITS.CODE
          )}:</div>
          <ul>
            <li>
              <a href="https://github.com/mahbarahona/tiles" target="_blank">
              ${textManager.text(TEXT_VIEWS.CREDITS, TEXT_CREDITS.CODE)}
              </a>
              ${textManager.text(TEXT_VIEWS.CREDITS, TEXT_CREDITS.BY)}
              <a href="https://www.linkedin.com/in/manuhb-dev/">ManuHB</a>
            </li>
          </ul>
        </div>
        <br />
        <div>
          <p class="type">Sprites:</p>
  
          <ul>
            <li>
              "Sprout Lands" ${textManager.text(
                TEXT_VIEWS.CREDITS,
                TEXT_CREDITS.BY
              )}
              <a href="https://cupnooble.itch.io/" target="_blank">
                Cup Nooble
              </a>
            </li>
            <li>
              "Gamepad UI / Controller Prompts Pack" ${textManager.text(
                TEXT_VIEWS.CREDITS,
                TEXT_CREDITS.BY
              )}
              <a href="https://greatdocbrown.itch.io/" target="_blank">
                GreatDocBrown
              </a>
            </li>
            <!--  -->
          </ul>
        </div>
        <br />
        <div class="row">
          <div>
            <p class="type">${textManager.text(
              TEXT_VIEWS.CREDITS,
              TEXT_CREDITS.MUSIC
            )}:</p>
            <ul>
              <li>
                "Apple Cider" ${textManager.text(
                  TEXT_VIEWS.CREDITS,
                  TEXT_CREDITS.BY
                )}
                <a
                  href="https://opengameart.org/content/apple-cider"
                  target="_blank"
                >
                  Zane Little Music</a
                >
              </li>
              <li>
                "Shepherd Dog" ${textManager.text(
                  TEXT_VIEWS.CREDITS,
                  TEXT_CREDITS.BY
                )}
                <a
                  href="https://opengameart.org/content/shepherd-dog-day-13"
                  target="_blank"
                >
                  Zane Little Music</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </details>
      `;
  }
  private create_template_game_controls() {
    const game_controls_container: any = document.getElementById("controls");
    game_controls_container.innerHTML = `
      <div class="row">
      <div class="row">
        <div class="control">
          <div class="key esc"></div>
          <div class="desc">${textManager.text(
            TEXT_VIEWS.CONTROLS,
            TEXT_CONTROLS.CANCEL
          )}</div>
        </div>
        <div class="control">
          <div class="key m"></div>
          <div class="desc">${textManager.text(
            TEXT_VIEWS.CONTROLS,
            TEXT_CONTROLS.MENU
          )}</div>
        </div>
      </div>
      <div class="control movement">
        <div class="grid">
          <div class="key"></div>
          <div class="key up"></div>
          <div class="key"></div>
          <div class="key left"></div>
          <div class="key down"></div>
          <div class="key right"></div>
        </div>
        <div class="desc">${textManager.text(
          TEXT_VIEWS.CONTROLS,
          TEXT_CONTROLS.MOVEMENT
        )}</div>
      </div>
    </div>
    <div class="control">
      <div class="key space"></div>
      <div class="desc">${textManager.text(
        TEXT_VIEWS.CONTROLS,
        TEXT_CONTROLS.ACTION
      )}</div>
    </div>
      `;
  }
  // link template
  private link_template_references() {
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
  // inits
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
      this.btn_play.innerText = textManager.text(
        TEXT_VIEWS.MAIN_MENU,
        TEXT_MAIN_MENU.BTN_CONTINUE
      );
    } else {
      this.btn_play.innerText = textManager.text(
        TEXT_VIEWS.MAIN_MENU,
        TEXT_MAIN_MENU.BTN_NEW_GAME
      );
    }
  }
  private create_slots() {
    const slots_container = this.game_slots_container.querySelector(".slots");
    slots_container.innerHTML = "";
    dataManager.data.slots.forEach((slot: any, i: number) => {
      const slot_div = document.createElement("div");
      slot_div.classList.add("slot");
      slot_div.classList.add("empty");

      let slot_detail = textManager.text(
        TEXT_VIEWS.MAIN_MENU,
        TEXT_MAIN_MENU.SLOTS_EMPTY
      );
      if (slot.data) {
        slot_detail = this.format_slot_date(slot.data.ts);
        slot_div.classList.remove("empty");
        slot_div.innerHTML = `
        <p>${textManager.text(
          TEXT_VIEWS.MAIN_MENU,
          TEXT_MAIN_MENU.SLOTS_NAME
        )} #${i + 1}</p>
        <p class="date"><small>${slot_detail}</small></p>
        <div class="actions">
            <button class="btn_action" id="action_play">${textManager.text(
              TEXT_VIEWS.MAIN_MENU,
              TEXT_MAIN_MENU.SLOTS_BTN_PLAY
            )}</button>
            <button class="btn_action" id="action_delete">${textManager.text(
              TEXT_VIEWS.MAIN_MENU,
              TEXT_MAIN_MENU.SLOTS_BTN_DELETE
            )}</button>
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
        <p>${textManager.text(
          TEXT_VIEWS.MAIN_MENU,
          TEXT_MAIN_MENU.SLOTS_NAME
        )} #${i + 1}</p>
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

      btn.innerText = textManager.text(TEXT_VIEWS.IN_GAME, item.name);
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
      gameManager.go_to(MAPS.MAIN_MENU);
      return;
    }

    this.menu_window.classList = current.value;
    const menu_header = this.menu_window.querySelector(".menu_header");
    menu_header.innerText = textManager.text(TEXT_VIEWS.IN_GAME, current.name);
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
