import { Container, Text } from 'pixi.js';
import decorate from '../utils/Decorate';
import TextStylesAdvisor from '../utils/TextStylesAdvisor';

export default class MenuScene extends Container {
  constructor() {
    super();
    this.generateButtons();
    decorate(this);
  }

  private generateButtons() {
    [
      { label: '144 Moving Cards', onClick: () => global.window.Application.sceneManager?.loadCards() },
      { label: 'Fantasy Image Text', onClick: () => global.window.Application.sceneManager?.loadMagicText() },
      { label: 'Fireballs!', onClick: () => global.window.Application.sceneManager?.loadFireballs() },
    ].map(({ label, onClick }, i) => {
      const button = new Container();
      button.interactive = true;
      button.buttonMode = true;
      button.on('pointerdown', () => onClick());
      this.addChild(button);

      const title = new Text(label, TextStylesAdvisor());
      title.anchor.set(0.5);
      button.addChild(title);

      button.x = global.window.Application.screen.width * 0.5;
      button.y = 100 + i * 100;

      return button;
    });
  }
}
