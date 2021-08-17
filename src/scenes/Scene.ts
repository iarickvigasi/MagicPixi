import {
  Container, Text, TextStyle, Sprite, Texture,
} from 'pixi.js';

export default class Scene extends Container {
  public headerText: Text;

  public closeButton: Sprite;

  constructor() {
    super();
    this.addTitle();
    this.addCloseButton();
    this.onResize();
    // this.onCloseClick = new Signal();
    window.addEventListener('resize', () => this.onResize());
  }

  private addTitle() {
    const headerText = new Text('', new TextStyle({
      fontFamily: 'OpenSans',
      fontSize: 60,
      fontWeight: 'bold',
      fill: '#ffffff',
      strokeThickness: 7,
      stroke: '#000000',
    }));
    headerText.anchor.set(0.5);
    this.addChild(headerText);
    this.headerText = headerText;
  }

  private addCloseButton() {
    const closeButton = Sprite.from('assets/img/close_idle.png');
    closeButton.anchor.set(0.5);
    closeButton.interactive = true;
    closeButton.buttonMode = true;
    closeButton.on('pointerdown', () => this.handleCloseClick());
    this.addChild(closeButton);
    this.closeButton = closeButton;
  }

  onResize() {
    const { headerText, closeButton } = this;

    headerText.x = window.Application.screen.width * 0.5;
    headerText.y = 50;

    closeButton.x = window.Application.screen.width - 50;
    closeButton.y = 50;
  }

  handleCloseClick = () => {
    window.Application.sceneManager?.loadMenu();
  }
}
