import { ImageFiltering, ImageSource, Loader, Sound } from 'excalibur';
import { TiledMapResource } from '@excaliburjs/plugin-tiled';

class AssetManager {
  loader!: Loader;
  images!: any;
  sounds!: any;
  maps!: any;

  constructor() {}
  init() {
    this.loader = new Loader();
    // this.loader.suppressPlayButton = true;

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
      chicken: new ImageSource(
        '/assets/Free Chicken Sprites.png',
        false,
        ImageFiltering.Pixel
      ),
      cow: new ImageSource(
        '/assets/Free Cow Sprites.png',
        false,
        ImageFiltering.Pixel
      ),
    };

    this.maps = {
      '003': new TiledMapResource('/bunny/003.tmx'),
      mainmenu: new TiledMapResource('/bunny/mainmenu.tmx'),
    };

    this.sounds = {
      '003': new Sound('/assets/music/apple_cider.Zane Little Music.ogg'),
      mainmenu: new Sound('/assets/music/shepherd_dog.Zane Little Music.wav'),
    };
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
      sound.volume = 0.1;
    }
  }
}

export const assetManager = new AssetManager();
