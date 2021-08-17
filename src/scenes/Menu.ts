import { Container, TextStyle, Text } from 'pixi.js';

export default class MenuScene extends Container {
  private buttons: Container[] = [];

  constructor() {
    super();
    this.generateButtons();
    window.addEventListener('resize', () => this.onResize());
  }

  private generateButtons() {
    this.buttons = [
      { label: '144 Moving Cards', onClick: () => global.window.Application.sceneManager?.loadCards() },
      { label: 'Fantasy Image Text', onClick: () => global.window.Application.sceneManager?.loadMagicText() },
      { label: 'Fireballs!', onClick: () => global.window.Application.sceneManager?.loadCards() },
    ].map(({ label, onClick }) => {
      const button = new Container();
      button.interactive = true;
      button.buttonMode = true;
      button.on('pointerdown', () => onClick());
      this.addChild(button);

      const title = new Text(label, new TextStyle({
        fontFamily: 'MorrisRomanAlternate-Black',
        fontSize: '40px',
        fontWeight: 'bold',
        fill: '#ffffff',
        strokeThickness: 4,
        stroke: '#000000',
      }));
      title.anchor.set(0.5);
      button.addChild(title);

      return button;
    });
    this.positionButtons();
  }

  private positionButtons() {
    const { buttons } = this;

    for (let i = 0, l = buttons.length; i < l; i += 1) {
      const button = buttons[i];
      button.x = global.window.Application.screen.width * 0.5;
      button.y = global.window.Application.screen.height * 0.5 + 50 + (i - l * 0.5 + 0.5) * 100;
    }
  }

  private onResize() {
    this.positionButtons();
  }
}
