import { SCENE_STATE, player_tools } from '../models';
import { gameManager } from './game.manager';

class UIManager {
  game_container: any;
  btn_play: any;
  tools_container: any;
  constructor() {
    this.game_container = document.getElementById('game');
    this.btn_play = document.getElementById('btn_play');
    this.tools_container = document.getElementById('tools_container');
  }

  init() {
    this.btn_play.onclick = () => gameManager.start_game();
  }
  update_state(state: SCENE_STATE | 'DONE') {
    this.game_container.className = state;
  }
  update_tools(active = '') {
    this.tools_container.innerHTML = '';
    player_tools.forEach((tool) => {
      const div = document.createElement('div');
      div.classList.add('tool');
      div.innerHTML = `
        <div class="${tool}"></div>
      `;
      if (tool === active) {
        div.classList.add('active');
      }
      this.tools_container.appendChild(div);
    });
  }
}

export const uiManager = new UIManager();
