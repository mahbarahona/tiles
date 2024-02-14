import { Actor, CollisionType } from "excalibur";

export class SceneArea extends Actor {
  toScene!: string;
  activated = true;
  constructor({ x, y, name, width, height, color, z, toScene }: any) {
    super({
      x,
      y,
      name,
      width,
      height,
      color,
      z,
      collisionType: CollisionType.Passive,
    });
    this.toScene = toScene;
  }
}
