import {
  Container, Sprite
} from 'pixi.js';
import gsap from 'gsap';
import Scene from './Scene';

export default class CardsScene extends Scene {
  cards: Container[] = [];

  cardsContainer: Container;

  readonly TOTAL_CARDS = 144;

  readonly TOTAL_TAROT_CARDS = 78;

  constructor() {
    super();
    this.headerText.text = 'Magic Cards';
    this.cardsContainer = new Container();
    this.generateRandomCards();
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
    const PADDING = 40;
    this.cards.forEach((card: Container, index: number) => {
      card.scale.set(1.2, 1.2);
      const baseX = 0 + PADDING + index * 0.2;
      const baseY = card.height * 2 + PADDING;
      // eslint-disable-next-line no-param-reassign
      card.x = baseX;
      // eslint-disable-next-line no-param-reassign
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
      const toX = window.Application.screen.width - 40 - card.width - i * 0.5;
      gsap.to(card, { pixi: { x: toX }, duration: 2, delay: i });
    }
  }
}
