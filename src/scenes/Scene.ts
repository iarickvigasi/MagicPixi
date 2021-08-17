import {
  Container, Text, TextStyle, Sprite,
} from 'pixi.js';
import decorate from '../utils/Decorate';
import PixiFps from '../utils/PixiFps';

export default class Scene extends Container {
  public headerText!: Text;

  public closeButton!: Sprite;

  constructor() {
    super();
    this.addTitle();
    this.addCloseButton();
    this.placeFPSCounter();
    this.positionElements();
    decorate(this);
  }

  private addTitle() {
    const headerText = new Text('', new TextStyle({
      fontFamily: 'MorrisRomanAlternate-Black',
      fontSize: '4em',
      fill: '#ffffff',
      strokeThickness: 4,
      stroke: '#000000',
    }));
    headerText.anchor.set(0.5);
    this.addChild(headerText);
    this.headerText = headerText;
  }

  private addCloseButton() {
    const closeButton = Sprite.from('assets/img/close_idle.png');
    closeButton.anchor.set(0.5);
    closeButton.scale.set(0.5);
    closeButton.interactive = true;
    closeButton.buttonMode = true;
    closeButton.on('pointerdown', () => this.handleCloseClick());
    this.addChild(closeButton);
    this.closeButton = closeButton;
  }

  positionElements() {
    const { headerText, closeButton } = this;

    headerText.x = window.Application.screen.width * 0.5;
    headerText.y = 70;

    closeButton.x = window.Application.screen.width - 70;
    closeButton.y = 70;
  }

  handleCloseClick = () => {
    window.Application.sceneManager?.loadMenu();
  }

  private placeFPSCounter() {
    const fpsCounter = new PixiFps();
    fpsCounter.x = 70;
    fpsCounter.y = 70;

    this.addChild(fpsCounter);
  }
}
