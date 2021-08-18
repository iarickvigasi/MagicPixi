import * as PIXI from 'pixi.js';
declare type drawTextType = (text: string, x: number, y: number, maxWidth?: number) => void;
export default class TextIcon extends PIXI.Text {
    private icons;
    constructor(text: string, style?: PIXI.TextStyle, icons?: Record<string, PIXI.Sprite>);
    setContextMeasureText(): void;
    updateText(respectDirty: boolean): void;
    fillText: (drawIcon: boolean, superMethod: drawTextType, text: string, x: number, y: number, maxWidth: number) => void;
    getFontSize(): number;
}
export {};
