import gsap from 'gsap';
import { TextStyle } from 'pixi.js';
import Scene from './Scene';
import TextIcon from '../utils/TextIcon';

export default class MagicTextScene extends Scene {

  private interval: NodeJS.Timeout | undefined;

  private readonly TIME_INTERVAL = 2000;

  private readonly CHARACTERS = [
    'Gandalf',
    'Frodo',
    'Mordor',
    'Aragorn',
    'Galadriel',
    'Legolas',
    'Tranduil',
    'Arick',                            // It's me :) !
  ];

  private readonly MAGIC_PHRASES = [
    'Ai!',                              // Hi!
    'Pedig edhellen?',                  // Do you speak English?
    'Prestad?',                         // Is there trouble?
    'Alae!',                            // Behold!
    'Tolo anin naur',                   // Come near the fire
    'Le fael',                          // Thank you
    'Uhunc ylf ernedui',                // He or she had too many cups of drink
    'No veren',                         // Enjoy yourself
  ];

  private readonly MAGIC_ITEMS = [
    { key: ':sword', sprite: window.Application.fantasyIcons[0] },
    { key: ':bow', sprite: window.Application.fantasyIcons[6] },
    { key: ':stick', sprite: window.Application.fantasyIcons[17] },
    { key: ':book1', sprite: window.Application.fantasyIcons[20] },
    { key: ':book2', sprite: window.Application.fantasyIcons[21] },
    { key: ':book3', sprite: window.Application.fantasyIcons[22] },
    { key: ':spell1', sprite: window.Application.fantasyIcons[33] },
    { key: ':spell2', sprite: window.Application.fantasyIcons[34] },
    { key: ':spell3', sprite: window.Application.fantasyIcons[35] },
  ];

  private readonly MAGIC_ITEMS_MAP = this.getMagicItemsMap();

  private magicText: TextIcon | undefined;

  constructor() {
    super();
    this.headerText.text = 'Magic Texts!';
    this.startFantasyMagic();
  }

  getMagicItemsMap() {
    const map = {};
    this.MAGIC_ITEMS.forEach((item) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      map[item.key] = item.sprite;
    });
    return map;
  }

  private startFantasyMagic() {
    this.generateFantasyMagic();
    this.interval = setInterval(this.generateFantasyMagic.bind(this), this.TIME_INTERVAL);
  }

  private generateFantasyMagic() {
    if (this.magicText) this.removeChild(this.magicText);
    const combination = [null, null, null].map(this.getRandomItem).join(' ');
    const author = this.generateAuthor();
    this.magicText = new TextIcon(`${author} ${combination}`, this.getMagicTextStyle(), this.MAGIC_ITEMS_MAP);
    this.magicText.anchor.set(0.5);
    this.magicText.y = 240;
    this.magicText.x = window.Application.screen.width / 2;
    this.magicText.alpha = 0;
    gsap.to(this.magicText, { pixi: { alpha: 1 }, duration: 0.5 });
    this.addChild(this.magicText);
  }

  private getRandomItem = () => (Math.floor(Math.random() * 2) === 0
    ? this.getRandomText()
    : this.getRandomImage());

  private getRandomText() {
    const randomIndex = Math.floor(Math.random() * this.MAGIC_PHRASES.length);
    return this.MAGIC_PHRASES[randomIndex];
  }

  private getRandomImage() {
    const randomIndex = Math.floor(Math.random() * this.MAGIC_ITEMS.length);
    return this.MAGIC_ITEMS[randomIndex].key;
  }

  private generateAuthor() {
    const randomIndex = Math.floor(Math.random() * this.CHARACTERS.length);
    return `${this.CHARACTERS[randomIndex]} says: `;
  }

  private getMagicTextStyle() {
    return new TextStyle({
      fontFamily: 'MorrisRomanAlternate-Black',
      fontSize: Math.floor(Math.random() * 32) + 16,
      fill: '#ffffff',
      strokeThickness: 2,
      stroke: '#000000',
      wordWrap: true,
      wordWrapWidth: 300,
    });
  }

  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    super.destroy();
  }
}
