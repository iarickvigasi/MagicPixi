import { Container } from 'pixi.js';
import Scene from './Scene';
export default class CardsScene extends Scene {
    cards: Container[];
    cardsContainer: Container;
    readonly TOTAL_CARDS = 144;
    readonly TOTAL_TAROT_CARDS = 78;
    constructor();
    private generateRandomCards;
    private placeDeck;
    private getTarotSprite;
    private moveDeck;
    private placeFPSCounter;
}
