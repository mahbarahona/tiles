import { Actor, Animation, CollisionType, SpriteSheet, range } from "excalibur";
import { assetManager } from "../../managers/asset.manager";
import { NPC_TYPE } from "../../models";

enum COW_ANIM {
  IDLE = "COW_IDLE",
  WALK = "COW_WALK",
}
export class Cow extends Actor {
  type: NPC_TYPE;
  dialog_id: string;
  constructor({ x, y, z, width, height, dialog_id }: any) {
    super({
      x,
      y,
      z,
      width,
      height,
      collisionType: CollisionType.Fixed,
    });
    this.type = NPC_TYPE.COW;
    this.dialog_id = dialog_id;
  }
  onInitialize(): void {
    this.setup_graphics();
  }
  private setup_graphics() {
    const cow_sprite = SpriteSheet.fromImageSource({
      image: assetManager.images.cow,
      grid: {
        rows: 2,
        columns: 3,
        spriteWidth: 32,
        spriteHeight: 32,
      },
    });
    const cow_anim_idle = Animation.fromSpriteSheet(
      cow_sprite,
      range(0, 2),
      300
    );
    const cow_anim_walk = Animation.fromSpriteSheet(
      cow_sprite,
      range(4, 5),
      300
    );
    this.graphics.add(COW_ANIM.IDLE, cow_anim_idle);
    this.graphics.add(COW_ANIM.WALK, cow_anim_walk);
    // this.graphics.use(COW_ANIM.WALK);
    this.graphics.use(COW_ANIM.IDLE);
  }
}
