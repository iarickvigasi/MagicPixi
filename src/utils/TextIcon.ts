import * as PIXI from 'pixi.js';

export default class TextIcon extends PIXI.Container {
  private icons: Record<string, PIXI.Sprite> = {};

  protected text: string;

  protected style: PIXI.TextStyle | undefined;

  constructor(
    text: string,
    style?: PIXI.TextStyle,
    icons?: Record<string, PIXI.Sprite>,
  ) {
    super();
    this.text = text;
    this.style = style;

    if (icons) {
      this.icons = icons;
    }

    const keys = this.icons && Object.keys(this.icons);
    if (!keys || keys.length === 0) {
      const textObject = new PIXI.Text(this.text, this.style);
      this.addChild(textObject);
      return;
    }

    const keysRegex = new RegExp(keys.join('|'), 'g');
    const splitter = '<><><><><><><><><><><><><>';
    const order: PIXI.Sprite[] = [];

    const parts = this.text.replace(keysRegex, (match) => {
      order.push(this.icons[match]);
      return splitter;
    }).split(splitter);

    let mx = 0;
    const fontSize = this.getFontSize();

    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i];

      if (part) {
        const textOjbect = new PIXI.Text(part, this.style);
        this.addChild(textOjbect);
        textOjbect.x = mx;
        mx += textOjbect.getBounds().width;
      }

      // eslint-disable-next-line no-continue
      if (order.length === 0) continue;

      const icon = order.shift();
      // eslint-disable-next-line no-continue
      if (!icon) continue;
      const sprite = new PIXI.Sprite(icon.texture);
      const scale = fontSize / sprite.height;

      const tx = mx + 5;
      sprite.x = tx;
      sprite.y = sprite.height/2;
      sprite.scale.set(scale);
      this.addChild(sprite);
      mx += sprite.width + 5;
    }
  }

  getFontSize() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return parseInt(this.style.fontSize, 10);
  }
}
