import * as PIXI from 'pixi.js';
export default class TextIcon extends PIXI.Container {
    private icons;
    protected text: string;
    protected style: PIXI.TextStyle | undefined;
    constructor(text: string, style?: PIXI.TextStyle, icons?: Record<string, PIXI.Sprite>);
    getFontSize(): number;
}
