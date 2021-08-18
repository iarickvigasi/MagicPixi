import { Container } from 'pixi.js';
export default class SceneManager {
    private mainStage;
    private scene;
    constructor(mainStage: Container);
    private loadScene;
    loadMenu(): void;
    loadCards(): void;
    loadMagicText(): void;
    loadFireballs(): void;
}
