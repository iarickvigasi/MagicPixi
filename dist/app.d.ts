import * as PIXI from 'pixi.js';
import SceneManager from './scenes/SceneManager';
declare class App extends PIXI.Application {
    sceneManager: SceneManager | undefined;
    tarotSprites: PIXI.Sprite[];
    private game;
    constructor();
    private injectIntoBody;
    private loadAssets;
    private runGame;
    private setupResize;
    registerPixiInspector: () => void;
    private createTarotSprites;
    private configureTween;
}
declare global {
    interface Window {
        Application: App;
    }
}
export {};
