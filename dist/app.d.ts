import * as PIXI from 'pixi.js';
import SceneManager from './scenes/SceneManager';
declare class App extends PIXI.Application {
    sceneManager: SceneManager | undefined;
    tarotSprites: PIXI.Sprite[];
    fantasyIcons: PIXI.Sprite[];
    constructor();
    isLandscape(): boolean;
    private injectIntoBody;
    private loadAssets;
    private runGame;
    registerPixiInspector: () => void;
    private createSprites;
    private createTarotSprites;
    private createIconSprites;
    private configureTween;
    private setupOrientationChange;
}
declare global {
    interface Window {
        Application: App;
    }
}
export {};
