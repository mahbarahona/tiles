import { ImageFiltering, ImageSource, Loader } from 'excalibur';
import { TiledMapResource } from '@excaliburjs/plugin-tiled';

class AssetManager {
  loader!: Loader;
  images!: any;
  sounds!: any;
  maps!: any;

  constructor() {}
  init() {
    this.loader = new Loader();
    this.loader.suppressPlayButton = true;
    this.loader.backgroundColor = 'black';
    //
    this.images = {
      character: new ImageSource(
        '/assets/Basic Charakter Spritesheet.png',
        false,
        ImageFiltering.Pixel
      ),
      character_actions: new ImageSource(
        '/assets/Basic Charakter Actions.png',
        false,
        ImageFiltering.Pixel
      ),
    };

    this.maps = {
      '002': new TiledMapResource('/bunny/002.tmx'),
      '003': new TiledMapResource('/bunny/003.tmx'),
    };

    this.sounds = {};
    //
    for (const key in this.images) {
      this.loader.addResource(this.images[key]);
    }
    for (const key in this.maps) {
      this.loader.addResource(this.maps[key]);
    }
    for (const key in this.sounds) {
      const sound = this.sounds[key];
      this.loader.addResource(sound);
      sound.volume = 0.2;
    }
  }
}

export const assetManager = new AssetManager();
