import * as PIXI from 'pixi.js';
import * as particles from 'pixi-particles';
import Scene from './Scene';

export default class FireballsScene extends Scene {
  private emitterContainer!: PIXI.Container;

  private fireEmitter!: particles.Emitter;

  private smokeEmitter!: particles.Emitter;

  constructor() {
    super();
    this.headerText.text = 'Fireballs';
    this.renderCenterFire();
  }

  private createFireParticle(container: PIXI.Container) {
    return new particles.Emitter(
      container,
      [PIXI.Texture.from('assets/img/pixel50.png')],
      {
        alpha: {
          start: 0.75,
          end: 0,
        },
        scale: {
          start: 1,
          end: 0.1,
          minimumScaleMultiplier: 1,
        },
        color: {
          start: '#e97015',
          end: '#e97015',
        },
        speed: {
          start: 100,
          end: 200,
          minimumSpeedMultiplier: 1.24,
        },
        acceleration: {
          x: 0,
          y: -100,
        },
        maxSpeed: 1000,
        startRotation: {
          min: -90,
          max: -90,
        },
        noRotation: false,
        rotationSpeed: {
          min: -15,
          max: 0,
        },
        lifetime: {
          min: 0.1,
          max: 0.5,
        },
        blendMode: 'add',
        frequency: 0.01,
        emitterLifetime: -1,
        maxParticles: 6,
        pos: {
          x: 0,
          y: 0,
        },
        addAtBack: true,
        spawnType: 'circle',
        spawnCircle: {
          x: 0,
          y: 0,
          r: 18,
        },
      },
    );
  }

  private createSmokeParticle(container: PIXI.Container) {
    return new particles.Emitter(
      container,
      [PIXI.Texture.from('assets/img/smokeparticle.png')],
      {
        alpha: {
          start: 0.1,
          end: 0,
        },
        scale: {
          start: 3,
          end: 1,
          minimumScaleMultiplier: 1,
        },
        color: {
          start: '#ac5615',
          end: '#e97015',
        },
        speed: {
          start: 100,
          end: 200,
          minimumSpeedMultiplier: 1.24,
        },
        acceleration: {
          x: 0,
          y: -100,
        },
        maxSpeed: 1000,
        startRotation: {
          min: -90,
          max: -90,
        },
        noRotation: false,
        rotationSpeed: {
          min: -15,
          max: 0,
        },
        lifetime: {
          min: 0.5,
          max: 1.2,
        },
        blendMode: 'add',
        frequency: 0.05,
        emitterLifetime: -1,
        maxParticles: 4,
        pos: {
          x: 0,
          y: 0,
        },
        addAtBack: true,
        spawnType: 'circle',
        spawnCircle: {
          x: 0,
          y: 0,
          r: 18,
        },
      },
    );
  }

  private renderCenterFire() {
    this.emitterContainer = new PIXI.Container();
    this.emitterContainer.x = window.Application.screen.width / 2;
    this.emitterContainer.y = window.Application.screen.height / 2;
    this.addChild(this.emitterContainer);

    this.smokeEmitter = this.createSmokeParticle(this.emitterContainer);
    this.fireEmitter = this.createFireParticle(this.emitterContainer);

    this.fireEmitter.emit = true;
    this.smokeEmitter.emit = true;
    window.Application.ticker.add(this.onUpdate, this);
  }

  onUpdate(delta: number) {
    this.fireEmitter.update(delta * 0.02);
    this.smokeEmitter.update(delta * 0.02);
  }
}
