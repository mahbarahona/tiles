import { Engine, Scene } from 'excalibur';
import { Player } from '../actors/player.actor';
import { assetManager } from '../managers/asset.manager';

export class Level extends Scene {
  name: string;
  map_name: string;
  map: any;
  player!: Player;
  constructor(config: any) {
    super();
    this.name = config.name;
    this.map_name = config.map;
  }
  onInitialize(engine: Engine): void {
    this.map = assetManager.maps[this.map_name];
    const player_layer = this.map.data.getObjectLayerByName('player');
    const player_tile = player_layer.objects.find((obj: any) => obj.id === 2);

    this.player = new Player({
      x: player_tile.x,
      y: player_tile.y,
    });

    // TODO
    // const map_width = this.map.data.width * this.map.data.tileWidth;
    // const map_height = this.map.data.height * this.map.data.tileHeight;
    // const map_bounds = BoundingBox.fromDimension(
    //   map_width,
    //   map_height,
    //   Vector.Zero,
    //   this.map.pos
    // );
    // console.log(map_bounds);
    // this.camera.strategy.limitCameraBounds(map_bounds);
    this.camera.strategy.lockToActor(this.player);
    this.camera.zoom = 2;
    this.map.addTiledMapToScene(engine);
    this.add(this.player);
  }
}
