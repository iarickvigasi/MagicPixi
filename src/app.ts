import { Application } from 'pixi.js';

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  resolution: devicePixelRatio,
  sharedTicker: true,
  sharedLoader: true,
});

document.body.appendChild(app.view);
