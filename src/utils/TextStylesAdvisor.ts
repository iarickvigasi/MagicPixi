import { TextStyle } from 'pixi.js';

export default function TextStylesAdvisor() {
  let fontSize = '26px';

  if (window.matchMedia('(min-width: 400px)').matches) {
    fontSize = '32px';
  } if (window.matchMedia('(min-width: 500px)').matches) {
    fontSize = '36px';
  } if (window.matchMedia('(min-width: 700px)').matches) {
    fontSize = '50px';
  }

  return new TextStyle({
    fontFamily: 'MorrisRomanAlternate-Black',
    fontSize,
    fontWeight: 'bold',
    fill: '#ffffff',
    strokeThickness: 2,
    stroke: '#000000',
  });
}
