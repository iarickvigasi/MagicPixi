import { Container, Text, Sprite } from 'pixi.js';
export default class Scene extends Container {
    headerText: Text;
    closeButton: Sprite;
    constructor();
    private addTitle;
    private addCloseButton;
    onResize(): void;
    handleCloseClick: () => void;
}
