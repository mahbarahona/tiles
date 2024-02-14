import { BoundingBox, Color, Engine, Scene, Sound, Vector } from "excalibur";
import { Player } from "../actors/player.actor";
import { assetManager } from "../managers/asset.manager";
import {
  ACTOR_TYPE,
  NPC_TYPE,
  SCENE_EVENTS,
  SONGS,
  TILED_OBJECT,
  TILED_OBJECT_PROPS,
} from "../models";
import { eventBus } from "../managers/game.manager";
import { Chicken } from "../actors/NPC/chicken.actor";
import { Cow } from "../actors/NPC/cow.actor";
import { get_dialog_id } from "../managers/dialog.manager";
import { SceneArea } from "../actors/Areas/scene-area.actor";

export class Level extends Scene {
  name: string;
  map_name: string;
  song: SONGS;
  map: any;
  player!: Player;
  music!: Sound;
  areas: any;
  dialogues = [];
  constructor(config: any) {
    super();
    this.name = config.name;
    this.map_name = config.map;
    this.song = config.song;
    this.dialogues = config.dialogues;
  }
  onInitialize(engine: Engine): void {
    this.backgroundColor = Color.Black;
    this.map = assetManager.maps[this.map_name];
    this.map.addTiledMapToScene(engine);
    const map_width = this.map.data.width * this.map.data.tileWidth;
    const map_height = this.map.data.height * this.map.data.tileHeight;

    this.create_scene_areas();
    this.create_chickens();
    this.create_cows();
    this.create_player(map_width, map_height);
    this.setup_camera(map_width, map_height);
  }
  onDeactivate(): void {
    // this.music.stop();
  }
  private create_scene_areas() {
    //
    const switch_scene_area = this.map.data.getObjectLayerByName(
      TILED_OBJECT.SCENE_AREA
    );
    if (switch_scene_area) {
      switch_scene_area.objects.forEach((zone: any) => {
        //
        const scene = zone.properties.find(
          (prop: any) => prop.name === TILED_OBJECT_PROPS.SCENE
        );
        // console.log({ scene });
        const newZone = new SceneArea({
          x: zone.x + zone.width / 2,
          y: zone.y + zone.height / 2,
          name: ACTOR_TYPE.SCENE_NEXT,
          width: zone.width,
          height: zone.height,
          toScene: scene.value,
          // color: Color.Green,
        });
        this.add(newZone);
      });
    }
  }
  private create_chickens() {
    const chicken_layer = this.map.data.getObjectLayerByName("chickens");
    if (chicken_layer) {
      chicken_layer.objects.forEach((mark: any, i: number) => {
        const dialog_id = `${NPC_TYPE.CHICKEN}_${get_dialog_id(mark)}`;
        const chicken = new Chicken({
          x: mark.x,
          y: mark.y,
          width: 16,
          height: 16,
          color: Color.White,
          dialog_id,
        });
        chicken.graphics.flipHorizontal = i % 2 === 0;

        this.add(chicken);
      });
    }
  }
  private create_cows() {
    const cows_layer = this.map.data.getObjectLayerByName("cows");
    if (cows_layer) {
      cows_layer.objects.forEach((mark: any, i: number) => {
        const dialog_id = `${NPC_TYPE.COW}_${get_dialog_id(mark)}`;
        const cow = new Cow({
          x: mark.x,
          y: mark.y,
          width: 16,
          height: 16,
          color: Color.Chartreuse,
          dialog_id,
        });
        cow.graphics.flipHorizontal = i % 2 === 0;
        this.add(cow);
      });
    }
  }
  private create_player(map_width: number, map_height: number) {
    const player_layer = this.map.data.getObjectLayerByName("player");
    if (player_layer) {
      const player_tile = player_layer.objects[0];
      // console.log(player_tile.objects);
      this.player = new Player({
        x: player_tile.x,
        y: player_tile.y,
        z: 20,
        map_bounds: { right: map_width, bottom: map_height },
      });
      eventBus.emit(SCENE_EVENTS.SWITCH_TOOL, this.player.current_tool);
      this.add(this.player);
      this.camera.strategy.lockToActor(this.player);
    }
  }
  private setup_camera(map_width: number, map_height: number) {
    const map_bounds = BoundingBox.fromDimension(
      map_width,
      map_height,
      Vector.Zero,
      this.map.pos
    );
    this.camera.strategy.limitCameraBounds(map_bounds);
    this.camera.zoom = 2;
  }
}
