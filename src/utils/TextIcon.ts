import * as PIXI from 'pixi.js';

type drawTextType = (text: string, x: number, y: number, maxWidth?: number) => void;

export default class TextIcon extends PIXI.Text {
  private icons: Record<string, PIXI.Sprite> = {};

  constructor(
    text: string,
    style?: PIXI.TextStyle,
    icons?: Record<string, PIXI.Sprite>,
  ) {
    super(text, style);

    if (icons) {
      this.icons = icons;
    }

    this.setContextMeasureText();
  }

  setContextMeasureText() {
    const { measureText } = this.context;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.context.measureText = (text) => {
      const keys = this.icons && Object.keys(this.icons);
      if (!keys || keys.length === 0) {
        return measureText.call(this.context, text);
      }

      let { width } = measureText.call(this.context, text);

      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const match = text.match(new RegExp(key, 'g'));

        if (match) {
          const icon = this.icons[key];
          const scale = this.getFontSize() / icon.texture.frame.height;
          width -= match.length * measureText.call(this.context, key).width;
          width += match.length * (icon.x + icon.width) * scale;
        }
      }

      return { width };
    };
  }

  updateText(respectDirty: boolean) {
    this.context.fillText = this.fillText.bind(this, true, this.context.fillText);
    this.context.strokeText = this.fillText.bind(this, false, this.context.strokeText);
    return super.updateText(respectDirty);
  }

  fillText = (
    drawIcon: boolean,
    superMethod: drawTextType,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
  ) => {
    const keys = this.icons && Object.keys(this.icons);

    if (!keys || keys.length === 0) {
      superMethod.call(this.context, text, x, y, maxWidth);
      return;
    }

    const splitter = '<><><><><><><><><><><><><>';
    const order: PIXI.Sprite[] = [];

    const parts = text
      .replace(new RegExp(keys.join('|'), 'g'), (match) => {
        order.push(this.icons[match]);
        return splitter;
      })
      .split(splitter);

    const fontSize = this.getFontSize();
    let mx = x;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (part) {
        superMethod.call(this.context, part, mx, y);
        mx += this.context.measureText(part).width;
      }

      const icon = order.shift();
      // eslint-disable-next-line no-continue
      if (!icon) continue;
      const { frame } = icon.texture;
      const scale = fontSize / frame.height;

      if (drawIcon) {
        const tx = mx + icon.x * scale;
        const ty = y - fontSize * 0.35 + (icon.y - icon.height * 0.5) * scale;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const source = icon.texture.baseTexture.source || icon.texture.baseTexture.resource.source;

        this.context.drawImage(
          source,
          frame.x,
          frame.y,
          frame.width,
          frame.height,
          tx,
          ty,
          frame.width * scale,
          frame.height * scale,
        );
      }

      mx += (icon.x + icon.width) * scale;
    }
  }

  getFontSize() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return parseInt(this.style.fontSize, 10);
  }
}
