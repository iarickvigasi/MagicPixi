import * as PIXI from 'pixi.js';
export default class PixiFps extends PIXI.Container {
    private fpsTextField;
    private fpsTicker;
    private timeValues;
    private lastTime;
    constructor(style?: PIXI.TextStyle);
    set style(style: PIXI.TextStyle);
    private measureFPS;
}
