import {
  Actor,
  ActorArgs,
  Animation,
  CollisionType,
  Engine,
  Input,
  SpriteSheet,
  range,
} from 'excalibur';
import { assetManager } from '../managers/asset.manager';

const ANIM = {
  IDLE_FRONT: 'IDLE_FRONT',
  IDLE_LEFT: 'IDLE_LEFT',
  IDLE_RIGHT: 'IDLE_RIGHT',
  IDLE_BACK: 'IDLE_BACK',
  WALK_FRONT: 'WALK_IDLE',
  WALK_BACK: 'WALK_BACK',
  WALK_LEFT: 'WALK_LEFT',
  WALK_RIGHT: 'WALK_RIGHT',
  SHOVEL_FRONT: 'SHOVEL_FRONT',
  SHOVEL_BACK: 'SHOVEL_BACK',
  PICKAXE_LEFT: 'PICKAXE_LEFT',
  PICKAXE_RIGHT: 'PICKAXE_RIGHT',
  AXE_FRONT: 'AXE_FRONT',
  AXE_BACK: 'AXE_BACK',
  AXE_LEFT: 'AXE_LEFT',
  AXE_RIGHT: 'AXE_RIGHT',
  WATERING_CAN_FRONT: 'WATERING_CAN_FRONT',
  WATERING_CAN_BACK: 'WATERING_CAN_BACK',
  WATERING_CAN_LEFT: 'WATERING_CAN_LEFT',
  WATERING_CAN_RIGHT: 'WATERING_CAN_RIGHT',
};

function get_animations() {
  // sprites
  const sprite_movements = SpriteSheet.fromImageSource({
    image: assetManager.images.character,
    grid: {
      rows: 4,
      columns: 4,
      spriteWidth: 48,
      spriteHeight: 48,
    },
  });
  const sprite_actions = SpriteSheet.fromImageSource({
    image: assetManager.images.character_actions,
    grid: {
      rows: 12,
      columns: 2,
      spriteWidth: 48,
      spriteHeight: 48,
    },
  });
  const anim_idle_front = Animation.fromSpriteSheet(
    sprite_movements,
    range(0, 1),
    400
  );
  const anim_idle_back = Animation.fromSpriteSheet(
    sprite_movements,
    range(4, 5),
    400
  );
  const anim_idle_left = Animation.fromSpriteSheet(
    sprite_movements,
    range(8, 9),
    400
  );
  const anim_idle_right = Animation.fromSpriteSheet(
    sprite_movements,
    range(12, 13),
    400
  );

  // movements
  const anim_walk_front = Animation.fromSpriteSheet(
    sprite_movements,
    range(0, 3),
    200
  );
  const anim_walk_back = Animation.fromSpriteSheet(
    sprite_movements,
    range(4, 7),
    200
  );
  const anim_walk_left = Animation.fromSpriteSheet(
    sprite_movements,
    range(8, 11),
    200
  );
  const anim_walk_right = Animation.fromSpriteSheet(
    sprite_movements,
    range(12, 15),
    200
  );
  //shovel
  const anim_shovel_front = Animation.fromSpriteSheet(
    sprite_actions,
    range(0, 1),
    300
  );
  const anim_shovel_back = Animation.fromSpriteSheet(
    sprite_actions,
    range(2, 3),
    300
  );
  // pickaxe
  const anim_pickaxe_left = Animation.fromSpriteSheet(
    sprite_actions,
    range(4, 5),
    300
  );
  const anim_pickaxe_right = Animation.fromSpriteSheet(
    sprite_actions,
    range(6, 7),
    300
  );
  //axe
  const anim_axe_front = Animation.fromSpriteSheet(
    sprite_actions,
    range(8, 9),
    300
  );
  const anim_axe_back = Animation.fromSpriteSheet(
    sprite_actions,
    range(10, 11),
    300
  );
  const anim_axe_left = Animation.fromSpriteSheet(
    sprite_actions,
    range(12, 13),
    300
  );
  const anim_axe_right = Animation.fromSpriteSheet(
    sprite_actions,
    range(14, 15),
    300
  );
  // watering
  const anim_watering_can_front = Animation.fromSpriteSheet(
    sprite_actions,
    range(16, 17),
    300
  );
  const anim_watering_can_back = Animation.fromSpriteSheet(
    sprite_actions,
    range(18, 19),
    300
  );
  const anim_watering_can_left = Animation.fromSpriteSheet(
    sprite_actions,
    range(20, 21),
    300
  );
  const anim_watering_can_right = Animation.fromSpriteSheet(
    sprite_actions,
    range(22, 23),
    300
  );

  return {
    anim_idle_front,
    anim_idle_back,
    anim_idle_left,
    anim_idle_right,
    //
    anim_walk_front,
    anim_walk_back,
    anim_walk_left,
    anim_walk_right,
    //
    anim_shovel_front,
    anim_shovel_back,
    //
    anim_pickaxe_left,
    anim_pickaxe_right,
    //
    anim_axe_front,
    anim_axe_back,
    anim_axe_left,
    anim_axe_right,
    //
    anim_watering_can_front,
    anim_watering_can_back,
    anim_watering_can_left,
    anim_watering_can_right,
  };
}
let player_instance: Player | null = null;

enum FACING {
  FRONT = 'FRONT',
  BACK = 'BACK',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}
export class Player extends Actor {
  public health: number = 20;
  private current_anim: any;
  private facing!: FACING;
  public current_tool =
    'axe' || 'wateringcan' || 'axe' || 'pickaxe' || 'shovel';
  public in_action = false;

  constructor({ x, y }: ActorArgs) {
    if (player_instance) {
      return player_instance;
    }

    super({
      name: 'Player',
      x,
      y,
      width: 16,
      height: 16,
      collisionType: CollisionType.Active,
      z: 100,
    });
    this.facing = FACING.FRONT;
    player_instance = this;
  }
  onInitialize(engine: Engine): void {
    this.set_animations();
    this.set_anim(ANIM.IDLE_FRONT);
  }
  set_anim(new_anim: any) {
    this.current_anim = new_anim;
    this.graphics.use(new_anim);
  }

  onPreUpdate(engine: Engine): void {
    if (this.in_action) return;
    this.update_movement(engine);
    const keyboard = engine.input.keyboard;
    const prev_anim = this.current_anim;

    if (keyboard.wasReleased(Input.Keys.Space)) {
      this.in_action = true;

      switch (this.current_tool) {
        case 'shovel':
          if (this.current_anim === ANIM.WALK_BACK) {
            this.set_anim(ANIM.SHOVEL_BACK);
          } else {
            this.set_anim(ANIM.SHOVEL_FRONT);
          }

          setTimeout(() => {
            this.set_anim(prev_anim);
            this.in_action = false;
          }, 300 * 4);
          break;

        case 'axe':
          switch (this.facing) {
            case FACING.BACK:
              this.set_anim(ANIM.AXE_BACK);
              break;
            case FACING.FRONT:
              this.set_anim(ANIM.AXE_FRONT);
              break;

            case FACING.LEFT:
              this.set_anim(ANIM.AXE_LEFT);
              break;

            case FACING.RIGHT:
              this.set_anim(ANIM.AXE_RIGHT);
              break;
            default:
              console.warn(this.current_anim);
              console.log(this.graphics.getNames());
              break;
          }

          setTimeout(() => {
            this.set_anim(prev_anim);
            this.in_action = false;
          }, 300 * 4);
          break;

        case 'wateringcan':
          switch (this.current_anim) {
            case ANIM.WALK_BACK:
              this.set_anim(ANIM.WATERING_CAN_BACK);
              break;
            case ANIM.WALK_FRONT:
              this.set_anim(ANIM.WATERING_CAN_FRONT);
              break;
            case ANIM.WALK_LEFT:
              this.set_anim(ANIM.WATERING_CAN_LEFT);
              break;
            case ANIM.WALK_RIGHT:
              this.set_anim(ANIM.WATERING_CAN_RIGHT);
              break;
            default:
              console.warn(this.current_anim);
              break;
          }

          setTimeout(() => {
            this.set_anim(prev_anim);
            this.in_action = false;
          }, 300 * 4);
          break;
      }
    }
  }

  set_animations() {
    const animations = get_animations();
    this.graphics.add(ANIM.IDLE_FRONT, animations.anim_idle_front);
    this.graphics.add(ANIM.IDLE_BACK, animations.anim_idle_back);
    this.graphics.add(ANIM.IDLE_LEFT, animations.anim_idle_left);
    this.graphics.add(ANIM.IDLE_RIGHT, animations.anim_idle_right);
    // movements
    this.graphics.add(ANIM.WALK_FRONT, animations.anim_walk_front);
    this.graphics.add(ANIM.WALK_BACK, animations.anim_walk_back);
    this.graphics.add(ANIM.WALK_LEFT, animations.anim_walk_left);
    this.graphics.add(ANIM.WALK_RIGHT, animations.anim_walk_right);
    // shovel
    this.graphics.add(ANIM.SHOVEL_FRONT, animations.anim_shovel_front);
    this.graphics.add(ANIM.SHOVEL_BACK, animations.anim_shovel_back);
    // pickaxe
    this.graphics.add(ANIM.PICKAXE_LEFT, animations.anim_pickaxe_left);
    this.graphics.add(ANIM.PICKAXE_RIGHT, animations.anim_pickaxe_right);
    // axe
    this.graphics.add(ANIM.AXE_FRONT, animations.anim_axe_front);
    this.graphics.add(ANIM.AXE_BACK, animations.anim_axe_back);
    this.graphics.add(ANIM.AXE_LEFT, animations.anim_axe_left);
    this.graphics.add(ANIM.AXE_RIGHT, animations.anim_axe_right);
    // watering can
    this.graphics.add(
      ANIM.WATERING_CAN_FRONT,
      animations.anim_watering_can_front
    );
    this.graphics.add(
      ANIM.WATERING_CAN_BACK,
      animations.anim_watering_can_back
    );
    this.graphics.add(
      ANIM.WATERING_CAN_LEFT,
      animations.anim_watering_can_left
    );
    this.graphics.add(
      ANIM.WATERING_CAN_RIGHT,
      animations.anim_watering_can_right
    );
  }
  update_movement(engine: Engine) {
    const keyboard = engine.input.keyboard;
    const WALKING_SPEED = 100; // 160

    this.vel.x = 0;
    this.vel.y = 0;
    if (keyboard.isHeld(Input.Keys.Left)) {
      this.vel.x = -1;
      this.facing = FACING.LEFT;
    }
    if (keyboard.isHeld(Input.Keys.Right)) {
      this.vel.x = 1;
      this.facing = FACING.RIGHT;
    }
    if (keyboard.isHeld(Input.Keys.Up)) {
      this.vel.y = -1;
      this.facing = FACING.BACK;
    }
    if (keyboard.isHeld(Input.Keys.Down)) {
      this.vel.y = 1;
      this.facing = FACING.FRONT;
    }

    // Normalize walking speed
    if (this.vel.x !== 0 || this.vel.y !== 0) {
      this.vel = this.vel.normalize();
      this.vel.x = this.vel.x * WALKING_SPEED;
      this.vel.y = this.vel.y * WALKING_SPEED;
      switch (this.facing) {
        case FACING.LEFT:
          this.graphics.use(ANIM.WALK_LEFT);
          break;
        case FACING.RIGHT:
          this.graphics.use(ANIM.WALK_RIGHT);
          break;
        case FACING.FRONT:
          this.graphics.use(ANIM.WALK_FRONT);
          break;
        case FACING.BACK:
          this.graphics.use(ANIM.WALK_BACK);
          break;
      }
    } else {
      switch (this.facing) {
        case FACING.LEFT:
          this.graphics.use(ANIM.IDLE_LEFT);
          break;
        case FACING.RIGHT:
          this.graphics.use(ANIM.IDLE_RIGHT);
          break;
        case FACING.FRONT:
          this.graphics.use(ANIM.IDLE_FRONT);
          break;
        case FACING.BACK:
          this.graphics.use(ANIM.IDLE_BACK);
          break;
      }
    }
  }
}
