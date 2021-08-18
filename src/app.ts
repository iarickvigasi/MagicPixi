import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
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

  constructor() {
    super(CONFIG);
    this.setupOrientationChange();
    this.injectIntoBody();
    this.registerPixiInspector();
    this.configureTween();
    this.loadAssets();

    this.loader.onComplete.add(() => {
      global.window.Application = this;
      this.sceneManager = new SceneManager(this.stage);
      this.runGame();
    });
  }

  public isLandscape() {
    if (this.renderer.screen.width > this.renderer.screen.height) {
      return true;
    }
    return false;
  }

  private injectIntoBody() {
    document.body.appendChild(this.view);
  }

  private loadAssets() {
    this.loader.add('assets/img/close_idle.png')
      .add('assets/img/bar.png')
      .add('assets/img/smokeparticle.png')
      .add('assets/img/pixel50.png')
      .add('assets/imb/cube.png')
      .add('assets/img/tarot_spritesheet.json')
      .add('assets/img/fantasy_icons.json');

    this.loader.load((_, resources) => {
      this.createTarotSprites(resources['assets/img/tarot_spritesheet.json'].spritesheet);
      this.createIconSprites(resources['assets/img/fantasy_icons.json'].spritesheet);
    });
  }

  private runGame() {
    this.sceneManager?.loadMenu();
  }

  registerPixiInspector = () => {
    // eslint-disable-next-line max-len,no-underscore-dangle,no-unused-expressions
    (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ && (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({PIXI});
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

  private configureTween = () => {
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);
  }

  private setupOrientationChange = () => {
    window.addEventListener('orientationchange', () => {
      // @HACK: All resizing and scaling should be done in other way.
      window.location.reload();
    });

    window.addEventListener('resize', () => {
      // @HACK: All resizing and scaling should be done in other way.
      window.location.reload();
    });
  }
}

declare global {
  interface Window {
    Application: App;
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-new
new App();
