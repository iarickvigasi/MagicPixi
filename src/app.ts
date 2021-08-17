import * as PIXI from 'pixi.js';
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import Game from './game';
import SceneManager from './scenes/SceneManager';
import Resizer from './utils/Resizer';

const CONFIG = {
  resolution: devicePixelRatio,
  backgroundColor: 0xd3b28b,
  resizeTo: window,
};


class App extends PIXI.Application {
  public sceneManager: SceneManager | undefined;

  public tarotSprites: PIXI.Sprite[];

  private game: Game | undefined;

  public tweenManager: tween.TweenManager;

  constructor() {
    super(CONFIG);
    this.setupResize();
    this.injectIntoBody();
    this.registerPixiInspector();
    this.loadAssets();
    this.configureTween();

    this.loader.onComplete.add(() => {
      global.window.Application = this;
      this.game = new Game();
      this.sceneManager = new SceneManager(this.game);
      this.runGame();
    });
  }

  private injectIntoBody() {
    document.body.appendChild(this.view);
  }

  private loadAssets() {
    this.loader.add('close_idle', 'assets/img/close_idle.png')
      .add('assets/img/tarot_spritesheet.json');
    this.loader.load((_, resources) => {
      this.createTarotSprites(resources["assets/img/tarot_spritesheet.json"].spritesheet);
    });
  }

  private runGame() {
    console.log('Run Game')
    this.stage.addChild(this.game);
    this.sceneManager?.loadMenu();
  }

  private setupResize() {
    window.addEventListener('resize', () => this.onResize());
    this.onResize();
  }

  onResize() {
    // const scale = Resizer.getScale();
    // this.renderer.resize(
    //   Math.ceil(window.innerWidth * scale),
    //   Math.ceil(window.innerHeight * scale)
    // );
    // this.view.style.width = `${window.innerWidth}px`;
    // this.view.style.height = `${window.innerHeight}px`;
  }

  registerPixiInspector = () => {
    // eslint-disable-next-line max-len,no-underscore-dangle,no-unused-expressions
    (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ && (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI });
  };

  private createTarotSprites(spritesheet: PIXI.Spritesheet) {
    const keys = Object.keys(spritesheet.textures);
    this.tarotSprites = keys.map((key) => {
      const sprite = new PIXI.Sprite(spritesheet.textures[key]);
      return sprite;
    });
  }

  private configureTween() {
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);
  }
}

declare global {
  interface Window {
    Application: App;
  }
}
const app = new App();
