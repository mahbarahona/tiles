import {
  Actor,
  Animation,
  CollisionType,
  Engine,
  SpriteSheet,
  range,
} from 'excalibur';
import { NPC_TYPE } from '../models';
import { assetManager } from '../managers/asset.manager';

enum CHICKEN_ANIM {
  IDLE = 'CHICKEN_IDLE',
  WALK = 'CHICKEN_WALK',
}
enum COW_ANIM {
  IDLE = 'COW_IDLE',
  WALK = 'COW_WALK',
}

export class NPC extends Actor {
  type: NPC_TYPE;
  constructor({ x, y, width, height, type, color }: any) {
    super({
      x,
      y,
      width,
      height,
      z: 100,
      collisionType: CollisionType.Fixed,
    });
    this.type = type;
  }
  onInitialize(engine: Engine): void {
    switch (this.type) {
      case NPC_TYPE.CHICKEN:
        const chicken_sprite = SpriteSheet.fromImageSource({
          image: assetManager.images.chicken,
          grid: {
            rows: 2,
            columns: 4,
            spriteWidth: 16,
            spriteHeight: 16,
          },
        });
        const chicken_anim_idle = Animation.fromSpriteSheet(
          chicken_sprite,
          range(0, 1),
          Math.random() * 1000 + 200
        );
        const chicken_anim_walk = Animation.fromSpriteSheet(
          chicken_sprite,
          range(4, 7),
          300
        );
        this.graphics.add(CHICKEN_ANIM.IDLE, chicken_anim_idle);
        this.graphics.add(CHICKEN_ANIM.WALK, chicken_anim_walk);
        this.graphics.use(CHICKEN_ANIM.WALK);
        this.graphics.use(CHICKEN_ANIM.IDLE);
        break;
      case NPC_TYPE.COW:
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
        this.graphics.use(COW_ANIM.WALK);
        this.graphics.use(COW_ANIM.IDLE);
        break;
    }
  }
}
