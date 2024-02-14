import { Sound } from "excalibur";
import { assetManager } from "./asset.manager";
import { SONGS } from "../models";

class AudioManager {
  bg_music!: Sound;
  mute = false;
  init() {}

  play_bg(song_name: SONGS, loop = true) {
    if (this.bg_music) {
      this.bg_music.stop();
    }
    this.bg_music = assetManager.sounds[song_name];
    this.bg_music.loop = loop;
    this.bg_music.volume = this.mute ? 0 : 0.5;
    this.bg_music.play();
  }
  pause_bg() {
    this.bg_music.stop();
  }
  toggleMute() {
    this.mute = !this.mute;

    if (this.mute) {
      this.bg_music.volume = 0;
    } else {
      this.bg_music.volume = 0.5;
    }
  }
}
export const audioManager = new AudioManager();
