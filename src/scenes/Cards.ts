import {
  Container, Sprite
} from 'pixi.js';
import gsap from 'gsap';
import PixiFps from '../utils/PixiFps';
import Scene from './Scene';

export default class CardsScene extends Scene {
  cards: Container[];

  cardsContainer: Container;

  readonly TOTAL_CARDS = 144;

  readonly TOTAL_TAROT_CARDS = 78;

  constructor() {
    super();
    this.headerText.text = 'Magic Cards';
    this.cardsContainer = new Container();
    this.generateRandomCards();
    this.placeFPSCounter();
    this.placeDeck();
    this.moveDeck();
  }

  private generateRandomCards() {
    const cards = [];
    for (let i = 0; i < this.TOTAL_CARDS; i += 1) {
      const card = new Container();
      const sprite = this.getTarotSprite(i);
      card.addChild(sprite);
      cards.push(card);
    }

    this.cards = cards;
  }

  private placeDeck() {
    const PADDING = 20;
    this.cards.forEach((card: Container, index: number) => {
      card.scale.set(1.5, 1.5);
      const baseX = 0 + PADDING + index;
      const baseY = card.height * 2 + PADDING;
      card.x = baseX;
      card.y = (index - this.TOTAL_TAROT_CARDS * 0.5 + 0.5) * 2 + baseY;
      this.cardsContainer.addChild(card);
    });

    this.addChild(this.cardsContainer);
  }

  private getTarotSprite = (index: number) => Sprite.from(
    window.Application.tarotSprites[index % this.TOTAL_TAROT_CARDS].texture,
  );

  private moveDeck() {
    for (let i = 0; i < this.TOTAL_CARDS; i += 1) {
      const card = this.cards[this.TOTAL_CARDS - 1 - i];
      const toX = window.Application.screen.width - 20 - card.width - i;
      gsap.to(card, { pixi: { x: toX }, duration: 2, delay: i });
    }
  }

  private placeFPSCounter() {
    const fpsCounter = new PixiFps();
    this.addChild(fpsCounter);
    fpsCounter.x = 20;
    fpsCounter.y = 20;
  }
}
