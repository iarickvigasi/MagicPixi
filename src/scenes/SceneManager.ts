import { Container } from 'pixi.js';
import MenuScene from './Menu';
import CardsScene from './Cards';
import MagicTextScene from './MagicText';

export default class SceneManager {
  private mainStage: Container;

  private scene: Container | null = null;

  constructor(mainStage: Container) {
    this.mainStage = mainStage;
  }

  public getScene() {
    return this.scene;
  }

  private loadScene(scene: Container) {
    this.scene && this.scene.destroy();
    this.scene = scene;
    this.mainStage.addChild(this.scene);
  }

  public loadMenu() {
    const menuScene = new MenuScene();
    this.loadScene(menuScene);
  }

  public loadCards() {
    const cardsScene = new CardsScene();
    this.loadScene(cardsScene);
  }

  public loadMagicText() {
    const magicTextScene = new MagicTextScene();
    this.loadScene(magicTextScene);
  }
}
