import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import Game from './game';
import SceneManager from './scenes/SceneManager';

const CONFIG = {
  resolution: devicePixelRatio,
  backgroundColor: 0xd3b28b,
  resizeTo: window,
};

class App extends PIXI.Application {
  public sceneManager: SceneManager | undefined;

  public tarotSprites!: PIXI.Sprite[];

  public fantasyIcons!: PIXI.Sprite[];

  private game!: Game;

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
    this.loader.add('assets/img/close_idle.png')
      .add('assets/img/bar.png')
      .add('assets/imb/cube.png')
      .add('assets/img/tarot_spritesheet.json')
      .add('assets/img/fantasy_icons.json');

    this.loader.load((_, resources) => {
      this.createTarotSprites(resources['assets/img/tarot_spritesheet.json'].spritesheet);
      this.createIconSprites(resources['assets/img/fantasy_icons.json'].spritesheet);
    });
  }

  private runGame() {
    this.stage.addChild(this.game);
    this.sceneManager?.loadMenu();
  }

  private setupResize() {
    // window.addEventListener('resize', () => this.onResize());
    // this.onResize();
  }

  // onResize() {
  // const scale = Resizer.getScale();
  // this.renderer.resize(
  //   Math.ceil(window.innerWidth * scale),
  //   Math.ceil(window.innerHeight * scale)
  // );
  // this.view.style.width = `${window.innerWidth}px`;
  // this.view.style.height = `${window.innerHeight}px`;
  // }

  registerPixiInspector = () => {
    // eslint-disable-next-line max-len,no-underscore-dangle,no-unused-expressions
    (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ && (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI });
  };

  private createSprites(spritesheet: PIXI.Spritesheet) {
    const keys = Object.keys(spritesheet.textures);
    return keys.map((key) => {
      const sprite = new PIXI.Sprite(spritesheet.textures[key]);
      return sprite;
    });
  }

  private createTarotSprites(spritesheet: PIXI.Spritesheet) {
    this.tarotSprites = this.createSprites(spritesheet);
  }

  private createIconSprites(spritesheet: any) {
    this.fantasyIcons = this.createSprites(spritesheet);
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-new
new App();
