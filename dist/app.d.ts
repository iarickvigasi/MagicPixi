import * as PIXI from 'pixi.js';
import SceneManager from './scenes/SceneManager';
declare class App extends PIXI.Application {
    sceneManager: SceneManager | undefined;
    tarotSprites: PIXI.Sprite[];
    fantasyIcons: PIXI.Sprite[];
    private game;
    constructor();
    private injectIntoBody;
    private loadAssets;
    private runGame;
    private setupResize;
    registerPixiInspector: () => void;
    private createSprites;
    private createTarotSprites;
    private createIconSprites;
    private configureTween;
}
declare global {
    interface Window {
        Application: App;
    }
}
export {};
