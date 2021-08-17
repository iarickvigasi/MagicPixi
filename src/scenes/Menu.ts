import { Container, Text, TextStyle } from 'pixi.js';

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
      { label: 'Fantasy Image Text', onClick: () => global.window.Application.sceneManager?.loadCards() },
      { label: 'Fireballs!', onClick: () => global.window.Application.sceneManager?.loadCards() },
    ].map(({ label, onClick }) => {
      const button = new Container();
      button.interactive = true;
      button.buttonMode = true;
      button.on('pointerdown', () => onClick());
      this.addChild(button);

      const title = new Text(label, new TextStyle({
        fontFamily: 'OpenSans',
        fontSize: 48,
        fontWeight: 'bold',
        fill: '#ffffff',
        strokeThickness: 5,
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
      button.y = global.window.Application.screen.height * 0.5 + 50 + (i - l * 0.5 + 0.5) * 160;
    }
  }

  private onResize() {
    this.positionButtons();
  }
}
