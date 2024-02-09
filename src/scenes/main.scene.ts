import { Color, Engine, Scene } from 'excalibur';
import { assetManager } from '../managers/asset.manager';

class MainMenu extends Scene {
  name = 'main-menu';
  map: any;
  onInitialize(engine: Engine): void {
    this.backgroundColor = Color.Azure;
    this.map = assetManager.maps.mainmenu;
    //
    this.map.addTiledMapToScene(engine);
    this.setup_camera()
  }
  private setup_camera(){
    this.camera.zoom = 1.2;
  }
}
const mainMenu = new MainMenu();
export { mainMenu };
