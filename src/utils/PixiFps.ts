// Author https://github.com/yordan-kanchelov/pixi-fps/blob/master/src/app/pixi-fps.ts

import * as PIXI from 'pixi.js';
import TextStylesAdvisor from './TextStylesAdvisor';

export default class PixiFps extends PIXI.Container {
  private fpsTextField: PIXI.Text;

  private fpsTicker: PIXI.Ticker;

  private timeValues: number[];

  private lastTime: number;

  constructor(style?: PIXI.TextStyle) {
    super();

    const defaultStyle = TextStylesAdvisor();

    this.timeValues = [];
    this.lastTime = new Date().getTime();
    this.fpsTextField = new PIXI.Text('', { ...defaultStyle, ...style } as PIXI.TextStyle);
    this.fpsTextField.anchor.set(0.5);

    this.fpsTicker = new PIXI.Ticker();
    this.fpsTicker.add(() => {
      this.measureFPS();
    });
    this.fpsTicker.start();

    this.addChild(this.fpsTextField);
  }

  set style(style: PIXI.TextStyle) {
    this.fpsTextField.style = style;
  }

  private measureFPS(): void {
    const currentTime = new Date().getTime();
    this.timeValues.push(1000 / (currentTime - this.lastTime));

    if (this.timeValues.length === 30) {
      let total = 0;
      for (let i = 0; i < 30; i++) {
        total += this.timeValues[i];
      }

      this.fpsTextField.text = (total / 30).toFixed(0);

      this.timeValues.length = 0;
    }

    this.lastTime = currentTime;
  }
}
