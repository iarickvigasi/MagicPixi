import { Container, TextStyle, Text } from 'pixi.js';
import decorate from '../utils/Decorate';

export default class MenuScene extends Container {
  private buttons: Container[] = [];

  constructor() {
    super();
    this.generateButtons();
    decorate(this);
  }

  private generateButtons() {
    this.buttons = [
      { label: '144 Moving Cards', onClick: () => global.window.Application.sceneManager?.loadCards() },
      { label: 'Fantasy Image Text', onClick: () => global.window.Application.sceneManager?.loadMagicText() },
      { label: 'Fireballs!', onClick: () => global.window.Application.sceneManager?.loadCards() },
    ].map(({ label, onClick }, i) => {
      const button = new Container();
      button.interactive = true;
      button.buttonMode = true;
      button.on('pointerdown', () => onClick());
      this.addChild(button);

      const title = new Text(label, new TextStyle({
        fontFamily: 'MorrisRomanAlternate-Black',
        fontSize: '36px',
        fontWeight: 'bold',
        fill: '#ffffff',
        strokeThickness: 4,
        stroke: '#000000',
      }));
      title.anchor.set(0.5);
      button.addChild(title);

      button.x = global.window.Application.screen.width * 0.5;
      button.y = 100 + i * 100;

      return button;
    });

}
